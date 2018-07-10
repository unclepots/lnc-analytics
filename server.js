// Enable Environmental Parameters
require('dotenv').config();

// Import Packages
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sanitize = require('sanitize');
const path = require('path');

// Import Keys
const keys = require('./config/keys');

// Initiate the App
const app = express();

// Use EJS Template System
app.set('view engine', 'ejs');

// Authentication Strategies
const authStrategies = require('./config/passport');

// Parse Requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(sanitize.middleware);

// Connecting to the DB
mongoose.connect(keys.database.url).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log(err);
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// Enable Cookies
app.use(cookieSession({
    name: 'lnc-session',
    maxAge: 30*24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Enable Static Routes
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const authRoutes = require('./app/routes/auth.routes');
const userRoutes = require('./app/routes/user.routes');
const apiRoutes = require('./app/routes/api.routes');
const sessionRoutes = require('./app/routes/session.routes');
const pageRoutes = require('./app/routes/page.routes');

// Set Routes
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});

app.get('/sample/', (req, res) => {
    res.render('sample');
});

// Authentification Routes
app.use('/auth/', authRoutes);

// User Routes
app.use('/user/', userRoutes);

// API Routes
app.use('/api/', apiRoutes);

// Session Routes
app.use('/api/session/', sessionRoutes);
app.use('/api/page/', pageRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

// Port Listening
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is listening on port: " + process.env.PORT || 5000);
});