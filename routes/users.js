const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isSignedIn = require('../middleware/is-signed-in');
const upload = require('../middleware/multer'); // <-- IMPORTANT

// Show profile
router.get('/profile', isSignedIn, async (req, res) => {
  const user = await User.findById(req.session.user._id);
  res.render('users/show.ejs', { user });
});
// Edit profile
router.get('/profile/edit', isSignedIn, async (req, res) => {
  const user = await User.findById(req.session.user._id);
  res.render('users/edit.ejs', { user });
});

// Upload profile picture
router.post('/profile/pfp', isSignedIn, upload.single('pfp'), async (req, res) => {
  console.log("FILE RECEIVED:", req.file); // debug

  const user = await User.findById(req.session.user._id);

  if (req.file) {
    user.pfp = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };
  }

  await user.save();
  res.redirect('/users/profile');
});

module.exports = router;
