const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

const login = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(422).send(error.detail[0].message);

    const user = await User.findOne({email: req.body.email}).exec();
    if (!user) return res.status(404).send('Invalid email or password');
    console.log(user);
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(404).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
}

const validate = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
}

module.exports = {
    login
}