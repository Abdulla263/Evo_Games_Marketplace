const Item = require("../models/items")

//Show items
exports.items_index_get = async (req, res) => {
  const items = await Item.find().populate("owner")
  res.render("listings/index.ejs", { items })
}
