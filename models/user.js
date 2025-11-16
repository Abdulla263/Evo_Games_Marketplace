const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pfp: {
    data: Buffer,
    contentType: String,
  },
  bio: {
    type: String,
    required: false,
  },
  createTime: {
    type: Date,
  },
})

const userModel = mongoose.model("userModel", userSchema)
module.exports = userModel
