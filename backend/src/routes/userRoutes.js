const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.put('/:userId/roles', userController.updateUserRole);

module.exports = router;
