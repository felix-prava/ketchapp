const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { registerValidation, loginValidation } = require('./validation')


// Route for the login page
router.get('/login',function(req,res) {
    res.sendFile(path.join(__dirname+'/viewsss/login.html'));
});

// Route for the register page
router.get('/register',function(req,res) {
    res.sendFile(path.join(__dirname+'/register.html'));
});

// Register a user
router.post('/register', async (req, res) => {

    // Data validation before creating a user
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    // Checking if we have a user with the same email address
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist)
        return res.status(400).send('This email is already used!');

    // Password is hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        country: req.body.country,
    });
    try {
        const newUser = await user.save();
        res.status(200).send(newUser);
    } catch (err){
        res.status(400).send(err);
    }
});

// Login a user
router.post('/login', async (req, res) => {
    // Data validation before logging in a user
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    // Checking if the email match a user
    const user = await User.findOne({email: req.body.email});
    if (!user)
        return res.status(400).send('Email or password is wrong!');

    // Checking if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Email or password is wrong');
    res.status(200).send(user);
});

module.exports = router;