const Timestamp = require("../helpers/timestamp.helper");
const OtherModel = require("../models/other.model");

/**
 * Other Controller
 */
const OtherController = {
  /**
   * Show other index page.
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  index: function (req, res, next) {
    OtherModel.find({ owner: req.cookies.username }, function (err, others) {
      if (err) {
        console.log(err)
        res.render('pages/admin/others', { title: 'Others - SCS', message: err, msgClass: 'danger', listfiles: [] });
      } else {
        res.render('pages/admin/others', { title: 'Others - SCS', message: '', msgClass: '', listfiles: others });
      }
    })
  },

  /**
   * Handle upload file.
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  upload: function (req, res, next) {
    const file = req.file.path;
    if (!file) {
      res.render('pages/admin/others', { title: 'Others - SCS', message: "Failed to save File!", msgClass: "danger" });
    } else {
      OtherModel.create({
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
          res.render('pages/admin/others', {
            message: err, msgClass: 'error', title: 'Others - SCS',
          });
        } else {
          res.redirect('../others');
        }
      });
    }
  },
};

module.exports = OtherController;
