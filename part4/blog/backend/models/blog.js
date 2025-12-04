const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

blogSchema.set('toJSON', {
    transform: (document, returendObject) => {
        returendObject.id = returendObject._id.toString();
        delete returendObject._id;
        delete returendObject.__v;
    },
});

module.exports = mongoose.model('Blog', blogSchema);