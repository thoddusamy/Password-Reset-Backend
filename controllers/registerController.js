const express = require("express")
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient
require("dotenv").config()
const URL = process.env.DB_URL
const bcryptjs = require("bcryptjs");


const Register = async (req, res) => {
    try {
        let { name, email, password } = req.body
        const connection = await mongoClient.connect(URL)
        const db = await connection.db("Password_reset")
        const userExist = await db.collection("users").findOne({ email })
        if (userExist) {
            res.send({ message: "user already exist" })
        } else {
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(password, salt)
            password = hash
            const getData = await db.collection("users").insertOne({ name, email, password })
            connection.close()
            res.json({ message: "User registered successfully" })
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports = { Register }