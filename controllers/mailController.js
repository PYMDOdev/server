const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'sezer2001yildirim@gmail.com',
    pass: 'htxmeoggxfjwbifp',
  },
});

const makeRandPass = () => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < 7; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const sendMail = (mailer, pass) => {
    transporter.sendMail({
        from: '"Blogger" <sezer2001yildirim@gmail.com>',
        to: mailer,
        subject: "Here is your password",
        text: "Your password is : " + pass,
        html: "<b>Your password is : " + pass +"</b>",
      }).then(info => {
        console.log({info});
      }).catch(console.error);
}
const sendPasswordEmail = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const password = makeRandPass();
    const pass = await bcrypt.hash(password, salt);
    let user = await User.findOneAndUpdate({username: req.params.username}, {
        password: pass,
    }, { new: true });
    if (!user) return res.status(401).send('The User with the given email not found');
    sendMail(user.email, password);
    res.send("Password is sended!");
}


module.exports = {
    sendPasswordEmail
}