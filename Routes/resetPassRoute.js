const express = require("express")
const { ResetPassword } = require("../controllers/resetPassController")
const router = express.Router()

router.post("/", ResetPassword)

module.exports = router