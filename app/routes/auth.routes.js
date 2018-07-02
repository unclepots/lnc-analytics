const router = require('express').Router();
const passport = require('passport');

// Login Screen
router.get('/', (req, res) => {
    res.redirect('/auth/login/');
});

router.get('/login/', (req, res) => {
    res.render('login', {user: req.user});
});

// Login Screens
router.get('/google/',passport.authenticate('google',{
    scope: ['profile', 'email']
}));

// Callbacks
router.get('/google/redirect/', passport.authenticate('google'), (req, res) => {
    res.redirect('/user/profile/');
});

// Logout Screen
router.get('/logout/', (req, res) => {
    req.logout();
    res.redirect('/auth/login/');
});

module.exports = router;