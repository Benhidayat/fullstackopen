const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

const app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        logger.info('Connecting to MongoDB');
    })
    .catch(error => {
        logger.error('Error connection to MongoDB', error.message);
    });

app.use(express.json());
app.use(middleware.reqLogger);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
});

// 404 & error
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
})