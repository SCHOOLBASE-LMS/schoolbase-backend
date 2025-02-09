const express = require('express')
const morgan = require('morgan')

require('dotenv').config()
const config = require('./server/config/env')()
const connectDB = require('./server/config/db')
const routes = require('./server/routes') // Adjust the path based on your project structure
const bodyParser = require("body-parser")
const cors = require("cors");

const app = express()
connectDB()

// SEED DATABASE
// const createManyQuestions = require('./server/utils/seed')
// createManyQuestions()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:true
    })
)
app.use(express.json())
app.use('/', routes)

const PORT = config.SERVER_PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
