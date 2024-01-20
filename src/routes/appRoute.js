const express = require('express');
const router = express.Router();
const appController = require('../app/controllers/appController');

router.get('/@:username', appController.getPortfolioPage);
router.get('/@:username/edit', appController.getEditPage);
router.get('/@:username/edit/header', appController.getEditHeaderPage);

module.exports = router;
