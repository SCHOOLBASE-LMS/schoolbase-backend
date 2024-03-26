// Route to handle student admission application
const express = require('express')
const router = express.Router()
const { applyForAdmission } = require('../controllers/studentController')

// Define routes

router.post('/apply', applyForAdmission)

module.exports = router
