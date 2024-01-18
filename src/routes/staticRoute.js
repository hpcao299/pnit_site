const express = require('express');
const router = express.Router();
const staticController = require('../app/controllers/staticController');

// Home page
router.get('/', staticController.getHomePage);

module.exports = router;
