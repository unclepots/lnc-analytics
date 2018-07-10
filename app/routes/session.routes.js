// Import Packages
const router = require('express').Router();
const passport = require('passport');

// Import Controller
const session = require('../controllers/session.controller.js');

// Routes

// Open Session
router.get('/:token', session.get);

// Add Session Data
router.put('/', passport.authenticate('bearer', {session: false}), session.update);

// Export Routes
module.exports = router;