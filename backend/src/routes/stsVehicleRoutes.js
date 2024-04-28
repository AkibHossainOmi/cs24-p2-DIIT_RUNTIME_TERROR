const express = require('express');
const stsVehicleController = require('../controllers/stsVehicleController');
const router = express.Router();

router.post('/', stsVehicleController.addSTSVehicle);

module.exports = router;