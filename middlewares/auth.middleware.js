/**
 * Middleware: authentication by check existed cookie.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authRequired = (req, res, next) => {
  if (req.cookies.username) {
    next();
  } else {
    res.render('pages/authentication/login', {
      message: 'Login required! Please login to continue.', msgClass: 'danger', title: 'Login - SCS'
    });
  }
}

module.exports = authRequired;