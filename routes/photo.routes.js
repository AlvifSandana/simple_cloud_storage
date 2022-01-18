const express = require('express');
const multer = require('multer');
const path = require('path');
const authRequired = require('../middlewares/auth.middleware');
const PhotoModel = require('../models/photo.model');
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
  const listphotos = PhotoModel.find({}, function (err, photos) {
    if (err) {
      console.log(err)
      res.render('pages/admin/photos', { title: 'Photos - SCS', message: err, msgClass: 'danger', listfiles: [] });
    } else {
      res.render('pages/admin/photos', { title: 'Photos - SCS', message: '', msgClass: '', listfiles: photos });
    }
  })
});

router.post('/upload', multer({ storage: diskStorage }).single("file"), function (req, res, next) {
  const file = req.file.path;
  console.log(file);
  if (!file) {
    res.render('pages/admin/photos', { title: 'Photos - SCS', message: "Failed to save image!", msgClass: "danger" });
  } else {
    PhotoModel.create({
      owner: req.cookies.username,
      original_filename: req.file.originalname,
      filename: file,
      filetype: req.file.mimetype,
      mimetype: req.file.mimetype,
      created_at: Timestamp('dateTime'),
      updated_at: Timestamp('dateTime'),
    }, function (err) {
      if (err) {
        console.log(err)
        res.render('pages/admin/photos', {
          message: err, msgClass: 'error', title: 'Photos - SCS',
        });
      } else {
        res.redirect('../photos');
      }
    });
  }
});

module.exports = router;
