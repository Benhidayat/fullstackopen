const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const requestLogger = (req, res, next) => {
    logger.info('method', req.method);
    logger.info('path', req.path);
    logger.info('body', req.body);
    logger.info('---');
    next();
};

// 404 endpoint
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknowne endpoint' });
};

// error middleware
const errorMiddleware = (err, req, res, next) => {
    if (err.name === 'CastError') return res.status(400).send({ error: 'malformed id' });
    if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
    if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) return res.status(409).json({ error: 'Expected "username" to be unique'});
    if (err.name === 'JsonWebTokenError') return res.status(401).json({ error: 'token invalid' });
    if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'jwt expired'});
    next(err);
};

// extract token
const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization');
    if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'unauthorized' });

    const token = auth.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) return re.status(401).json({ error: 'unauthorized' });
    req.token = decodedToken;
    next();
};

const userExtractor = async (req, res, next) => {
    const auth = req.get('authorization');
    if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'unauthorized' });
    const token = auth.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    req.user = user;
    next();
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorMiddleware,
    tokenExtractor,
    userExtractor
}