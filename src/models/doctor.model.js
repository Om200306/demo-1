const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  availability: { type: Boolean, default: true },
});

const DoctorModel = mongoose.model('Doctor', DoctorSchema);

module.exports = {
  DoctorModel
}