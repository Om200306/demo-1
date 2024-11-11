const {EntitySchema} = require("typeorm");


const UserModel = new EntitySchema({

    name: "User",
    tableName: "Users",
    columns:{
        id:{
            primary: true,
            type: "int",
            generated: true,
        },
        name:{
            type: "varchar",
            length: 255,
            nullable: false,
        },
        email:{
            type: "varchar",
            length: 255,
            nullable: false,
            unique: true,
        },
        password:{
            type: "varchar",
            length: 255,
            nullable: false,
        },
        role:{
            type: "enum",
            enum:["user", "admin"],
            default: "user",
        },
        createdAt:{
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        }
    }

})

module.exports = {
    UserModel
}