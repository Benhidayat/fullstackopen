const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const User = require('../models/user');
require('dotenv').config();

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && passwordCorrect)) return res.status(401).json({ error: 'invalid username or password' });

    const userPayload = {
        usename: user.username,
        id: user._id
    };

    const token = jwt.sign(userPayload, process.env.SECRET);
    res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
