const winston = require('winston');

module.exports = (err, req, res, next) => {
    winston.err(err.message, err);
    res.status(500).send('Something wen wrond');
}