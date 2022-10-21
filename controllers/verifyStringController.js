const express = require("express")
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient
require("dotenv").config()
const URL = process.env.DB_URL

const verifyString = async (req, res) => {
    try {
        let { string, email } = req.body
        const connection = await mongoClient.connect(URL)
        const db = await connection.db("Password_reset")

        let verifyLinkString = await db.collection("users").findOne({ email })

        if (!verifyLinkString.random_string) {
            res.status(401).json({
                message: "Link expired",
                isVerified: false
            })
        } else if (verifyLinkString.random_string == string) {
            res.status(200).json({
                message: "Link verified successfull",
                isVerified: true
            })
        } else {
            res.status(401).json({
                message: "Link is not valid",
                isVerified: false
            })
        }
        connection.close()
    } catch (error) {
        console.log(error);
    }
}

module.exports = { verifyString }