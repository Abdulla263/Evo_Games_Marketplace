const Review = require("../models/reviews");
const Item = require("../models/items");

// Submit or update a price review
exports.submitReview = async (req, res) => {
    const { itemId } = req.params;
    const { vote } = req.body;
    const userId = req.session.user._id;
  
    const item = await Item.findById(itemId);
    
    if (item.owner.equals(userId)) {
      return res.redirect(`/items/${itemId}`);
    }
  
    const existingReview = await Review.findOne({ 
      item: itemId, 
      user: userId 
    });
  
    if (existingReview) {
      existingReview.voteType = vote;
      await existingReview.save();
    } else {
      await Review.create({
        item: itemId,
        user: userId,
        voteType: vote
      });
    }
  
    res.redirect(`/items/${itemId}`);
  }

  exports.deleteReview = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.session.user._id;
  
    await Review.findOneAndDelete({ 
      item: itemId, 
      user: userId 
    });
  
    res.redirect(`/items/${itemId}`);
  }