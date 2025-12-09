const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./blog_test_helper');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    console.log('Cleared');

    await Blog.insertMany(helper.initialBlogs);
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
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    assert(titles.includes('Type wars'));
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

test.only('udapte the likes of a blog', async () => {
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

after(async () => {
    await mongoose.connection.close();
});