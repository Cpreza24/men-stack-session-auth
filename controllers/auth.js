const express = require('express');
//Router needs to be capital
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

router.get('/sign-up', (req, res) => {
    res.render('/auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send('username already taken');
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Passwords do not match');
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.send(`thanks for signing up ${user.username}`);
    //res.send('form submission successful');
});

module.exports = router;
