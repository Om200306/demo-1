

const {EntitySchema} = require("typeorm");

const chatModel = new EntitySchema({
    name: "Chat",
    tableName: "chats",

    columns:{
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        appointmentId:{
            type: "int",
            nullable: false,
        },
        senderId:{
            type: "int",
            nullable: false,
        },
        receiverId:{
            type: "int",
            nullable: false,
        },
        message:{
            type: "text",
            nullable: false,
        },
        sentAt:{
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        }
    }
});

module.exports = {
    chatModel
}