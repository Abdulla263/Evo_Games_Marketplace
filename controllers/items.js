const Item = require("../models/items")

//Show items
exports.items_index_get = async (req, res) => {
  const items = await Item.find().populate("owner")
  res.render("listings/index.ejs", { items })
}

//Show create form
exports.item_create_get = async (req, res) => {
  res.render("items/new.ejs")
}

// Create item
exports.items_create_post = async (req, res) => {
  req.body.owner = req.session.user._id
  if (req.file) req.body.image = req.file.filename
  await Item.create(req.body)
  res.redirect("/items")
}


