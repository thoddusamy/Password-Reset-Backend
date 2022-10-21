const express = require("express")
const { Login } = require("../controllers/loginController")
const router = express.Router()

router.post("/", Login)

module.exports = router