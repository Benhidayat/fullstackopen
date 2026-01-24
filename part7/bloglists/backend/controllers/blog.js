const { Router } = require('express');
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const blogRouter = Router();

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
});

blogRouter.post('/',middleware.tokenExtractor, middleware.userExtractor ,async (req, res) => {

    const { user } = req

    const { title, author, url, likes } = req.body;

    if (!title || !url ) return res.status(400).json({ error: 'title or url is missing '});


    const blog = new Blog({
        title,
        author,
        url,
        likes,
        user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
});

blogRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, url, likes } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: 'blog not found' });

    // if blog is exist
    blog.title = title;
    blog.author = author;
    blog.url = url;
    blog.likes = likes;

    const updatedBlog = await blog.save();
    await updatedBlog.populate('user', { username: 1, name: 1 });
    res.json(updatedBlog);
});

blogRouter.delete('/:id',middleware.tokenExtractor, middleware.userExtractor , async (req, res) => {
    const { user } = req;

    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(401).json({ error: 'blog does not exist' });
    if (blog.user.toString() !== user.id.toString()) return res.status(403).json({ error: 'forbidden' });

    await Blog.findByIdAndDelete(blog.id);

    res.status(204).end();
});

module.exports = blogRouter;