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
	activationController
} = require('../controllers/auth.controller')

const router = express.Router()

router.post('/register', registerValidator, registerController)
router.post('/activation', activationController)

module.exports = router
