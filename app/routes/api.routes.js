// Import Packages
const router = require('express').Router();

// Import Controller
const api = require('../controllers/api.controller');

const is_logged_in = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login/');
    }else{
        next();
    }
}

router.get('/', is_logged_in, api.root);
router.get('/all/', is_logged_in, api.get_all);
router.post('/new/', is_logged_in, api.new);

module.exports = router;