const { Router } = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

const testRouter = Router();

testRouter.post('/reset', async (req, res) => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    res.status(204).end();
});

module.exports = testRouter;