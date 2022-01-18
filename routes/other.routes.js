const express = require('express');
const multer = require('multer');
const authRequired = require('../middlewares/auth.middleware');
const diskStorage = require('../helpers/diskstorage.helper');
const OtherController = require('../controllers/other.controller');

var router = express.Router();

router.get('/', authRequired, OtherController.index);
router.post('/upload', multer({ storage: diskStorage }).single("file"), OtherController.upload);

module.exports = router;
