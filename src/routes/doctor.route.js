
const express = require("express");
const { deleteDoctor } = require("../controllers/doctor.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");
const { roleAuthorization } = require("../middlewares/rbac");


const DoctorRouter = express.Router();

DoctorRouter.delete("/:id", authenticate, roleAuthorization, deleteDoctor);


module.exports = {
    DoctorRouter
}