const express = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

/**
 * @route POST api/user
 * @desc Register user
 * @access Public
 * * */
router.post('/', async (req, res) => {
	const { email, password } = req.body
	try {
		let user = await User.findOne({ email })
		if (user) {
			return res.status(400).json({
				errors: [{ msg: 'User already exisrs' }]
			})
		}

		// Create instance of User model
		user = new User({
			email,
			password
		})

		// Save user in DB
		await user.save()

		// Return jsonwebtoken
		const payload = {
			user: {
				id: user.id
			}
		}

		jwt.sign(
			payload,
			config.get('jwtSecret'),
			{ expiresIn: 360000 },
			(error, token) => {
				if (error) throw error
				res.json({ token })
			}
		)
	} catch (error) {
		res.status(500).send('Somehow somewhere something went wrong')
	}
})
