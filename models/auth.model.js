const mongoose = require('mongoose')
const crypto = require('crypto')
const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true
		},
		name: {
			type: String,
			trim: true,
			required: true
		},
		hashedPassword: {
			type: String,
			required: true
		},
		salt: String,
		role: {
			type: String,
			default: 'Customer'
		},
		resetPasswordLink: {
			type: String,
			default: ''
		}
	},
	{ timeStamp: true }
)

// Vritual password
userSchema
	.virtual('password')
	.set(function (password) {
		this._password = password
		this.salt = this.makeSalt()
		this.hashedPassword = this.encryptPassword(password)
		console.log('hashed', this.hashedPassword)
	})
	.get(function () {
		return this._password
	})

userSchema.methods = {
	authenticate: function (plainPassword) {
		return this.encryptPassword(plainPassword) === this.hashedPassword
	},
	// Generate Salt
	makeSalt: function () {
		return Math.round(new Date().valueOf() * Math.random()) + ''
	},

	// Encrypt password
	encryptPassword: function (password) {
		if (!password) return ''
		try {
			return crypto
				.createHmac('sha1', this.salt)
				.update(password)
				.digest('hex')
		} catch (err) {
			console.log(err)
			return ''
		}
	}
}
module.exports = mongoose.model('user', userSchema)
