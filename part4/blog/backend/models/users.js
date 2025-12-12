const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        minLength: 3,
        type: String,
        unique: true,
        required: true,
    },
    name: String,
    pwdHash:{
        type: String,
        required: true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        }
    ],
});

userSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
        // delete hashed pwd
        delete returnedObj.pwdHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;