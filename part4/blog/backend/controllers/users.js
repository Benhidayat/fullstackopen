const bcrypt = require('bcrypt');
const { Router } = require('express');
const User = require('../models/users');

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title:1, author: 1, url: 1, likes: 1 });
    res.status(200).json(users);
});

userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || !password) return res.status(400).json({ error: 'username or password is missing' });
    if (username < 3 || password < 3) return res.status(400).json({ error: 'username and password must be at least 3 characters'});
    
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ error: 'username must be unique' });

    const SALT_ROUNDS = 10;
    const pwdHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
        username,
        name,
        pwdHash
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
});

module.exports = userRouter;