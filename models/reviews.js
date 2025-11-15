const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  item_id: {
  type:Number,
  required: true
  },
  user_id: {
    type: Number,
    required: true
  },
  pricereview: {
    type:String,
    required:true
  },
  createTime:{
    type:Date
  }
})

