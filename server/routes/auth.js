const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/user', authController.registerUser)

module.exports = router
