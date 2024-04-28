const express = require('express');
const profileController = require('../controllers/profileController');
const router = express.Router();

router.get('/', profileController.getUserProfile);
router.put('/', profileController.updateUserProfile);

module.exports = router;