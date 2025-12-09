const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog');

const app = express();

logger.info('Connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        logger.info('Connecting to MongoDB');
    })
    .catch(error => {
        logger.error('Error connection to MongoDB', error.message);
    })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(middleware.reqLogger);

// routes
app.use('/api/blogs', blogRouter);

// 404 and error
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
