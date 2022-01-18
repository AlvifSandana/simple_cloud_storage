const express = require('express');
const multer = require('multer');
const VideoController = require('../controllers/video.controller');
const diskStorage = require('../helpers/diskstorage.helper');
const authRequired = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', authRequired, VideoController.index);
router.post('/upload', multer({ storage: diskStorage }).single("file"), VideoController.upload);

module.exports = router;
