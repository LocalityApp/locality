const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const db = require('../models/dbConnection');
const router = express.Router();

// GET user profile 
router.get('/', ensureLoggedIn, function (req, res, next) {
    if(req.user.id){
        db.readUserData(req.user.id, req.user, res);
    }
    else if(req.user.email){
        db.readUserData(req.user.UID, req.user, res);
    }
    else{
        res.render('home', {
            user: req.user,
            userProfile: JSON.stringify(req.user, null, '  ')
        });
    }
});

module.exports = router;