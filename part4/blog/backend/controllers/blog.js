const { Router } = require('express');
const Blog = require('../models/blog');

const blogRouter = Router();

blogRouter.get('/', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs);
    })
    
});

blogRouter.post('/', (req, res, next) => {
    const { title, author, url, likes } = req.body;

    const blog = new Blog({
        title,
        author,
        url,
        likes
    });

    blog
        .save()
        .then(savedBlog => {
            res.json(savedBlog)
        })
        .catch(error => next(error))
});

module.exports = blogRouter;