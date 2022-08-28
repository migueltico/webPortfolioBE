const userModel = require('../../models/project1/userModel')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
	const { fullname, password, email, image } = req.body
	const hash = bcrypt.hashSync(password, 10)
	console.log(hash)
	const user = new userModel({
		fullname,
		password: hash,
		email,
		image,
	})
	try {
		const result = await user.save()
		if (!result) {
			res.status(404).json({
				status: false,
				message: 'User not found',
			})
		}
		res.status(201).json({
			status: true,
			message: 'User created',
			result,
		})
	} catch (err) {
		res.status(500).json({ status: false, message: err })
	}
}
const getUser = async (req, res) => {
	const { _id } = req.body
	const user = await userModel.findById(_id)
	if (!user) {
		res.status(404).json({ status: false, message: 'User not found' })
	}

	user.password = undefined
	res.status(200).json({ status: true, message: 'User found', user })
}
const getUsers = async (req, res) => {
	const users = await userModel.find()
	if (!users.length) {
		res.status(404).json({ status: false, message: 'No users found' })
	}
	res.status(200).json({ status: true, message: 'Users found', users })
}

const updateUser = async (req, res) => {
	const { _id } = req.body
	const { fullname, password, email, image } = req.body
	const hash = await bcrypt.hash(password, 10)
	try {
		const user = await userModel.findByIdAndUpdate(_id, {
			fullname,
			password: hash,
			email,
			image,
		})
		if (!user) {
			res.status(404).json({
				status: false,
				message: 'User not found',
			})
		}
		res.json(user)
	} catch (err) {
		res.status(500).json({ status: false, message: err })
	}
}

module.exports = {
	createUser,
	getUser,
	updateUser,
	getUsers,
}
