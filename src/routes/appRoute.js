const express = require('express');
const router = express.Router();
const appController = require('../app/controllers/appController');
const upload = require('../upload').upload;

router.get('/user', appController.getCurrentUser);

router.get('/@:username', appController.getPortfolioPage);
router.get('/@:username/edit', appController.getEditPage);
router.get('/@:username/edit/header', appController.getEditHeaderPage);

router.patch('/@:username/username', appController.editUsername);
router.patch('/@:username/:name/add', appController.addSocialLink);
router.delete('/@:username/:name/delete', appController.deleteSocialLink);
router.put('/@:username/details', upload.single('image'), appController.editDetails);

router.post('/@:username/upload-avatar', upload.single('image'), appController.uploadAvatar);

module.exports = router;
