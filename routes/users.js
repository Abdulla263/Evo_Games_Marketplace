const express = require("express")
const router = express.Router()
const User = require("../models/user")
const userCtrl = require("../controllers/user")
const isSignedIn = require("../middleware/is-signed-in")
const upload = require("../middleware/multer")

router.get("/profile", isSignedIn, userCtrl.user_profile_get)

router.get("/profile/edit", isSignedIn, async (req, res) => {
  const user = await User.findById(req.session.user._id)
  res.render("users/edit.ejs", { user })
})

router.put("/:id", isSignedIn, upload.single("pfp"), userCtrl.user_update_put)

module.exports = router
