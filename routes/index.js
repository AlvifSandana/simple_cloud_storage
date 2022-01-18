var express = require('express');
const authRequired = require('../middlewares/auth.middleware');
const Music = require('../models/music.model');
const Photo = require('../models/photo.model');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', authRequired, function (req, res, next) {
  const musics = Music.count({}, function (err, musics) {
    if (err) {
      res.render('pages/admin/dashboard', { title: 'Dashboard - SCS', music_count: 0 });
    } else {
      Photo.count({}, function (err, photos) {
        if (err) {
          res.render('pages/admin/dashboard', { title: 'Dashboard - SCS', music_count: musics, photo_count: 0 });
        } else {
          res.render('pages/admin/dashboard', { title: 'Dashboard - SCS', music_count: musics, photo_count: photos });
        }
      })
    }
  })
});

module.exports = router;
