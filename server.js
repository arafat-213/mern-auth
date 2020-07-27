const express = require('express')
const connectDB = require('./config/db')

const app = express()

//Connect database
connectDB

app.listen(5000, () => {
	console.log('Server is up on port 5000')
})
