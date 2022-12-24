const express = require('express');
const auth = require('../middleware/auth');
const { addBlog, getBlogs, getOneBlog } = require('../controllers/blogController');

const router = express.Router();

router.post('/add-blog', auth, addBlog);
router.get('/blogs', auth, getBlogs);
router.get('/blogs/:id', auth, getOneBlog);


module.exports = {
    routes: router
}