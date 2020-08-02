const mongoose = require('mongoose')

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
		this.password = password
		this.salt = this.makeSalt()
		this.hashedPassword = this.encryptPassword(password)
	})
	.get(function () {
		return this._password
	})

userSchema.methods = {
	// Generate Salt
	makeSalt: function () {
		return Math.round(new Date().valueOf() * Math.random()) + ''
	},

	// Encrypt password
	encryptPassword: function () {
		if (!password) return ''
		try {
			return crypto
				.createHmac('sha1', this.salt)
				.update(password)
				.digest('hex')
		} catch (err) {
			return ''
			console.log(err)
		}
	},
	authenticate: function (plainPassword) {
		return this.encryptPassword(plainPassword) === this.hashedPassword
	}
}
module.exports = mongoose.model('user', userSchema)
