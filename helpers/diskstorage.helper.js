require('dotenv').config();
const multer = require("multer");
const path = require('path');

// diskStorage config
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), process.env.APP_DATA_PATH, req.cookies.username));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

module.exports = diskStorage;
