const bcrypt = require("bcryptjs");
const { PatientModel } = require("../models/patient.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const registerController = async(req, res) =>{

    try{
        const {name, age, email, password} = req.body;
        if(name && age && email && password){
            const genSalts = await bcrypt.genSalt(8);
            const hashedPassword = await bcrypt.hash(password, genSalts);

            const newUser = new PatientModel({name, age, email, password: hashedPassword});
            
            await newUser.save();
            return res.status(201).json({message: "patient registration successful"});
        }

        return res.status(400).json({message:"Please fill all the required fields"});

    }catch(err){
        res.status(500).json({message: err.message});
    }

}



const loginController = async(req, res) =>{
    try{

        const{email, password} = req.body;
        if(email && password){
            const patient = await PatientModel.findOne({email});
            if(patient){

                const verified = await bcrypt.compare(password, patient.password);
                if(!verified){
                    res.status(404).json({message:"give correct credentials"})
                }
                const token = jwt.sign({email, id:patient._id},process.env.JWT_SECRET,{expiresIn:"1h"});
                res.status(200).json({token, message:"logged in succesfully"});
            }
        }
        return res.status(400).json({message:"Please fill all the required fields"});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}


module.exports = {
    registerController,
    loginController
}