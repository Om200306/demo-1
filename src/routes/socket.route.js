

const express = require("express");
const socketRouter = express.Router();

socketRouter.get("/chat/connect",(req, res)=>{
    res.send("Chat session connected")
})

module.exports = {
    socketRouter
}