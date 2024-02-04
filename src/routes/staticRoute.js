const express = require('express');
const router = express.Router();
const staticController = require('../app/controllers/staticController');

// Home page
router.get('/', staticController.getHomePage);

router.get('/uploads/:filename', staticController.getStaticImage);

module.exports = router;
