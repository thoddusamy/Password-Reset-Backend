const express = require("express")
const { Register } = require("../controllers/registerController")
const router = express.Router()

router.post("/", Register)

module.exports = router