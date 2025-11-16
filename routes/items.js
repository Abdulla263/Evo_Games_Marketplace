const router = require("express").Router()
const itemsCtrl = require("../controllers/items")
const upload = require("../middleware/multer")

router.get("/", itemsCtrl.items_index_get)
