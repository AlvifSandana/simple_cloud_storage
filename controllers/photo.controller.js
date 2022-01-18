const Timestamp = require('../helpers/timestamp.helper');
const PhotoModel = require('../models/photo.model');
const fs = require('fs');
const path = require('path');

/**
 * Photo Controller
 */
const PhotoController = {
  /**
   * Show photo index page.
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  index: function (req, res, next) {
    PhotoModel.find({ owner: req.cookies.username }, function (err, photos) {
      if (err) {
        res.render('pages/admin/photos', { title: 'Photos - SCS', message: err, msgClass: 'danger', listfiles: [] });
      } else {
        res.render('pages/admin/photos', { title: 'Photos - SCS', message: '', msgClass: '', listfiles: photos });
      }
    })
  },

  /**
   * Handle image file upload.
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  upload: function (req, res, next) {
    const file = req.file.path;
    const file_path = file.split('/');
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
          res.render('pages/admin/photos', {
            message: err, msgClass: 'error', title: 'Photos - SCS',
          });
        } else {
          fs.copyFileSync(file, path.join(process.cwd(), '/public/images/', file_path[file_path.length - 1]), fs.constants.COPYFILE_EXCL);
          res.redirect('../photos');
        }
      });
    }
  },

  delete: function (req, res, next) {
    const id = req.params.id;
    PhotoModel.findById(id, function (err, photo) {
      if (err) {
        res.render('pages/admin/photos', {
          message: err, msgClass: 'error', title: 'Photos - SCS',
        });
      } else {
        PhotoModel.deleteOne({ owner: photo.owner, original_filename: photo.original_filename })
          .then((result) => {
            if (result) {
              res.redirect('/photos');
            }
          })
          .catch((err) => {
            res.render('pages/admin/photos', {
              message: err, msgClass: 'error', title: 'Photos - SCS',
            });
          });
      }
    });
  }
}

module.exports = PhotoController;
