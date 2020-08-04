const User = require('../models/auth.model')
const expressJwt = require('express-jwt')
const _ = require('lodash')
const { OAuth2Client } = require('google-auth-library')
const fetch = require('node-fetch')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../helpers/dbErrorHandling')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.MAIL_KEY)

// User registration
exports.registerController = async (req, res) => {
	const { name, email, password } = req.body
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const firstError = errors.array().map(error => error.msg)[0]
		return res.status(422).json({
			error: firstError
		})
	} else {
		let user = await User.findOne({ email })
		if (user) {
			return res.status(400).json({
				error: 'Email is already taken'
			})
		}

		// Generate token
		const token = jwt.sign(
			{
				name,
				email,
				password
			},
			process.env.JWT_ACCOUNT_ACTIVATION,
			{
				expiresIn: '15m'
			}
		)

		// Email
		const emailData = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: 'Account activation link',
			html: `
			<h1> Please click link to activate </h1>
			<p>${process.env.CLIENT_URL}/users/activate/${token} </p>
			<hr/>
			<p> This email contains sensitive info </p>
			<p>${process.env.CLIENT_URL} </p>
			`
		}

		try {
			await sgMail.send(emailData)
			return res.json({
				message: `Email has been sent to ${email}`
			})
		} catch (error) {
			console.log(error)
			return res.status(400).json({
				success: false,
				errors: errorHandler(err)
			})
		}
	}
}

// User activation
// Saving the user in DB only after the activation link sent as mail is clicked activationController
exports.activationController = async (req, res) => {
	const { token } = req.body
	try {
		if (token) {
			const decoded = jwt.verify(
				token,
				process.env.JWT_ACCOUNT_ACTIVATION
			)

			// Decode the token and get user info
			const { name, email, password } = decoded
			// console.log(password)
			let user = new User({
				name,
				email,
				password
			})

			// Save the user in DB
			await user.save()
			return res.json({
				success: true,
				message: 'Signed up successfully',
				user
			})
		} else {
			// token missing
			return res.status(401).json({
				error: 'authentication token missing, please sign up again'
			})
		}
	} catch (error) {
		console.log(error)
		return res.status(401).json({
			error: errorHandler(error)
		})
	}
}
