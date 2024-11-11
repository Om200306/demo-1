
const { PatientModel } = require("../models/patient.model");


const updatePatient = async(req, res) => {

    const patientId = req.params.id;
    await PatientModel.findByIdAndUpdate(patientId, req.body);
    res.status(200).json({message: "patient has been updated"})

}


const deletePatient = async(req, res) => {

}


module.exports = {
    updatePatient,
    deletePatient
}