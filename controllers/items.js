const Item = require("../models/items")
const Review = require("../models/reviews")

// Show items
exports.items_index_get = async (req, res) => {
  const items = await Item.find({ owner: { $ne: null } }).populate("owner")
  res.render("items/index.ejs", { items })
}

//Show categories
exports.items_category_get = async (req, res) => {
  const category = req.params.category
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
  const items = await Item.find({
    category: formattedCategory,
    owner: { $ne: null },
  }).populate("owner")
  res.render("items/category.ejs", { items, category: formattedCategory })
}

// Show create form
exports.item_create_get = async (req, res) => {
  res.render("items/new.ejs")
}

// Show edit form
exports.item_edit_get = async (req, res) => {
  const currentitem = await Item.findById(req.params.itemId)
  res.render("items/edit.ejs", {
    item: currentitem,
  })
}

//using PUT to update the form in the database
exports.item_update_put = async (req, res) => {
  const currentitem = await Item.findById(req.params.itemId)
  if (currentitem.owner.equals(req.session.user._id)) {
    currentitem.title = req.body.title
    currentitem.desc = req.body.description
    currentitem.price = req.body.price
    currentitem.category = req.body.category
    currentitem.condition = req.body.condition
    currentitem.platform = req.body.platform

    if (req.file) {
      currentitem.images = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
    }
    await currentitem.save()
    res.redirect("/items")
  } else {
    res.send("permission denied")
  }
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
  let userHasReviewed = false
  if (req.session.user) {
    const userReview = await Review.findOne({
      item: req.params.itemId,
      user: req.session.user._id,
    })
    userHasReviewed = !!userReview
  }
  res.render("items/show.ejs", {
    item,
    userHasReviewed,
  })
}

//delete item
exports.item_delete_delete = async (req, res) => {
  const item = await Item.findById(req.params.itemId)
  if (item.owner.equals(req.session.user._id)) {
    await item.deleteOne()
    res.redirect("/items")
  } else {
    res.send("permission denied")
  }
}
