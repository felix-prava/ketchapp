const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const { registerValidation, loginValidation } = require('./validation')


//Express Session Middleware
router.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//Express Messages Middleware
router.use(require('connect-flash')());
router.use(function(req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Express Validator Middleware
router.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg : msg,
            value : value
        };
    }
}));

// Route for the login page
router.get('/login',function(req,res) {
    res.render('login');
});

// Route for the register page
router.get('/register',function(req,res) {
    res.render('register');
    //res.sendFile(path.join(__dirname+'/views/register.html'));
});

// Register a user
router.post('/register', async (req, res) => {

    // Data validation before creating a user
    const { error } = registerValidation(req.body);
    if (error){
        req.flash("danger", error.details[0].message);
        res.redirect('/user/register');
        return;
    }

    // Checking if we have a user with the same email address
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist){
        req.flash("danger", 'This email is already used!');
        res.redirect('/user/register');
        return;
    }

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
        req.flash("danger", 'Internal problems, please try again!');
        res.redirect('/user/register');
        return;
    }
});

// Login a user
router.post('/login', async (req, res) => {
    // Data validation before logging in a user
    const { error } = loginValidation(req.body);
    if (error){
        req.flash("danger", error.details[0].message);
        res.redirect('/user/login');
        return;
    }

    // Checking if the email match a user
    const user = await User.findOne({email: req.body.email});
    if (!user){
        req.flash("danger", 'Email or password is wrong!');
        res.redirect('/user/login');
        return;
    }

    // Checking if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword){
        req.flash("danger", 'Email or password is wrong!');
        res.redirect('/user/login');
        return;
    }
    res.redirect('/home');
});

module.exports = router;