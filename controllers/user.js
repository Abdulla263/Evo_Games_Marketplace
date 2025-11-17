const User = require('../models/user');

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
