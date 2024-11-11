const { emailSender } = require("../config/nodemailer.config");
const { appointmentEvents } = require("../events/appointmentEvents");
const { AppointmentModel } = require("../models/appointment.model");
const { appointConfirmation } = require("../utils/emailtemplate.utils");



const AppointmentTable =  AppDataSource.getRepository(AppointmentModel);

const searchAppointments = async(req, res) => {

    try{

        const {from, to, status} = req.query;

        const queryBuilder = AppointmentTable.createQueryBuilder("appointment");
        
        if(from && to){
            queryBuilder.andWhere("appointment.appointmentTime BETWEEN :from AND :to",{from, to});
        }   

        if(status){
            queryBuilder.andWhere("appointment.status = :status",{status});
        }

        const appointments = await queryBuilder.getMany();
        res.status(200).json({appointments});

    }catch(err){
        return res.status(500).json({message:err.message})  
    }


}

const  createAppointment = async(req, res) => {

    try{

        const {patientId, doctorId, appointmentTime, reason} = req.body;
        const appointment = AppointmentTable.create({
            patientId, doctorId, appointmentTime, reason
        })
        await AppointmentTable.save();
        return res.status(201).json({message: "appointment has been created"});

    }catch(err){
        return res.status(500).json({message:err.message})
    }

}

const updateAppointmentStatus = async(req, res) => {

    try{
        
        const appointmentId = req.params.id;
        const {status} = req.body;
        if(!["rejected", "approved"].includes(status)){
            return res.status(400).json({message:"Invalid status"});
        }
        const appointment = AppointmentTable.findOne({where: {id:appointmentId}});
        if(!appointment){
            return res.status(404).json({message:"Appointement not found"});
        }
        appointment.status = status;
        await AppointmentTable.save(appointment);
        const emailContent = appointConfirmation(status, appointment);
        await emailSender.sendMail({
            from: process.env.USER_EMAIL,
            to: appointment.patientEmail,
            subject: emailContent.subject,
            text: emailContent.text,
            html: emailContent.html
        })
        appointmentEvents.emit("statusChange",appointment)

        return res.status(200).json({message: "Appointment Status has been updated"});

    }catch(err){
        return res.status(500).json({message:err.message})  
    }

}

const reschedulingAppointment = async(req, res) => {

    try{

        const {id} = req.params.id;
        const {newAppointmentTime} = req.body;

        const appointment = AppointmentTable.findOne({where:{id}});
        if(!appointment){
            return res.status(404).json({message:"Appointment not found"});
        }

        const conflictingAppointment = await AppointmentTable.findOne({
            where:{
                doctorId: appointment.doctorId,
                appointmentTime:newAppointmentTime,
                status: "approved"
            }
        })

        if(conflictingAppointment){
            return res.status(400).json({message:"Appointment time slot has already been booked"});
        }

        appointment.appointmentTime = newAppointmentTime;
        appointment.status = "pending";
        await AppointmentTable.save(appointment);

        return res.status(200).json({message:"Appointment has been rescheduled"});


    }catch(err){

        return res.status(500).json({message:err.message})  

    }


}










module.exports = {
    searchAppointments,
    createAppointment,
    updateAppointmentStatus,
    reschedulingAppointment
}