
const schedule = require("node-schedule");
const { AppDataSource } = require("../config/mySqlConnect.config");
const { AppointmentModel } = require("../models/appointment.model");
const { Between } = require("typeorm");
const { appointmentReminder } = require("../utils/emailtemplate.utils");
const { emailSender } = require("../config/nodemailer.config");

const AppointmentTable =  AppDataSource.getRepository(AppointmentModel);

schedule.scheduleJob("0 8 * * *", async()=>{ // schedule job to run daily at 8:00 am

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStart = new Date(tomorrow.setHours(0, 0, 0, 0));
    const tomorrowEnd = new Date(tomorrow.setHours(23, 59, 59, 999));
    try{

        const upcomingAppointments = await AppointmentTable.find({
            where:{
                appointmentTime: Between(tomorrowStart, tomorrowEnd),
                status: "approved"
            }
        });
        
        for(const appointment of upcomingAppointments){
            const emailContent = appointmentReminder(appointment);
            await emailSender.sendMail({
                from: process.env.USER_EMAIL,
                to: appointment.patientEmail,
                subject: emailContent.subject,
                text: emailContent.text,
                html: emailContent.html
            })
        }


    }catch(err){

        console.log(err.message);

    } 

})