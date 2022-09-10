const {Schema, model } = require('mongoose')

const appointmentSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	place: String,
	image: String,
	detail: String,
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	status: {
		type: String,
		enum: ['waiting', 'overdue', 'done'],
		default: 'waiting',
	},

},{
	timestamps: true,
}
)

const appointmentModel = model('Appointment', appointmentSchema)

module.exports = appointmentModel
