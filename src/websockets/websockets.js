
const websocket = require("ws");

const appointmentEvents = require("../events/appointmentEvents");

const wss = new websocket.Server({port:8000});

wss.on("connection",(ws)=>{
    console.log("client connected");

    ws.on("close", ()=>console.log("Client Disconnected"));
})

appointmentEvents.on("statusChange", (appointment)=>{
    const message = JSON.stringify({
        type: "STATUS CHANGE",
        data: appointment
    })

    wss.clients.forEach((client)=>{
        if(client.readyState == websocket.OPEN){
            client.send(message);
        }
    })
})

module.exports = {
    wss
}