// Import Packages
const router = require('express').Router();
const passport = require('passport');

// Import Controller
const page = require('../controllers/page.controller.js');

// Routes

// Open Page
router.put('/', passport.authenticate('bearer', {session: false}), page.open);

// Close Page
router.delete('/', passport.authenticate('bearer', {session: false}), page.close);

// Export Routes
module.exports = router;