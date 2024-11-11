const { AppDataSource } = require("../config/mySqlConnect.config");
const { chatModel } = require("../models/chat.model");


const chatTable = AppDataSource.getRepository(chatModel);


function setupChatHander(io, socket){

    socket.on("join_chat", (appointmentId)=>{
        socket.join(`appointment_${appointmentId}`)
    });

    socket.on("send_message", async(appointmentId, senderId, receiverId, message)=>{
        const chatMessage = await chatTable.save({
            appointmentId, 
            senderId, 
            receiverId,
            message
        })
        io.to(`appointment_${appointmentId}`).emit("receive_message", chatMessage)
    })


}

module.exports = {
    setupChatHander
}