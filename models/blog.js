const mongoose = require('mongoose');
const Joi = require('joi');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5, 
        maxlength: 200,
        required: true
    },
    content: {
        type: String,
        minlength: 5, 
        maxlength: 1024,
        required: true
    },
    author: {
        type: String,
        minlength: 5, 
        maxlength: 200,
        required: true
    },
})

const Blog = mongoose.model('Blog', blogSchema);

const validateBlog = (blog) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(200).required(),
        content : Joi.string().min(5).max(1024).required(),
        author: Joi.string().min(5).max(200).required(),
    });

    return schema.validate(blog);
}

exports.Blog = Blog;
exports.validate = validateBlog;
