const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Console", "Game", "Accessory"],
  },
  images: {
    data: Buffer,
    contentType: String,
    required: true,
  },
  condition: {
    type: String,
    required: false,
    enum: ["New", "Used"],
  },
  platform: {
    type: String,
    required: true,
    enum: ["Playstation", "Xbox", "Nintendo"],
  },
  postTime: {
    type: Date,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})
const itemsModel = mongoose.model("itemsModel", itemSchema)
module.exports = itemsModel
