const router = require("express").Router()
const itemsCtrl = require("../controllers/items")
const upload = require("../middleware/multer")

router.get("/", itemsCtrl.items_index_get)

router.get("/", itemsCtrl.listing_index_get)
router.get("/new", itemsCtrl.item_create_get)
router.post("/", itemsCtrl.items_create_post)

module.exports = router
