const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/create', authController.createUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/reset-password/initiate', authController.initiatePasswordReset);
router.put('/reset-password/confirm', authController.confirmPasswordReset);
router.put('/change-password', authController.changePassword);

module.exports = router;