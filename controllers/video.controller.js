const Timestamp = require("../helpers/timestamp.helper");
const VideoModel = require("../models/video.model");

/**
 * Video Controller
 */
const VideoController = {
  /**
   * Show music index page.
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  index: function (req, res, next) {
    VideoModel.find({ owner: req.cookies.username }, function (err, videos) {
      if (err) {
        console.log(err)
        res.render('pages/admin/videos', { title: 'Videos - SCS', message: err, msgClass: 'danger', listfiles: [] });
      } else {
        res.render('pages/admin/videos', { title: 'Videos - SCS', message: '', msgClass: '', listfiles: videos });
      }
    })
  },

  /**
   * Handle file upload.
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  upload: function (req, res, next) {
    const file = req.file.path;
    if (!file) {
      res.render('pages/admin/videos', { title: 'Videos - SCS', message: "Failed to save video!", msgClass: "danger" });
    } else {
      VideoModel.create({
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
          res.render('pages/admin/videos', {
            message: err, msgClass: 'error', title: 'Videos - SCS',
          });
        } else {
          res.redirect('../videos');
        }
      });
    }
  },
};

module.exports = VideoController;
