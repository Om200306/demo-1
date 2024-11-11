
const appointConfirmation = (status, appointment) =>{

    return {
        subject: `Your Appointment has been ${status}`,
        text: `Dear ${appointment.patientName}, Your appoointment has been ${status}`,
        html: `<p>Dear ${appointment.patientName},</p><p>Your appointment with Dr. ${appointment.doctorName} has been <b>${status}</b>.</p>`
    }

}

const appointmentReminder = (appointment) =>{

    return {
        subject: `Appointment reminder`,
        text: `Dear ${appointment.patientName}, Your appoointment is scheduled for ${appointment.date}`,
        html: `<p>Dear ${appointment.patientName},</p><p>Your appointment with Dr. ${appointment.doctorName} has been scheduled on <b>${appointment.date}</b>.</p>`
    }

}

module.exports = {
    appointConfirmation,
    appointmentReminder
}

