const router = require("express").Router()
const itemsCtrl = require("../controllers/items")
const upload = require("../middleware/multer")
const isSignedIn = require("../middleware/is-signed-in")

router.get("/", itemsCtrl.items_index_get)
router.get("/category/:category", itemsCtrl.items_category_get)
router.get("/new", isSignedIn, itemsCtrl.item_create_get)
router.get("/:itemId", itemsCtrl.items_show_get)

router.post(
  "/",
  isSignedIn,
  upload.single("images"),
  itemsCtrl.items_create_post
)
router.get("/:itemId/edit", isSignedIn, itemsCtrl.item_edit_get)
router.put("/:itemId", isSignedIn, itemsCtrl.item_update_put)
router.post("/", upload.single("images"), itemsCtrl.items_create_post)
router.get("/:itemId/edit", itemsCtrl.item_edit_get)
router.put("/:itemId",upload.single("images"), itemsCtrl.item_update_put)

router.delete("/:itemId", itemsCtrl.item_delete_delete);


module.exports = router
