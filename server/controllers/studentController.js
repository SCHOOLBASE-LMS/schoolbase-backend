const studentService = require('../services/studentService')

exports.createStudent = async (req, res) => {
  try {
    const applicationData = req.body
    const application = await studentService.createStudentService(applicationData)
    res.status(200).json({ message: 'Application submitted successfully', data: application })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong....', error: error.message })
  }
}
