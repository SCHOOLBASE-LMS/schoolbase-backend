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

const Student = require('../models/Student');

exports.registerStudent = async (studentData) => {
  try {
    // Create a new student using the provided data
    const newStudent = new Student(studentData);
    await newStudent.save();
    return newStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.loginStudent = async (studentId) => {
  try {
    // Implement your logic for student login here
    // For example, generate and return an authentication token
    const token = generateAuthToken(studentId);
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Dummy function to generate authentication token
function generateAuthToken(studentId) {
  // Implement your authentication logic here (e.g., JWT token generation)
  const token = 'generated_token_for_' + studentId;
  return token;
}
