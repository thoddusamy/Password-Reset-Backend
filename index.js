const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const loginRoute = require('./Routes/loginRoute')
const registerRoute = require('./Routes/registerRoute')
const sendMailRoute = require('./Routes/sendMailRoute')
const checkStringRoute = require('./Routes/checkStringRoute')
const resetPassRoute = require('./Routes/resetPassRoute')

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send("Server is working awesome!")
})

app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use("/sendmail", sendMailRoute)
app.use("/checkString", checkStringRoute)
app.use("/resetpassword", resetPassRoute)


app.listen(process.env.PORT || 3222, () => console.log("Server is running at 3222"))