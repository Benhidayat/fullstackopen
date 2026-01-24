const { Router } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs');
    res.status(200).json(users);
});

userRouter.post('/', async (req, res, next) => {
    try {
        const { username, name, password } = req.body;

        if (!username || !password) return res.status(400).json({ error: 'username and password are required' });
        if (username.length < 3 || password.length < 3) return res.status(400).json({ error: 'username and password must be at least 3 characters'});

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(409).json({ error: 'username already existed' })
    
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
    
        const user = new User({
            username,
            name,
            passwordHash
        });
    
        const savedUser = user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error)
    }

});

module.exports = userRouter;