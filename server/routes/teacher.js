// Route to handle student admission application
const express = require('express')
const router = express.Router()
const Schedule = require('../controllers/teacherController')
const weeklySchedule = require("../controllers/getWeeklySchedule");

// Define routes

router.post('/schedule', Schedule.ScheduleTimeTable)
router.get("/weeklyschedule", weeklySchedule.getScheduleByCurrentWeek)
module.exports = router
