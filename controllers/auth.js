const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const upload = require('../middleware/multer');

exports.auth_signup_get = async (req, res) => {
  res.render("auth/sign-up.ejs")
}
exports.auth_signup_post = async (req, res) => {
  const userInDb = await userModel.findOne({ username: req.body.username })
  if (userInDb) {
    return res.send("username already taken")
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and confirm Password must match!")
  }
  if (req.file) {
  // user uploaded a pfp
  req.body.pfp = {
    data: req.file.buffer,
    contentType: req.file.mimetype
  };
} else {
//user did not upload a pfp therefore default.jpg will be used
  const fs = require('fs');
  const defaultImage = fs.readFileSync('./uploads/default.jpg');

  req.body.pfp = {
    data: defaultImage,
    contentType: 'image/jpeg'
  };
}


  //registring the user by hashing the pass
  const hashedPassword = await bcrypt.hash(req.body.password, 5)
  req.body.password = hashedPassword

  // create the user
  const user = await userModel.create(req.body)
  res.send(`welcome ${user.username}`)
}
exports.auth_signin_get = async (req, res) => {
  res.render("auth/sign-in.ejs")
}

exports.auth_signin_post = async (req, res) => {
  const userInDb = await userModel.findOne({ username: req.body.username })
  if (!userInDb) {
    return res.send("Login failed, please try again later ")
  }
  const validPassword = bcrypt.compareSync(req.body.password, userInDb.password)
  if (!validPassword) {
    return res.send("Login failed, please try again later")
  }

  req.session.user = {
    username: userInDb.username,
    _id: userInDb._id,
  }
  res.redirect("/")
}


// sign out 

exports.auth_signout_get = async (req, res) => {
  req.session.destroy()
  res.redirect("/")
}