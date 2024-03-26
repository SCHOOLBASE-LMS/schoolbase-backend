const mongoose = require('mongoose')
const config = require('../config/env')()
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI)
    console.log(`Database Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1) // Exit process with failure
  }
}

module.exports = connectDB
