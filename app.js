const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('dotenv/config');

// Init app
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}))

// Parse application/json
app.use(bodyParser.json());
app.use(cors());

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => 
    console.log('Connected to DB!')
);

//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Express Validator Middleware
app.use(expressValidator({
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

// Passport Config
require('./config/passport'); //(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Import routes
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const recipesRoute = require('./routes/recipes');

//Load View Engine
// app.set('views',path.join(__dirname,'views'));
// app.set('view engine','pug');

// Route Middlewares
app.use('/api/users', usersRoute);
app.use('/user', authRoute);
app.use('/api/recipes', recipesRoute);

// Home route
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

// Home route for a logged in user
app.get('/home',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/home.html'));
});

// Route for the login page
app.get('/login',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/login.html'));
});

// Route for the register page
app.get('/register',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/register.html'));
});



// Start server
app.listen(3000, () => 
    console.log('Server up and running!')
);