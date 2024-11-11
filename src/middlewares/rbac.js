const { AppDataSource } = require("../config/mySqlConnect.config");
const { AppointmentModel } = require("../models/appointment.model");


const AppointmentTable = AppDataSource.getRepository(AppointmentModel);

const doctorAuthorization = async(req, res, next) => {

    try{

        const doctorId = req.user.id;
        const appointmentId = req.params.id;
        
        const appointment = await AppointmentTable.findOne(appointmentId);

        if(appointment.doctorId === doctorId){
            return next();
        }

        return res.status(404).json({message:"You are not authorized to perform this"})

    }catch(err){
        return res.status(500).json({message:err.message});
    }

}

const roleAuthorization = (req, res, next) =>{

    const role = req.user.role;
    if(role === "admin"){
        return next();
    }

    return res.status(404).json({message: "You are not authorized to perform this"})

}

module.exports = {
    doctorAuthorization,
    roleAuthorization
}