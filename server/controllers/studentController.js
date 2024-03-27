const studentService = require('../services/studentService')
require('dotenv').config()
const config = require('../config/env')()

exports.applyForAdmission = async (req, res) => {
  try {
    console.log(config.MONGODB_URI);
    const applicationData = req.body
    const application = await studentService.applyForAdmission(applicationData)
    res.status(200).json({ message: 'Application submitted successfully', data: application })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong....', error: error.message })
  }
}
