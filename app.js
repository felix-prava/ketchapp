const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const path = require('path');
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