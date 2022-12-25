const express = require('express');
const { addUser, updateUser } = require('../controllers/userController');
const { sendPasswordEmail } = require('../controllers/mailController');

const router = express.Router();

router.post('/register', addUser);
router.post('/update-user/:username', updateUser);
router.get('/forget-password/:username', sendPasswordEmail);

module.exports = {
    routes: router
}