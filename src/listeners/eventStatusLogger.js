

const fs = require("fs");
const { appointmentEvents } = require("../events/appointmentEvents");



appointmentEvents.on("statusChange",(appointment)=>{

    const log = `Appointment ID:${appointment.id}, Status:${appointment.staus} updated`

    fs.appendFile("logs/appointmentStatus.log",log, (err)=>{
        if(err){
            console.error("Something went wrong while updating the appointment");
        }
    })
})