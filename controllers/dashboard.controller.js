const Music = require("../models/music.model");
const Photo = require("../models/photo.model");
const Video = require("../models/video.model");
const Other = require("../models/other.model");

const DashboardController = {
  index: (req, res, next) => {
    Music.count({ owner: req.cookies.username }, function (err, musics) {
      if (err) {
        res.render('pages/admin/dashboard', { title: 'Dashboard - SCS', music_count: 0 });
      } else {
        Photo.count({ owner: req.cookies.username }, function (err, photos) {
          if (err) {
            res.render('pages/admin/dashboard', { title: 'Dashboard - SCS', music_count: musics, photo_count: 0 });
          } else {
            Video.count({ owner: req.cookies.username }, function (err, videos) {
              if (err) {
                res.render('pages/admin/dashboard', { title: 'Dashboard - SCS', music_count: musics, photo_count: photos, video_count: 0 });
              } else {
                Other.count({ owner: req.cookies.username }, function (err, others) {
                  if (err) {
                    res.render('pages/admin/dashboard', { title: 'Dashboard - SCS', music_count: musics, photo_count: photos, video_count: videos, other_count: 0 });
                  } else {
                    res.render('pages/admin/dashboard', { title: 'Dashboard - SCS', music_count: musics, photo_count: photos, video_count: videos, other_count: others });
                  }
                })
              }
            })
          }
        });
      }
    });
  },
};

module.exports = DashboardController;

