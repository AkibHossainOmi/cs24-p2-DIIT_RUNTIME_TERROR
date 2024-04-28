const express = require('express');
const rbacController = require('../controllers/rbacController');
const router = express.Router();

router.get('/permissions', rbacController.getPermissions);
router.get('/roles', rbacController.getRoles);
router.post('/roles', rbacController.createRole);
router.post('/permissions', rbacController.createPermission);
router.post('/roles/:roleId/permissions', rbacController.assignPermissionsToRole);

module.exports = router;
