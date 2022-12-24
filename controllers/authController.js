const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

const login = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    const user = await User.findOne({username: req.body.username}).exec();
    if (!user) return res.status(404).send('Invalid user name or password');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(404).send('Invalid user name or password');

    const token = user.generateAuthToken();
    res.send({ token: token, user: user });
}

const validate = (req) => {
    const schema = Joi.object({
        username: Joi.string().min(1).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
}

module.exports = {
    login
}