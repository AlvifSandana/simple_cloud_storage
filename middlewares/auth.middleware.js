const authRequired = (req, res, next) => {
  console.log(req.session.user);
  if (req.session) {
    next();
  } else {
    res.render('pages/authentication/login', {
      message: 'Login required! Please login to continue.', msgClass: 'danger', title: 'Login - SCS'
    });
  }
}

module.exports = authRequired;