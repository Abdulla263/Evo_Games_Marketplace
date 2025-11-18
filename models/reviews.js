const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  voteType: {
    type: String,
    enum: ['fair', 'high'],
    required: true
  }
}, {
  timestamps: true // make timestamp outsdie the schema, MOngoDB will handle the updates , crates at at it as automatic
  //https://www.geeksforgeeks.org/mongodb/mongoose-timestamps/
});

priceReviewSchema.index({ item: 1, user: 1 }, { unique: true });
// this to make the users make ONLY one review to specific ONE item => to avoid duplicate reviews

const ReviewModel = mongoose.model('ReviewModel', ReviewSchema);
module.exports = ReviewModel