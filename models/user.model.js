const mongoose = require('mongoose');

// define Schema
const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    default: "",
  },
  username: {
    type: String, 
    required: true,
  },
  email: {
    type: String,
    default: "email@example.com",
    required: true,
  },
  password: {
    type: String,
    default: "12345678",
    required: true,
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
});

// define model
const User = mongoose.model("User", UserSchema);

module.exports = User;
