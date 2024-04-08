const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Student = require('../models/student')
const Teacher = require('../models/teacher')
const { sendMail } = require('../services/mailService')
const { generateOtp } = require('../utils/generateOTP')

// Register a new student
exports.registerUser = async (req, res) => {
  try {
    const { role, ...userData } = req.body

    // Create a new user instance
    const newUser = new User(userData)

    // Save the user to the database
    await newUser.save()

    let newRecord
    if (role === 'student') {
      const studentData = { user: newUser._id, ...userData }
      const newStudent = new Student(studentData)
      newRecord = await newStudent.save()
    } else if (role === 'teacher') {
      const teacherData = { user: newUser._id, ...userData }
      const newTeacher = new Teacher(teacherData)
      newRecord = await newTeacher.save()
    } else {
      return res.status(400).json({ message: 'Invalid role' })
    }

    // Send registration confirmation email to the user
    const subject = 'Welcome to SchoolBase!'
    const htmlContent = `<h3>Dear ${userData.firstName},</h3>
      <p>Welcome to SchoolBase! You have successfully registered as a ${role}.</p>
      <p>Best Regards,</p>
      <p>SCHOOLBASE team</p>`
    sendMail(userData.email, userData.firstName, subject, htmlContent)

    res.status(201).json({ message: `${role} registered successfully`, data: newRecord })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}

// Login a student
exports.loginStudent = async (req, res) => {
  try {
    const { studentId, password } = req.body

    // Check if student exists
    const student = await Student.findOne({ studentId })
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, student.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}

// Forgot password - Send password reset link to the student's email
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    // Check if student with the provided email exists
    const student = await Student.findOne({ 'user.email': email })
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    // send OTP
    // Generate password reset token
    const resetToken = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, { expiresIn: '30m' })

    // Send password reset email to the student
    const subject = 'Password Reset Request'
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`
    const htmlContent = `<h3>Dear ${student.user.firstName},</h3>
      <p>You have requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>Best Regards,</p>
      <p>SCHOOLBASE team</p>`
    sendMail(email, student.user.firstName, subject, htmlContent)

    res.status(200).json({ message: 'Password reset link sent to your email' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}

// Reset password - Update student's password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    // Find student by decoded token
    const student = await Student.findById(decodedToken.studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update student's password
    student.password = hashedPassword
    await student.save()

    res.status(200).json({ message: 'Password reset successful' })
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Password reset token expired' })
    }
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}
// Register a new teacher
exports.registerTeacher = async (req, res) => {
  try {
    const { user, classList, subjectsTaught } = req.body

    // Check if teacher email already exists
    const existingTeacher = await Teacher.findOne({ 'user.email': user.email })
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher email already exists' })
    }

    // Create a new teacher instance
    const newTeacher = new Teacher({
      user,
      class: { list: classList },
      subjectsTaught: { list: subjectsTaught }
    })

    // Save the teacher to the database
    await newTeacher.save()

    // Send registration confirmation email to the teacher
    const subject = 'Welcome to SchoolBase!'
    const htmlContent = `<h3>Dear ${user.firstName},</h3>
      <p>Welcome to SchoolBase! You have successfully registered as a teacher.</p>
      <p>Best Regards,</p>
      <p>SCHOOLBASE team</p>`
    sendMail(user.email, user.firstName, subject, htmlContent)

    res.status(201).json({ message: 'Teacher registered successfully', data: newTeacher })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}

const sendOtp = async (userEmail, userName) => {
  const { otp, otpExpires } = generateOtp()

  // Update user with OTP and expiration
  await User.findOneAndUpdate({ email: userEmail }, { otp, otpExpires })

  const subject = 'Your OTP for SchoolBase Registration'
  const htmlContent = `<h3>Dear ${userName},</h3>
    <p>Your OTP for SchoolBase registration is: <strong>${otp}</strong></p>
    <p>This OTP is valid for 20 minutes.</p>
    <p>If you did not request this, please ignore this email.</p>
    <p>Best Regards,</p>
    <p>SCHOOLBASE team</p>`

  sendMail(userEmail, userName, subject, htmlContent)
}

exports.verifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body

    // Find the user by email
    const user = await User.findOne({ email })

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if OTP matches and is not expired
    if (user.otp === otp && user.otpExpires > Date.now()) {
      // Clear OTP and expiration time after successful verification
      await User.findOneAndUpdate({ email }, { otp: null, otpExpires: null })

      return res.status(200).json({ message: 'User verified successfully' })
    } else {
      return res.status(400).json({ message: 'Invalid OTP or OTP expired' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}
