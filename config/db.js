const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})
		console.log('Database connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

module.exports = connectDB
