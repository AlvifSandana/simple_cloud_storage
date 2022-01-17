var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/admin/dashboard', { title: 'Dashboard - SCS' });
});

router.get('/login', function(req, res, next) {
  res.render('pages/authentication/login', { title: 'Login SCS' });
});
router.get('/register', function(req, res, next) {
  res.render('pages/authentication/register', { title: 'Register SCS' });
});

module.exports = router;
