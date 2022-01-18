const Timestamp = require("../helpers/timestamp.helper");
const MusicModel = require("../models/music.model");

const MusicController = {
  index: function (req, res, next) {
    MusicModel.find({ owner: req.cookies.username }, function (err, musics) {
      if (err) {
        res.render('pages/admin/musics', { title: 'Musics - SCS', message: err, msgClass: 'danger', listfiles: [] });
      } else {
        res.render('pages/admin/musics', { title: 'Musics - SCS', message: '', msgClass: '', listfiles: musics });
      }
    })
  },
  upload: function (req, res, next) {
    const file = req.file.path;
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
  },
}

module.exports = MusicController;
