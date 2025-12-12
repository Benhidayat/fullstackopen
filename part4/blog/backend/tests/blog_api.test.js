const app = require('../app');
const assert = require('node:assert');
const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const helper = require('./blog_test_helper');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, after, beforeEach, describe } = require('node:test');
const User = require('../models/users');


const api = supertest(app);

let token;

describe('tests for blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});
    
        await Blog.insertMany(helper.initialBlogs);

        const pwdHash = await bcrypt.hash('sekret',10);
        const user = new User({
            username: 'root',
            pwdHash
        });

        const savedUser = await user.save();

        const payload = {
            username: savedUser.username,
            id: savedUser._id.toString()
        }

        token = jwt.sign(payload, process.env.SECRET);
    });

    test('all blogs are returned', async () => {
        const res = await api.get('/api/blogs');
    
        assert.strictEqual(res.body.length, helper.initialBlogs.length);
    });
    
    test('blog identifier is .id instead of the default ._id', async () => {
        const res = await api.get('/api/blogs');
    
        const blog = res.body[0];
    
        assert.equal(blog.hasOwnProperty('id'), true);
    });
    
    test('a new blog detail can be added', async () => {

        const newBlog = {
            title: 'Type wars',
            author: 'Robert C. Malan',
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        };
    
        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
    
        const titles = blogsAtEnd.map(blog => blog.title);
        assert(titles.includes('Type wars'));
    });

    test.only('blog creation fails if token is not provided', async () => {

         const newBlog = {
            title: 'Type wars',
            author: 'Robert C. Malan',
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        };

        const result = await api.post('/api/blogs')
            .set('Authorization', 'Bearer ')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
        assert(result.body.error.includes('unauthorized'));
    });
    
    test('a new blog with likes property is missing', async () => {
    
        const newBlog = {
            title: 'Type wars',
            author: 'Robert C. Malan',
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        };
    
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb();
    
        assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0);
    });
    
    test('blog without title or url cannot be added',async () => {
        const newBlog = {
            author: 'Robert C. Malan',
            likes: 2
        };
    
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const blogsAtEnd = await helper.blogsInDb();
    
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
    
    test('delete success with status code 204', async () => {
        const blogAtStart = await helper.blogsInDb();
        const blogToDelete = blogAtStart[0];
    
        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    
        const blogsAtEnd = await helper.blogsInDb();
    
        const titles = blogsAtEnd.map(blog => blog.title);
    
        assert(!titles.includes(blogToDelete.title));
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
    
    test('udapte the likes of a blog', async () => {
        const blogAtStart = await helper.blogsInDb();
        const blogToEdit = blogAtStart[0];
    
        const blogUpdate = {
            likes: 20,
        }
    
        await api.put(`/api/blogs/${blogToEdit.id}`)
            .send(blogUpdate)
            .expect(200)
    
        const blogsAtEnd = await helper.blogsInDb();
        const updated = blogsAtEnd.find(blog => blog.id === blogToEdit.id);
    
        assert.strictEqual(updated.likes, blogUpdate.likes);
    
    });
});

describe('tests for user', () => {
    beforeEach( async () => {
        await User.deleteMany({});

        const pwdHash = await bcrypt.hash('sekret', 10);

        const user = new User({
            username: 'root',
            pwdHash
        });

        await user.save();
    });

    test('succeed create new user with valid credentials', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'budi',
            name: 'budi',
            password: 'abcd'
        };

        await api.post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

        const usernames = usersAtEnd.map(user => user.username);
        assert(usernames.includes(newUser.username));
    });

    test('creation fail when username or password is missing', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'budi',
            name: 'budi',
        }

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert(result.body.error.includes('username or password is missing'));
    });

    test('creation fail when username or password less than 3', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'bu',
            name: 'aude',
            password: 'abcd'
        };

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert(result.body.error.includes('username and password must be at least 3 characters'))
    });

    test('creation fails if username is already exist', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'root',
            name: 'root',
            password: 'abcd'
        };

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(409)
            .expect('Content-Type', /application\/json/)

        console.log('error', result.body.error);
        const usersAtEnd = await helper.usersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert(result.body?.error?.includes('username must be unique'));
    });
});


after(async () => {
    await mongoose.connection.close();
});