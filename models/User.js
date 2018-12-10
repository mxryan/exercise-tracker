const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;