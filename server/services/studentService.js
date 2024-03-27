const Student = require('../models/Student')

exports.applyForAdmission = async (applicationData) => {
  // Here, you could add logic to validate applicationData, check for duplicates, etc.
  const studentExists = await Student.findOne({ studentId: applicationData.studentId })
  // This could be a middleware too...
  if (studentExists) {
    throw new Error('An existing application is already pending for this student')
  }

  // Assuming applicationData is valid and the student doesn't already exist, save the new student.
  const newStudent = new Student(applicationData)
  await newStudent.save()

  return newStudent
}
