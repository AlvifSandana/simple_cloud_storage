const express = require('express');
const generateHasedPassword = require('../helpers/password.helper');
const UserModel = require('../models/user.model');
const fs = require('fs');
const path = require('path');

var router = express.Router();

const findUser = async (email) => {
  return await UserModel.findOne({ 'email': email }, 'username email').exec();
}

router.get('/', function (req, res, next) {
  res.render('pages/authentication/register', {
    message: 'Welcome, please register to continue.', msgClass: 'info', title: 'Register - SCS',
  });
});

router.post('/', function (req, res, next) {
  // get request body
  const { username, email, password, confirmPassword } = req.body;
  // validate password
  if (password === confirmPassword) {
    // check if user existed with email
    var user = findUser(email);
    user.then((data) => {
      console.log(data);
      // validate email existed
      if (data) {
        res.render('pages/authentication/register', {
          message: 'Email telah digunakan, silahkan gunakan email lain.', msgClass: 'warning', title: 'Register - SCS',
        });
      } else {
        // create data
        const hashedPassword = generateHasedPassword(password);
        // save data
        UserModel.create({
          fullname: username,
          username: username,
          email: email,
          password: hashedPassword,
          created_at: Date.now().toString(),
          updated_at: Date.now().toString(),
        }, function (err) {
          if (err) {
            res.render('pages/authentication/register', {
              message: err, msgClass: 'error', title: 'Register - SCS',
            });
          } else {
            // try to create folder by username
            try {
              const folder_name = path.join(process.cwd(), '/data/users/', username);
              if (!fs.existsSync(folder_name)) {
                fs.mkdirSync(folder_name);
              }
              res.render('pages/authentication/login', {
                message: 'Registrasi berhasil, silahkan login.', msgClass: 'success', title: 'Login - SCS',
              });
            } catch (err) {
              res.render('pages/authentication/register', {
                message: err, msgClass: 'danger', title: 'Register - SCS',
              });
            }
          }
        });
      }
    });
  } else {
    res.render('pages/authentication/register', {
      message: "Password validation failed! Check your password.", msgClass: 'warning', title: 'Register - SCS',
    });
  }
});

module.exports = router;
