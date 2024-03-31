// Route to handle student admission application
const express = require('express')
const router = express.Router()
const Schedule = require('../controllers/teacherController')

// Define routes

router.post('/schedule', Schedule.ScheduleTimeTable)

module.exports = router
