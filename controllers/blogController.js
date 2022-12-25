
const { Blog, validate } = require('../models/blog');

const addBlog = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    let blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    blog = await blog.save();
    res.send(blog);
}

const getBlogs = async (req, res, next) => {
    const blogs = await Blog.find().sort('title').exec();
    res.send(blogs);
}
const getUserBlogs = async (req, res, next) => {
    const blogs = await Blog.find({ author: req.params.author });
    if (!blogs) return res.status(401).send('The user do not have a blog.');
    res.send(blogs);
}

const getOneBlog = async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(401).send('The Blog with the given id not found');
    res.send(blog);
}
const updateBlog = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    let blog = await Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content
    }, { new: true });

    
    if (!blog) return res.status(401).send('The Blog with the given id not found');
    res.send(blog);
}
const deleteBlog = async (req, res, next) => {
    const blog = await Blog.findByIdAndRemove(req.params.id)
    if (!blog) return res.status(401).send('The Blog with the given id not found');
    res.send(blog);
}

module.exports = {
    addBlog,
    getBlogs,
    getOneBlog,
    getUserBlogs,
    deleteBlog,
    updateBlog
}