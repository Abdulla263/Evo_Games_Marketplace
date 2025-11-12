const router = require("express").Router()

//auth controller
const authCtrl = require("../controllers/auth")
const upload = require("../middleware/multer")
//router / calling API's

router.get("/sign-up", authCtrl.auth_signup_get)
router.post("/sign-up", upload.single("pfp"), authCtrl.auth_signup_post)

router.get("/sign-in", authCtrl.auth_signin_get)
router.post("/sign-in", authCtrl.auth_signin_post)

module.exports = router
