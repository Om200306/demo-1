const { EntitySchema } = require("typeorm");

// Appointment Entity Schema
const AppointmentModel = new EntitySchema({
    name: "Appointment",
    tableName: "appointments",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        patientId: {
            type: "varchar", // Storing MongoDB ObjectId as string
            length: 24,       // MongoDB ObjectId length is 24 characters
            nullable: false,
        },
        doctorId: {
            type: "varchar", // Storing MongoDB ObjectId as string
            length: 24,
            nullable: false,
        },
        appointmentTime: {
            type: "timestamp",
            nullable: false,
        },
        reason: {
            type: "varchar",
            length: 255,
            nullable: true,
        },
        status:{
            type:"enum",
            enum:["pending","approved","rejected"],
            default:"pending"
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
    },
});

module.exports = {
    AppointmentModel,
};
