const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

//Get all the users
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch{
        res.status(420).json({message: err})
    }
});

//Add a user
router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country
    });

    user.save()
    .then(data => {
        res.redirect('/login');
        //res.status(200).json(data);
    })
    .catch(err => {
        res.redirect('/register');
        //res.status(400).json(err);
    })
});

//Get a specific user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(209).json(user);
    } catch(err){
        res.json({message: "There are some problems.. " + err});
    }
});

// Delete a specific user
router.delete('/:id', async (req, res) => {
    try{
        const userDeleted = await User.deleteOne({_id: req.params.id});
        res.status(200).json(userDeleted);
    } catch(err){
        res.json({message: err})
    }
});

// Update a specific user
router.post('/edit/:id', async (req, res) => {
    try {
        const userUpdated = await User.findById(req.params.id);

        if (req.body.password){ 
            // Password is hashed
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            userUpdated.password = hashedPassword;
        }

        userUpdated.name = req.body.name;
        userUpdated.username = req.body.username;
        userUpdated.email = req.body.email;
        userUpdated.country = req.body.country;

        let query = {_id : req.params.id}
        User.updateOne(query, userUpdated, function (err) {
            if (err) {
                console.log(err);
                res.status(400).json({message: err});
            } else
                res.status(200).json(userUpdated);
        });
    } catch(err){
        res.json({message: err});
    }
});

module.exports = router;