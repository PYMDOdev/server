const express = require('express');
const auth = require('../middleware/auth');
const { addBlog, getBlogs, getOneBlog, getUserBlogs, deleteBlog, updateBlog } = require('../controllers/blogController');

const router = express.Router();

router.post('/add-blog', auth, addBlog);
router.get('/blogs', auth, getBlogs);
router.get('/blogs/:id', auth, getOneBlog);
router.get('/author-blogs/:author', auth, getUserBlogs);
router.post('/delete-blog/:id', auth, deleteBlog);
router.post('/update-blog/:id', auth, updateBlog);


module.exports = {
    routes: router
}