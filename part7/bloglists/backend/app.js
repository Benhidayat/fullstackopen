const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');

const app = express();

logger.info('Connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB', error.message);
    })

app.use(express.json());
app.use(middleware.requestLogger);

// Routes
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

// run if the app runs in test mode
if (process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/testing');
    app.use('/api/testing', testRouter);
}

// 404 & Error
app.use(middleware.unknownEndpoint);
app.use(middleware.errorMiddleware);

module.exports = app;