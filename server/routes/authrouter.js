const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.post("/register", authController.registerUser)
router.post('/login', authController.loginStudent)
router.post('/forget-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)
router.post('/register-teacher',authController.registerTeacher)
router.post('/verify', authController.verifyUser)

module.exports = router
