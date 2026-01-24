const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const helper = require('./blog_test_helper');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const api = supertest(app);

let token;

describe('test for blog api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    await Blog.insertMany(helper.initialBlogs);

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({
      username: 'budi',
      name: 'root',
      passwordHash,
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

  test('blog identifier is .id not the default mongoDb ._id', async () => {
    const res = await api.get('/api/blogs');
    const blog = res.body[0];
    
    assert.equal(blog.hasOwnProperty('id'), true);
  });

  test('a valid new blog can be added', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Malan',
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };

    await api.post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map(blog => blog.title);

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
    assert(titles.includes('Type wars'));

  });

  test.only('blog creation fails if token is not provided', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Malan',
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    assert(result.body.error.includes('unauthorized'));
  });

  test('likes will be default to 0 if not defined', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Malan',
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    
    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0);
    
    
  });

  test('return 400 bad request when title or url not provided', async () => {
    const newBlog = {
      author: 'Robert C. Malan',
      likes: 12
    };

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb();
    const ids = blogsAtEnd.map(b => b.id);
    
    assert(!ids.includes(blogToDelete.id));
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
  });

});

after(async () => {
  await mongoose.connection.close();
});