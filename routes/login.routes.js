const express = require('express');
const generateHasedPassword = require('../helpers/password.helper');
const UserModel = require('../models/user.model');
const fs = require('fs');
const path = require('path');

var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('pages/authentication/login', {
    message: 'Welcome, please login to continue.', msgClass: 'info', title: 'Login - SCS'
  });
});

router.post('/', function (req, res, next) {
  const { email, password } = req.body;
  const hashedPassword = generateHasedPassword(password);
  const user = UserModel.findOne({ email: email }, function (err, user) {
    // catch error
    if (err) {
      res.render('pages/authentication/login', {
        message: err, msgClass: 'danger', title: 'Login - SCS',
      });
    }
    // validate password
    if (user && user.password === hashedPassword) {
      const folder_name = path.join(process.cwd(), '/data/users/', user.username);
      if (!fs.existsSync(folder_name)) {
        fs.mkdirSync(folder_name);
      }
      var userdata = {
        username: user.username,
        email: user.email,
        logged_in: true,
      };
      req.session.user = userdata;
      res.cookie('username', userdata.username);
      res.cookie('email', userdata.email);
      res.redirect('../dashboard');
    } else {
      res.render('pages/authentication/login', {
        message: 'Credential wrong!', msgClass: 'danger', title: 'Login - SCS',
      });
    }
  })
})

module.exports = router;
