const express = require('express');
const AuthController = require('../controllers/auth.controller');

var router = express.Router();

router.get('/', AuthController.indexRegister);
router.post('/', AuthController.register);

module.exports = router;
