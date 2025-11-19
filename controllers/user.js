const User = require('../models/user');
const Review = require("../models/reviews")
const Item = require("../models/items");
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

  const itemsWithStats = await Promise.all(
    userItems.map(async (item) => {
      const reviews = await Review.find({ item: item._id });

      return {
        item: item,
        stats: {
          totalReviews: reviews.length,
          fairVotes: reviews.filter(r => r.voteType === 'fair').length,
          highVotes: reviews.filter(r => r.voteType === 'high').length
        }
      };
    })
  );

  res.render("users/show.ejs", { user, itemsWithStats });
};
