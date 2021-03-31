const router = require('express').Router();
const User = require('../models/User');
const { registerValidation } = require('./validation')

router.post('/register', async (req, res) => {

    //Data validation before creating a user
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    //Checking if we have a user with the same email address
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist)
        return res.status(400).send('This email is already used!');

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        country: req.body.country,
    });
    try {
        const newUser = await user.save();
        res.status(200).send(newUser);
    } catch (err){
        res.status(400).send(err);
    }
})

module.exports = router;