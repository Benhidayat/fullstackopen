const assert = require('node:assert');
const { after, beforeEach, describe, test,  } = require('node:test');
const bcrypt = require('bcrypt');
const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const userHelper = require('./user_api_helper');

const api = supertest(app);

describe('tests for user', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        
        const pwdHash = await bcrypt.hash('sekret', 10);

        const user = new User({
            username: 'root',
            name: 'root',
            passwordHash: pwdHash
        });

        await user.save();
    });

    test('succeed creating new user with valid credentials', async () => {
        const usersAtStart = await userHelper.usersInDb();

        const newUser = {
            username: 'budi',
            name: 'budi',
            password: 'abcd'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await userHelper.usersInDb();
        const usernames = usersAtEnd.map(u => u.username);

        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
        assert(usernames.includes(newUser.username));
    });

    test('return error code 400 when username or password less than 3 characters', async () => {
        const usersAtStart = await userHelper.usersInDb();

        const newUser = {
            username: 'au',
            name: 'budi',
            password: 'abcd'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await userHelper.usersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert(result.body.error.includes('username and password must be at least 3 characters'));
    });

    test('username must be unique', async () => {
        const usersAtStart = await userHelper.usersInDb();

        const newUser = {
            username: 'root',
            name: 'root',
            password: 'abcd'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(409)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await userHelper.usersInDb();

        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert(result.body.error?.includes('username already existed'));
    });

    test('creation fail when username or password is missing', async () => {
        const usersAtStart = await userHelper.usersInDb();

        const newUser = {
            username: '',
            name: 'budi',
            password: 'abcd'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await userHelper.usersInDb();
        
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert(result.body.error.includes('username and password are required'));
    });
});

after(async () => {
    await mongoose.connection.close();
});