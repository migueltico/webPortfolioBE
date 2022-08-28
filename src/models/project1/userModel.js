const { Schema, model } = require('mongoose')
const userSchema = new Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},

		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const userModel = model('User', userSchema)

module.exports = userModel
