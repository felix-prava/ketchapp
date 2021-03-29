const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv/config');

//Init app
const app = express();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => 
    console.log('Connected to DB!')
);

//Home route
app.get('/', (req, res) => {
    res.send('Test!!!');
});

//Start server
app.listen(3000, () => 
    console.log('Server up and running!')
);