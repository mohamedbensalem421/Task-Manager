let express = require("express")
let router = express.Router()
let {register,login} = require("../controllers/auth")

router.route("/register").post(register)
router.route("/login").post(login)

module.exports = router
