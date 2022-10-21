const express = require("express")
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient
require("dotenv").config()
const URL = process.env.DB_URL
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_CODE


const Login = async (req, res) => {
    try {
        let { email, password } = req.body
        const connection = await mongoClient.connect(URL)
        const db = await connection.db("Password_reset")

        const user = await db.collection("users").findOne({ email })

        if (user) {
            const matchPassword = await bcryptjs.compare(password, user.password)

            if (matchPassword) {
                const token = jwt.sign({ _id: user._id }, SECRET)
                res.status(200).json({
                    message: "LoggedIn successfull",
                    name: user.name,
                    token
                })
            } else {
                res.status(401).json({
                    message: "Incorrect password"
                })
            }
        } else {
            res.status(401).json({
                message: "User not found"
            })
        }
        connection.close()
    } catch (error) {
        console.log(error);
    }
}


module.exports = { Login }