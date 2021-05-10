const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./validation')


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
        country: req.body.location,
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

    // Data validation before creating a user
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

    // Creat a JSON token
    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token);
});

module.exports = router;