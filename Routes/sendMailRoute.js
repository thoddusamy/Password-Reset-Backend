const express = require("express")
const { SendStringMail } = require("../controllers/sendMailController")
const router = express.Router()

router.post("/", SendStringMail)

module.exports = router