const express = require("express")
const router = express.Router()
const User = require("../models/user")
const userCtrl = require("../controllers/user")
const isSignedIn = require("../middleware/is-signed-in")
const upload = require("../middleware/multer")
const Items = require("../models/items")

// Show profile
router.get("/profile", isSignedIn, async (req, res) => {
  const user = await User.findById(req.session.user._id)


  const items = await Items.find({ owner: user._id })
  res.render("users/show.ejs", { user, items })
})

// Edit profile
router.get("/profile/edit", isSignedIn, async (req, res) => {
  const user = await User.findById(req.session.user._id)
  res.render("users/edit.ejs", { user })
})

// Update profile
router.put("/:id", isSignedIn, upload.single("pfp"), userCtrl.user_update_put)

module.exports = router
