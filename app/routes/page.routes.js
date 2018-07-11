// Import Packages
const router = require('express').Router();
const passport = require('passport');
const where = require('node-where');

// Import Controller
const page = require('../controllers/page.controller.js');

// Routes

// Open Page
router.put('/', passport.authenticate('bearer', {session: false}), function(req,res,next){
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("========== HEADER ==========");
    console.log(req.headers['x-forwarded-for']);
    console.log("========== REMOTE ==========");
    console.log(req.connection.remoteAddress);
    console.log("========== END ==========");
    console.log(ip);
    where.is(ip, function(err, result) {
        console.log("========== RESULT ==========");
        console.log(result);
        req.geo = result;
        next();
    });
}, page.open);

// Close Page
router.delete('/', passport.authenticate('bearer', {session: false}), page.close);

// Export Routes
module.exports = router;