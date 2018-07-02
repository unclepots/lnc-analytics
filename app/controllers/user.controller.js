// Import Packages
const sanitize = require('sanitize');
const sanitizer = sanitize();

// Import Models
const User = require('../models/user.model.js');
const API = require('../models/api.model.js');

// Root
exports.root = (req, res) => {
    res.redirect('/user/profile/');
}

// Profile View
exports.profile = (req, res) => {
    res.render('profile', {
        user: req.user
    });
}

// Users View
exports.users = (req, res) => {
    if(req.user.role != 'admin'){
        res.send({
            message: 'Access denied.'
        });
    }else{
        User.find().then(users => {
            res.render('users', {user: req.user, users: users});
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
    }
}