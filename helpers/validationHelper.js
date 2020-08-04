const { check } = require('express-validator')

// User registration
exports.registerValidator = [
	check('name', 'Name is required')
		.not()
		.isEmpty()
		.isLength({
			min: 3,
			max: 32
		})
		.withMessage('name must be between 3 to 32 characters'),
	check('email').not().isEmpty().withMessage('Invalid email address'),
	check('password', 'password is required').notEmpty(),
	check('password')
		.isLength({
			min: 6
		})
		.withMessage('Password must contain at least 6 characters')
		.matches(/\d/)
		.withMessage('password must contain a number')
]

// User log in
exports.loginValidator = [
	check('email').isEmail().withMessage('Invalid email address'),
	check('password', 'password is required').notEmpty(),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must contain at least 6 characters')
]

// Forget password
exports.forgetPasswordValidator = [
	check('email')
		.not()
		.isEmpty()
		.isEmail()
		.withMessage('Invalid email address')
]

// Reset password
exports.resetPasswordValidator = [
	check('newPassword')
		.not()
		.isEmpty()
		.isLength({
			min: 6
		})
		.withMessage('Password must contain atleast 6 characters')
		.matches(/\d/)
		.withMessage('password must contain a number')
]
