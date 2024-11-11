
const express = require("express");
const { createAppointment, updateAppointment } = require("../controllers/appointment.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");
const { doctorAuthorization } = require("../middlewares/rbac");



const AppointmentRouter = express.Router();

AppointmentRouter.post("/create", authenticate, createAppointment);
AppointmentRouter.put("/:id", authenticate, doctorAuthorization, updateAppointment);


module.exports = {
    AppointmentRouter
}