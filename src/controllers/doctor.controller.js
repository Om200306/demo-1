const { DoctorModel } = require("../models/doctor.model");
const {redis} = require("../redis/redisClient");

const getDoctorsList = async(req, res) => {

    try{

        const cachedDoctors = await redis.get("doctor:list");

        if(cachedDoctors){
            return res.status(200).json({doctors:cachedDoctors});
        }
        
        const doctors = await DoctorModel.find({availability: true});

        await redis.set("doctor:list", JSON.stringify(doctors), "EX", 1800);

        res.status(200).json({doctors});

    }catch(err){
        res.status(500).json({message:err.message})
    }

}   

const updateDoctorDetails = async() => {

    try{
        const {doctorId} = req.params;
        const {name, specialization, availability} = req.body;
        await DoctorModel.findByIdAndUpdate(doctorId, {name, specialization, availability});

        await redis.del("doctor:list");

        return res.status(201).json({message:"Doctor details have been updated"})


    }catch(err){
        res.status(500).json({message:err.message})
    }

}

const searchDoctor = async(req, res) => {

    try{

        const {name, specialization, available} = req.query;
        const cacheKey = `doctors ${name}:${specialization}:${available}`;

        client.get(cacheKey, async(err, result)=>{

            if(result){
                return res.status(200).json({result});
            }
            
            const query = {};
            if(name){
                query.name = new RegExp(name); 
            }
            if(specialization){
                query.specialization = specialization;
            }
            if(available){
                query.available = available;
            }
            
            const doctors = await DoctorModel.find(query);
            client.seteX(cacheKey, 3600, JSON.stringify(doctors));
            return res.status(200).json({doctors});
        })
 
    }catch(err){
        return res.status(500).json({message:err.message})  
    }

}



const deleteDoctor = async(req, res) =>{

}


module.exports = {
    getDoctorsList,
    updateDoctorDetails,
    searchDoctor,
    deleteDoctor
}