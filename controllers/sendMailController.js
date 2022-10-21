const express = require("express")
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient
require("dotenv").config()
const URL = process.env.DB_URL
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

const SendStringMail = async (req, res) => {
    try {
        const { email } = req.body
        const connection = await mongoClient.connect(URL)
        const db = await connection.db("Password_reset")
        const userExist = await db.collection("users").findOne({ email })

        if (userExist) {
            let generateString = randomstring.generate({
                length: 20,
                charset: 'alphabetic'
            });

            const setRandomStringinDB = await db.collection("users").updateOne({ email }, { $set: { random_string: generateString } })

            let transport = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: `${process.env.MAIL_ID}`,
                    pass: `${process.env.MAIL_PASSWORD}`
                }
            })

            let mailOptions = {
                from: `${process.env.MAIL_ID}`,
                to: `${email}`,
                subject: "Password Reset Link",
                text: `
                Use the below link to reset your password:\n
                ${process.env.FRONTEND_URL}/passwordresetform/${email}/${generateString}`
            }

            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info.response)
                    res.json({ message: "Reset Link sended to Email address" })
                }
            })
        } else {
            res.status(401).json({ message: "Invalid email address" })
        }
        connection.close()
    } catch (error) {
        console.log(error);
    }
}


module.exports = { SendStringMail }