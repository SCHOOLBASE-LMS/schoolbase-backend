const Student = require('../models/student')
const User = require("../models/user")

exports.createStudentService = async (applicationData) => {
  // Here, you could add logic to validate applicationData, check for duplicates, etc.
  const studentExists = await User.findOne({ email: applicationData.email })
  // This could be a middleware too...
  
  if (studentExists) {
    throw new Error('An existing application is already pending for this student')
  }

  // Assuming applicationData is valid and the student doesn't already exist, save the new student.
  const newUser = new User(applicationData)
  await newUser.save()
  const newStudent = new Student({ user: newUser._id, class: applicationData.class})
  await newStudent.save()

  return newStudent
}
