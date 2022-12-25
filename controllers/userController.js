const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');

const addUser = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    let user = await User.findOne({username: req.body.username}).exec();
    if(user) return res.status(400).send('User with this username already exist');

    user = new User(_.pick(req.body, ['username', 'email', 'gender', 'userType', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    console.log(user);
    (await user).save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
}

const updateUser = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    let user = await User.findOneAndUpdate({username: req.params.username}, {
        password: password,
    }, { new: true });

    
    if (!user) return res.status(401).send('The User with the given id not found');
    res.send(user);
}

module.exports = {
    addUser,
    updateUser
}