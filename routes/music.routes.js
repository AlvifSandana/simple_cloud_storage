const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const authRequired = require('../middlewares/auth.middleware');
const MusicModel = require('../models/music.model');
const Timestamp = require('../helpers/timestamp.helper');

var router = express.Router();

// diskStorage config
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/data/users/", req.cookies.username));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

router.get('/', authRequired, function (req, res, next) {
  const listFiles = fs.readdirSync(path.join(process.cwd(), "/data/users", req.cookies.username));
  const listmusics = MusicModel.find({}, function(err, musics){
    if(err){
      res.render('pages/admin/musics', { title: 'Musics - SCS', message: err, msgClass: 'danger', listfiles: [] });
    }else{
      res.render('pages/admin/musics', { title: 'Musics - SCS', message: '', msgClass: '', listfiles: musics });
    }
  })
});

router.post('/upload', multer({ storage: diskStorage }).single("file"), function (req, res, next) {
  const file = req.file.path;
  console.log(file);
  if (!file) {
    res.render('pages/admin/musics', { title: 'Musics - SCS', message: "Failed to save audio!", msgClass: "danger" });
  } else {
    MusicModel.create({
      owner: req.cookies.username,
      original_filename: req.file.originalname,
      filename: file,
      filetype: req.file.mimetype,
      mimetype: req.file.mimetype,
      created_at: Timestamp('dateTime'),
      updated_at: Timestamp('dateTime'),
    }, function (err) {
      if (err) {
        res.render('pages/admin/musics', {
          message: err, msgClass: 'error', title: 'Musics - SCS',
        });
      } else {
        res.redirect('../musics');
      }
    });
  }
});

module.exports = router;
