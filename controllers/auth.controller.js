const fs = require('fs');
const path = require('path');
const generateHasedPassword = require('../helpers/password.helper');
const UserModel = require('../models/user.model');

/**
 * Find user by email.
 * 
 * @param {String} email 
 * @returns Promise
 */
const findUser = async (email) => {
  return await UserModel.findOne({ 'email': email }, 'username email').exec();
}

/**
 * Auth Controller.
 */
const AuthController = {
  /**
   * Show login index page.
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  indexLogin: function (req, res, next) {
    res.render('pages/authentication/login', {
      message: 'Welcome, please login to continue.', msgClass: 'info', title: 'Login - SCS'
    });
  },

  /**
   * Show register index page.
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  indexRegister: function (req, res, next) {
    res.render('pages/authentication/register', {
      message: 'Welcome, please register to continue.', msgClass: 'info', title: 'Register - SCS',
    });
  },

  /**
   * handle login process.
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  login: function (req, res, next) {
    const { email, password } = req.body;
    const hashedPassword = generateHasedPassword(password);
    UserModel.findOne({ email: email }, function (err, user) {
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
    });
  },

  /**
   * Handle register process.
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  register: function (req, res, next) {
    // get request body
    const { username, email, password, confirmPassword } = req.body;
    // validate password
    if (password === confirmPassword) {
      // check if user existed with email
      var user = findUser(email);
      user.then((data) => {
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
  },

  /**
   * Handle logout process
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  logout: function(req, res, next){
    req.session.destroy();
    res.clearCookie('username');
    res.clearCookie('email');
    res.redirect('../login');
  },
};

module.exports = AuthController;
