const mongoose = require('mongoose');

// define Schema
const VideoSchema = new mongoose.Schema({
  owner: {
    type: String,
    default: "",
  },
  original_filename: {
    type: String,
    required: true,
  },
  filename: {
    type: String, 
    required: true,
  },
  filetype: {
    type: String,
    default: "audio"
  },
  mimetype: {
    type: String,
    default: "video/mpeg"
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
});

// define model
const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
