const mongoose = require('mongoose');

// define Schema
const OtherSchema = new mongoose.Schema({
  owner: {
    type: String,
    default: "",
  },
  filename: {
    type: String, 
    required: true,
  },
  filetype: {
    type: String,
    default: "file"
  },
  mimetype: {
    type: String,
    default: "file"
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
});

// define model
const Other = mongoose.model("Other", OtherSchema);

module.exports = Other;
