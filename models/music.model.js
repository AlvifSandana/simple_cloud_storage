const mongoose = require('mongoose');

// define Schema
const MusicSchema = new mongoose.Schema({
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
    default: "audio/mp3"
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
});

// define model
const Music = mongoose.model("Music", MusicSchema);

module.exports = Music;
