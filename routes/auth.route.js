const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/auth.model')

// Load validators
const {
	registerValidator,
	loginValidator,
	forgetPasswordValidator,
	resetPasswordValidator
} = require('../helpers/validationHelper')
// Load controllers
const {
	registerController,
	activationController,
	loginController,
	forgetPasswordController,
	resetPasswordController,
	googleLoginController
} = require('../controllers/auth.controller')

const router = express.Router()

router.post('/register', registerValidator, registerController)
router.post('/login', loginValidator, loginController)
router.post('/activation', activationController)
router.put(
	'/password/forget',
	forgetPasswordValidator,
	forgetPasswordController
)
router.put('/password/reset', resetPasswordValidator, resetPasswordController)
router.post('/googlelogin', googleLoginController)

module.exports = router
