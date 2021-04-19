const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
require('dotenv/config');

//Init app
const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}))

//Parse application/json
app.use(bodyParser.json());

app.use(cors());

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => 
    console.log('Connected to DB!')
);

//Import routes
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/api/users', usersRoute);
app.use('/api/user', authRoute);

//Home route
app.get('/', (req, res) => {
    res.send('Merge?');
});

//Start server
app.listen(3000, () => 
    console.log('Server up and running!')
);