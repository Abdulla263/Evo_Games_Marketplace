const Item = require("../models/items")

// Show items
exports.items_index_get = async (req, res) => {
  const items = await Item.find().populate("owner")
  res.render("items/index.ejs", { items })
}

// Show create form
exports.item_create_get = async (req, res) => {
  res.render("items/new.ejs")
}

// Create item
exports.items_create_post = async (req, res) => {
  req.body.owner = req.session.user._id

  if (!req.file) {
    return res.send("Error: Item image is required!")
  }

  req.body.images = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  }

  await Item.create(req.body)
  res.redirect("/items")
}

// Show single item
exports.items_show_get = async (req, res) => {
  const item = await Item.findById(req.params.itemId).populate("owner")
  res.render("items/show.ejs", {
    item,
  })
}
