const express = require("express")
const { verifyString } = require("../controllers/verifyStringController")
const router = express.Router()

router.post("/", verifyString)

module.exports = router