const express = require('express');
const stsController = require('../controllers/stsController');
const router = express.Router();

router.post('/', stsController.addSTS);

module.exports = router;