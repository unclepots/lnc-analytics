const router = require('express').Router();
const user = require('../controllers/user.controller');

const is_logged_in = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login/');
    }else{
        next();
    }
}

router.get('/', is_logged_in, user.root);
router.get('/profile', is_logged_in, user.profile);
router.get('/users', is_logged_in, user.users);

module.exports = router;