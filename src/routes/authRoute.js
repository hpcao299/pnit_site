const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController.js');
const passport = require('passport');

router.get('/login', authController.getLoginPage);
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/login/google/callback',
    passport.authenticate('google', {
        successRedirect: '/user',
        failureRedirect: '/auth/login',
    }),
);

router.get('/logout', authController.logOut);

module.exports = router;
