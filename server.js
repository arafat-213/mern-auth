const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')

require('dotenv').config({
	path: './config/config.env'
})

const app = express()

//Use body-parser
app.use(bodyParser.json())

//  Config for dev environment
if (process.env.NODE_ENV === 'development') {
	app.use(
		cors({
			origin: process.env.CLIENT_URL
		})
	)

	app.use(morgan('dev'))
}

// Connect MongoDB
connectDB()
// Load all routes
const authRouter = require('./routes/auth.route')

// Use routes
app.use('/api', authRouter)
app.use((req, res, next) => {
	res.status(404).json({
		success: false,
		message: 'Route not found'
	})
})
const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server is up on port ${PORT}`)
})
