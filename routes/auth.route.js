const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/auth.model')

const router = express.Router()

// Load controllers
const { registerController } = require('../controllers/auth.controller')
router.post('/register', registerController)

/**
 * @route POST api/auth
 * @desc Authentic user & return token
 * @access Public
 */
router.post('/', async (req, res) => {
	const { email, password } = req.body
	try {
		if (email === 'test@test.tst' && password === 'admin') {
			// Return jsonwebtoken
			const payload = {
				user: {
					id: email
				}
			}
			jwt.sign(payload, config.get('jwtSecret'), (error, token) => {
				if (error) throw error
				res.json({
					token
				})
			})
		}
	} catch (error) {}
})

module.exports = router
