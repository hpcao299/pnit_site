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
router.get(
    '/login/google/callback',
    checkNoAuth,
    passport.authenticate('google', {
        successRedirect: '/user',
        failureRedirect: '/auth/login',
        failureFlash: 'Failed to login',
    }),
);

router.get('/logout', authController.logOut);

module.exports = router;
