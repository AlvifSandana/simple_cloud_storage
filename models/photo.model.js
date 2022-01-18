const mongoose = require('mongoose');

// define Schema
const PhotoSchema = new mongoose.Schema({
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
    default: "image"
  },
  mimetype: {
    type: String,
    default: "image/png"
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
});

// define model
const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
