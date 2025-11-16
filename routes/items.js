const router = require("express").Router()
const itemsCtrl = require("../controllers/items")
const upload = require("../middleware/multer")

router.get("/", itemsCtrl.items_index_get)
router.get("/new", itemsCtrl.item_create_get)
router.post("/", itemsCtrl.items_create_post)
router.post("/new", upload.single("pfp"), authCtrl.auth_signup_post)

// router.get("/:listingId", itemsCtrl.listing_show_get)
// router.get("/:listingId/edit", itemsCtrl.listing_edit_get)
// router.put("/:listingId", itemsCtrl.listing_edit_put)
// router.delete("/:listingId", itemsCtrl.listing_remove_delete)

module.exports = router
