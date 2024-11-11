const express = require("express");
const { mongoDbConnection } = require("./config/mongoDBConnect.config");
const { AppDataSource } = require("./config/mySqlConnect.config");
require("./listeners/eventStatusLogger");
const webSocketServer = require("./websockets/websockets");
const http = require("http");
require("./jobs/appointmentReminder.jobs");
const socketIo = require("socket.io");
const { setupChatHander } = require("./websockets/chathandler");


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection",(socket)=>{
    console.log("New client connected:", socket.id);

    // chat Handler
    setupChatHander(io, socket)

    socket.on("disconnect", ()=>{
        console.log("Client disconnected:", socket.id);
    })
})

const port = 4000;

// whenever a doctor change his availbility status, there should be an endpoint from which the client can steream the data to check  the status of the doctor in real-time.

// Whenver a doctor approves an appointment, an email will be sent to the paitent his appointment has been approved

// reminder email =>  reminder email will be sent to the patient 1 day before the appointment date


webSocketServer.listen(server);


server.listen(port, async()=>{
    try{
        await mongoDbConnection;
        await AppDataSource.initialize();
        console.log("Databases connected successfully");
        console.log(`Server is running on port ${port}`);
    }catch(err){
        console.log(err.message);
    }
})




// doctor-patient appointment system => 
// features:
// 1> doctor & patient has to be authenticated,
// 2> patient can book an appointment with his desired doctor,
// 3> doctor can accept or reject the appointment request from patient,
// 4> Users => user & admin. users can view the appointements. Admin can remove appointments & remove doctor and patient from the system.
// 5> searching functionality on the appointments on the basis various paramenters

// mongodb => doctor & patient;
// mysql => appointment & user;
