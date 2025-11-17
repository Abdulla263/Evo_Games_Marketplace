const router = require("express").Router()
const itemsCtrl = require("../controllers/items")
const upload = require("../middleware/multer")

router.get("/", itemsCtrl.items_index_get)
router.get("/new", itemsCtrl.item_create_get)
// router.post("/", itemsCtrl.items_create_post)
router.get("/:itemId", itemsCtrl.items_show_get)
router.post("/", upload.single("images"), itemsCtrl.items_create_post)
router.get("/:itemId/edit", itemsCtrl.item_edit_get)
router.put("/:itemId",upload.single("images"), itemsCtrl.item_update_put)

router.delete("/:itemId", itemsCtrl.item_delete_delete);


module.exports = router
