const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
title:{
  type:String,
  required:true
},
desc:{
  type:String,
  required:false
},
price:{
  type:Number,
  required:true
},





})
