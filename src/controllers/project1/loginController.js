const userModel = require('../../models/project1/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
	const { email, password } = req.body
	const user = await userModel.findOne({ email })
	if (!user) {
		res.status(401).json({ status: false, message: 'User not found' })
	}
	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		res.status(401).json({ status: false, message: 'Incorrect password' })
	}
	const token = jwt.sign({ _id: user._id, user }, process.env.JWT_SECRET)
	res.header('auth-token', token).json({ status: true, message: 'User logged in', token })
}

module.exports = {
	loginUser,
}
