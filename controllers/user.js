const User = require('../models/user');
const Review = require("../models/reviews")
// Update user profile
exports.user_update_put = async (req, res) => {
  const currentUser = await User.findById(req.session.user._id)
  if (!currentUser) return res.redirect("/users/login")

  if (req.body.username !== undefined) currentUser.username = req.body.username
  if (req.body.email !== undefined) currentUser.email = req.body.email

  // Handle profile picture
  if (req.file) {
    currentUser.pfp = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  }

  await currentUser.save()
  res.redirect("/users/profile")
}

// Upload profile picture
exports.upload_pfp = async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  if (!currentUser) return res.redirect("/users/login");

  if (req.file) {
    currentUser.pfp = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };
  }

  await currentUser.save();
  res.redirect("/users/profile");
};

exports.user_profile_get = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const userItems = await Item.find({ owner: req.session.user._id });
  
  const itemsWithStats = [];
  
  for (const currentItem of userItems) {
    const itemReviews = await Review.find({ item: currentItem._id });
    
    itemsWithStats.push({
      item: currentItem,
      stats: {
        totalReviews: itemReviews.length,
        fairVotes: itemReviews.filter(review => review.voteType === 'fair').length,
        highVotes: itemReviews.filter(review => review.voteType === 'high').length
      }
    });
  }
  
  res.render("users/show.ejs", { user, itemsWithStats });
}