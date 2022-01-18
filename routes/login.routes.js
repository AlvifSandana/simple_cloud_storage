const express = require('express');
const AuthController = require('../controllers/auth.controller');

var router = express.Router();

router.get('/', AuthController.indexLogin);
router.post('/', AuthController.login)

module.exports = router;
