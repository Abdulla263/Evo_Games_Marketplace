const router = require("express").Router()
const itemsCtrl = require("../controllers/items")
const upload = require("../middleware/multer")
const isSignedIn = require("../middleware/is-signed-in")
const reviewCtrl = require("../controllers/reviews");

router.get("/", itemsCtrl.items_index_get)
router.get("/category/:category", itemsCtrl.items_category_get)
router.get("/new", isSignedIn, itemsCtrl.item_create_get)
router.post("/:itemId/price-review", isSignedIn, reviewCtrl.submitReview);
router.delete("/:itemId/price-review", isSignedIn, reviewCtrl.deleteReview);
router.get("/:itemId", itemsCtrl.items_show_get)

router.post(
  "/",
  isSignedIn,
  upload.single("images"),
  itemsCtrl.items_create_post
)

router.put(
  "/:itemId",
  isSignedIn,
  upload.single("images"),
  itemsCtrl.item_update_put
)

router.get("/:itemId/edit", isSignedIn, itemsCtrl.item_edit_get)
router.delete("/:itemId", itemsCtrl.item_delete_delete)

module.exports = router
