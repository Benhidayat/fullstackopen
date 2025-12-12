const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');
const { Router } = require('express');
const User = require('../models/users');

const blogRouter = Router();

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    const { decodedToken } = req;
    console.log('req decoded:', decodedToken);
    res.json(blogs);
    
});

blogRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (req, res) => {
    const { title, author, url, likes } = req.body;

    const { decodedToken } = req;
    if (!decodedToken.id) return res.status(401).json({ error: 'token invalid' });

    const { user } = req;
    if (!user) return res.status(400).json({ error: 'user id missing or not valid' });  

    const blog = new Blog({
        title,
        author,
        url,
        likes,
        user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
});

blogRouter.delete('/:id',[middleware.tokenExtractor, middleware.userExtractor], async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const blog = await Blog.findById(id);
   
    // make sure the blog.user and decodedToken.id have the same data type
    if (!blog.user.toString() === user.id.toString()) return res.status(403).json({ error: 'forbidden'});

    await Blog.findByIdAndDelete(blog.id);

    res.status(204).end();
    
});

blogRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { likes } = req.body;

    const blog = await Blog.findById(id);
    if(!blog) return res.status(404).end();

    blog.likes = likes;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
;});

module.exports = blogRouter;