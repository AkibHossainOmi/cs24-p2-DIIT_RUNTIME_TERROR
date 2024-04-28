const express = require('express');
const roleController = require('../controllers/roleController');
const router = express.Router();

router.get('/:roleId/permissions', roleController.getRolePermissions);

module.exports = router;