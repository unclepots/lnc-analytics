require('dotenv').config();

const express = require('express');
const sanitize = require('sanitize');
const bodyParser = require('body-parser');
const path = require('path');

// Initiate the App
const app = express();

// Parse Requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(sanitize.middleware);

// DB Configuration
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the DB
mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log(err);
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname + '/manifest.json'));
});

app.get('/sw.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/sw.js'));
});

app.get('/icons/:icon', (req, res) => {
    let icon_name = req.params.icon;
    res.sendFile(path.join(__dirname + '/icons/' + icon_name));
});

// Require Routes File
require('./app/routes/session.routes.js')(app);
require('./app/routes/page.routes.js')(app);
require('./app/routes/contact.routes.js')(app);

// Port Listening
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is listening on port: " + process.env.PORT || 5000);
});