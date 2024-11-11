const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const PatientModel= mongoose.model('patient', PatientSchema);

module.exports = {
  PatientModel
};

