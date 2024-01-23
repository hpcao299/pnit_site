const express = require('express');
const router = express.Router();
const appController = require('../app/controllers/appController');

router.get('/@:username', appController.getPortfolioPage);
router.get('/@:username/edit', appController.getEditPage);
router.get('/@:username/edit/header', appController.getEditHeaderPage);

router.patch('/@:username/username', appController.editUsername);
router.put('/@:username/details', appController.editDetails);

module.exports = router;
