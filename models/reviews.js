const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'itemsModel',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
    required: true
  },
  voteType: {
    type: String,
    enum: ['fair', 'high'],
    required: true
  }
}, {
  timestamps: true
});

// Ensure one review per user per item
ReviewSchema.index({ item: 1, user: 1 }, { unique: true });

const ReviewModel = mongoose.model('ReviewModel', ReviewSchema);
module.exports = ReviewModel;
