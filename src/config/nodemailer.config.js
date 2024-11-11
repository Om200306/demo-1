
const { model } = require("mongoose");
const nodemailer = require("nodemailer");

const emailSender = nodemailer.createTransport({

    service:"gmail",
    auth:{
        user: process.env.USER_NAME,
        pass: process.env.USER_PASS 
    }

})

module.exports = {
    emailSender
}