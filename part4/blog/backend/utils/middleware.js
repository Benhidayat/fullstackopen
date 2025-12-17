const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/users');

const reqLogger = (req, res, next) => {
    logger.info('Method', req.method);
    logger.info('Path', req.path);
    logger.info('Body', req.body);
    logger.info('---');
    next();
}

// 404 endpoint
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint '});
}

// error handler
const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    if (err.name === 'CastError') return res.status(400).send({ error: 'Malformed id' });
    if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
    if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) return res.status(409).json({ error: 'Expected "username" to be unique'});
    if (err.name === 'JsonWebTokenError') return res.status(401).json({ error: 'token invalid' });
    if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'jwt expired'});
    next(err);
};

// jwt handler
const tokenExtractor = (req, res, next) => {
    
    const authorization = req.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
        
        return res.status(401).json({ error: 'unauthorized'});
    }
    

    const token = authorization.replace('Bearer ', '');        
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // assign decoded object to request header to use eveywhere
    req.decodedToken = decodedToken;
    next();
   
};

const userExtractor = async (req, res, next) => {
    const auth = req.get('authorization');
    if (auth && auth.startsWith('Bearer ')) {
        const token = auth.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decodedToken.id);
        req.user = user;
        next();
    }
};

module.exports = {
    reqLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}