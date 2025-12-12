const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const User = require('../models/users');

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isCorrectPwd = user === null
        ? false
        : await bcrypt.compare(password, user.pwdHash);

    if (!(user && isCorrectPwd)) return res.status(401).json({ error: 'invalid username or password' });

    const userForToken = {
        username: user.username,
        id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1d' });
    res.status(200).send({ token, username: user.username, name: user.name});
});

module.exports = loginRouter;