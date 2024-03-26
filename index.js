const express = require('express')

require('dotenv').config()
const config = require('./server/config/env')()
const connectDB = require('./server/config/db')
const routes = require('./server/routes') // Adjust the path based on your project structure

const app = express()
connectDB()
app.use(express.json())
app.use('/', routes)
app.use(express.json()) // for parsing application/json

const PORT = config.SERVER_PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
