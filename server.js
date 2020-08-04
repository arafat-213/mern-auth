const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')

require('dotenv').config({
	path: './config/config.env'
})

const app = express()

// create a write stream in append mode for logging
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, 'access.log'),
	{ flags: 'a' }
)

//Use body-parser
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

//  Config for dev environment
if (process.env.NODE_ENV === 'development') {
	app.use(
		cors({
			origin: process.env.CLIENT_URL
		})
	)

	app.use(morgan('dev', { stream: accessLogStream }))
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
