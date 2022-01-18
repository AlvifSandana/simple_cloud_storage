const express = require('express');
const multer = require('multer');
const MusicController = require('../controllers/music.controller');
const diskStorage = require('../helpers/diskstorage.helper');
const authRequired = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', authRequired, MusicController.index);
router.post('/upload', multer({ storage: diskStorage }).single("file"), MusicController.upload);

module.exports = router;
