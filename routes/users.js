const express = require('express');
const generateHasedPassword = require('../helpers/password.helper');
const UserModel = require('../models/user.model');
var router = express.Router();

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('pages/authentication/login', {
    message: 'Welcome, please login to continue.', msgClass: 'info', title: 'Login - SCS'
  });
});



module.exports = router;
