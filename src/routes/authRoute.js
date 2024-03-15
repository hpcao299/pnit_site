const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController.js');
const passport = require('passport');
const checkNoAuth = require('../middlewares/checkNoAuth.js');

router.get('/login', checkNoAuth, authController.getLoginPage);
router.get(
    '/login/google',
    checkNoAuth,
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        failureRedirect: '/auth/login',
    }),
);

const passportErrorHandler = (err, req, res, next) => {
    res.redirect('/auth/login?error=authentication_error');
};

router.get(
    '/login/google/callback',
    checkNoAuth,
    passport.authenticate('google', {
        successRedirect: '/user',
        failureRedirect: '/auth/login',
    }),
    passportErrorHandler,
);

router.get('/logout', authController.logOut);

module.exports = router;
