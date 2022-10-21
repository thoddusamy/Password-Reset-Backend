const express = require("express")
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient
require("dotenv").config()
const URL = process.env.DB_URL
const bcryptjs = require("bcryptjs");


const ResetPassword = async (req, res) => {
    try {
        let { email, password } = req.body
        const connection = await mongoClient.connect(URL)
        const db = await connection.db("Password_reset")
        const salt = await bcryptjs.genSalt(10)
        const hash = await bcryptjs.hash(password, salt)
        password = hash
        await db.collection("users").updateOne({ email }, { $set: { password } })
        await db.collection("users").updateOne({ email }, { $unset: { random_string: "" } })
        connection.close()
        res.json({ message: "Password updated successfull" })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { ResetPassword }