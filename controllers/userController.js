const { request, response } = require('express')
const bcrypt = require('bcryptjs')

const User = require('./../models/user')

const createUser = async (req = request, res = response) => {
	const { name, password } = req.body
	// console.log(req.body)

	const user = new User({ name, password })
	// generar hash para hashear la pass
	const salt = bcrypt.genSaltSync()
	user.password = bcrypt.hashSync(password, salt)

	try {
		await user.save()

		res.status(201).json({
			user,
		})
	} catch (error) {
		res.status(400).json({
			msg: error,
		})
	}
}

const login = async (req, res) => {
	const { name, password } = req.body
	// console.log(req.body)
	try {
		const user = await User.findOne({ name })
		if (!user) {
			return res.status(400).json({
				msg: 'Usuario o password incorrectos',
			})
		}

		const passwordOk = bcrypt.compareSync(password, user.password)
		if (!passwordOk) {
			return res.status(400).json({
				msg: 'Usuario o password incorrectos',
			})
		}

		res.status(200).json({
			msg: 'ok',
			name: user.name,
		})
	} catch (error) {
		consol.log(error)
		res.status(500).json({
			msg: 'ups algo salio mal',
		})
	}
}

module.exports = { createUser, login }
