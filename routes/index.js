var express = require('express');
const AuthController = require('../controllers/auth.controller');
const DashboardController = require('../controllers/dashboard.controller');
const authRequired = require('../middlewares/auth.middleware');
var router = express.Router();

/* GET home page. */
router.get('/', authRequired, DashboardController.index);
router.get('/dashboard', authRequired, DashboardController.index);
router.get('/logout', AuthController.logout);

module.exports = router;
