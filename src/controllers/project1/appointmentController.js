const appointmentModel = require('../../models/project1/appointmentModel')

const getAllAppointmentsById = async (req, res) => {
	console.log(req.body)
	//find all appointments by user id
	const { id } = req.body
	const appointments = await appointmentModel
		.find({ userId: id })
		.populate('userId')
	res.json({ success: true, data: appointments })
}

const getAppointmentById = async (req, res) => {
	const { id } = req.params
	const appointment = await appointmentModel.findById(id)
	res.json({ success: true, data: appointment })
}

const createAppointment = async (req, res) => {
	const { name, date, time, place, image, detail, userId } = req.body
	const appointment = new appointmentModel({
		name,
		date,
		time,
		place,
		image,
		detail,
		userId,
	})
	try {
		const result = await appointment.save()
		if (!result) {
			res.status(404).json({
				success: false,
				message: 'Appointment not found',
			})
		}
		res.status(201).json({
			success: true,
			message: 'Appointment created',
			data: result,
		})
	} catch (err) {
		res.status(500).json({ success: false, message: err })
	}
}

const updateAppointment = async (req, res) => {
	try {
		const { id, name, date, time, place, image, detail, status } = req.body
		const result = await appointmentModel.findByIdAndUpdate(id, {
			name,
			date,
			time,
			place,
			image,
			detail,
			status,
		})
		res.json({
			success: true,
			message: 'Appointment updated',
			data: result,
		})
	} catch (err) {
		res.status(500).json({ success: false, message: err })
	}
}

const deleteAppointment = async (req, res) => {
	const { id } = req.body
	try {
		const appointment = await appointmentModel.findByIdAndDelete(id)
		if (!appointment) {
			res.status(404).json({
				success: false,
				message: 'Appointment not found',
			})
		}
		res.json({
			success: true,
			message: 'Appointment deleted',
			data: appointment,
		})
	} catch (err) {
		res.status(500).json({ success: false, message: err })
	}
}

module.exports = {
	getAllAppointmentsById,
	getAppointmentById,
	createAppointment,
	updateAppointment,
	deleteAppointment,
}
