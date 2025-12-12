const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

});

blogSchema.set('toJSON', {
    transform: (document, returendObject) => {
        returendObject.id = returendObject._id.toString();
        delete returendObject._id;
        delete returendObject.__v;
    },
});

module.exports = mongoose.model('Blog', blogSchema);