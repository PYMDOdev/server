'use strict';

const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect('mongodb://localhost/LibraryDatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => winston.info('Mongo Db connected.....'));
}