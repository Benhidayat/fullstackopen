const { Router } = require('express');
const Blog = require('../models/blog');

const blogRouter = Router();

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
    
});

blogRouter.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body;

    const blog = new Blog({
        title,
        author,
        url,
        likes
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(204);
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