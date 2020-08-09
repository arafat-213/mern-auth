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
	}
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
			error: errorHandler(err)
		})
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
				message: 'Account activated, Log in to continue',
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
			error: error.name + ': ' + error.message
		})
	}
}

// User login
exports.loginController = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const firstError = errors.array().map(error => error.msg)[0]
			return res.status(422).json({
				error: firstError
			})
		}
		const { email, password, keepLoggedIn } = req.body
		const user = await User.findOne({ email })
		if (!user)
			return res.status(400).json({
				error: 'User does not exist, Please sign up first'
			})

		// Authenticate user
		if (!user.authenticate(password))
			return res.status(400).json({
				error: 'Invalid credentials'
			})
		// Generate token
		let expiryTime = keepLoggedIn ? '30d' : '1d'
		const token = jwt.sign(
			{
				_id: user._id
			},
			process.env.JWT_SECRET,
			{
				expiresIn: expiryTime
			}
		)

		const { _id, name, role } = user
		return res.json({
			token,
			user: {
				_id,
				name,
				email,
				role
			}
		})
	} catch (error) {
		return res.status(500).json({
			error: errorHandler(error)
		})
	}
}

// Forgot password, sends password reset link on user's email address
exports.forgetPasswordController = async (req, res) => {
	try {
		const { email } = req.body
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const firstError = errors.array().map(error => error.msg)[0]
			return res.status(422).json({
				error: firstError
			})
		}
		const user = await User.findOne({ email })
		if (!user)
			return res.status(400).json({
				error:
					'User does not exist, may be sign up first and then forget your password'
			})
		const token = jwt.sign(
			{
				_id: user._id
			},
			process.env.JWT_RESET_PASSWORD,
			{
				expiresIn: '100m'
			}
		)

		// save the token in user's document
		await user.updateOne({
			resetPasswordLink: token
		})

		// Send password reset link
		const emailData = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: 'Password Reset Link',
			html: `
			<h1> Please click link to reset password </h1>
			<h4> This link is valid for next 10 minutes </p>
			<p>${process.env.CLIENT_URL}/users/password/reset/${token} </p>

			<hr/>
			<p> This email contains sensitive info </p>
			<p>${process.env.CLIENT_URL} </p>
			`
		}
		await sgMail.send(emailData)
		return res.json({
			message: `Password reset link has been sent to ${email}`
		})
	} catch (error) {
		return res.status(400).json({
			error: errorHandler(error)
		})
	}
}

// Reset password, saves new password for user
exports.resetPasswordController = async (req, res) => {
	try {
		const { resetPasswordLink, newPassword } = req.body
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const firstError = errors.array().map(error => error.msg)[0]
			return res.status(422).json({
				error: firstError
			})
		}

		if (resetPasswordLink) {
			jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD)

			let user = await User.findOne({ resetPasswordLink })
			if (!user)
				return res.status(400).json({
					error: 'User not found'
				})

			const updateFields = {
				password: newPassword,
				resetPasswordLink: ''
			}

			user = _.extend(user, updateFields)

			await user.save()

			return res.json({
				message: 'Hurrayy! You can now log in with your new password'
			})
		}
	} catch (error) {
		console.log(error)
		return res.status(422).json({
			message: error.message
		})
	}
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
exports.googleLoginController = async (req, res) => {
	try {
		const { idToken } = req.body

		// verify token
		const response = await client.verifyIdToken({
			idToken,
			audience: process.env.GOOGLE_CLIENT
		})

		const { email_verified, name, email } = response.payload
		let user
		if (email_verified) user = await User.findOne({ email })
		else return res.status(400).json({ error: 'Google login failed' })
		if (user) {
			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: '7d'
			})

			const { _id, email, name, role } = user
			return res.json({
				token,
				user: { _id, email, name, role }
			})
		} else {
			// if user does not exist, create a new one and save it in db
			let password = email + process.env.JWT_SECRET
			user = new User({ name, email, password })
			await user.save()
			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: '7d'
			})
		}
	} catch (error) {
		console.log(error)
		res.status(400).json({
			error: error.kmessage
		})
	}
}
