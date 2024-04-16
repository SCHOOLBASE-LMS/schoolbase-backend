const express = require('express')
const router = express.Router()

const { registerUser, loginStudent } = require('../controllers/authController')

router.post('/register', registerUser)
module.exports = router
