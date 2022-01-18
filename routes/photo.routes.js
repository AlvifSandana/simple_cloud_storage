const express = require('express');
const multer = require('multer');
const path = require('path');
const authRequired = require('../middlewares/auth.middleware');
const PhotoController = require('../controllers/photo.controller');
const diskStorage = require('../helpers/diskstorage.helper');

var router = express.Router();

router.get('/', authRequired, PhotoController.index);
router.post('/upload', multer({ storage: diskStorage }).single("file"), PhotoController.upload);

module.exports = router;
