const { AppDataSource } = require("../config/mySqlConnect.config");
const { UserModel } = require("../models/user.model");


const UserTable =  AppDataSource.getRepository(UserModel);

const createUser = async(req, res) =>{

    const{name, email, password} = req.body;

    if(name && email && password){

        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = UserTable.create({
            name, email, password: hashedPassword, role: req.body.role ?  req.body.role : 'user'
        })

        await UserTable.save();
        return res.status(201).json({message: "new user have been created"});
    }


}

module.exports = {
    createUser
}