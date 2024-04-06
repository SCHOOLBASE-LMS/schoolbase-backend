// Route to handle student admission application
const express = require('express')
const router = express.Router()
const {teacherController} = require("../controllers")
const {isLoggedIn, isStudent} = require("../middlewares/auth")
// const Schedule = require('../controllers/teacherController')
// const weeklySchedule = require("../controllers/getWeeklySchedule");

// Define routes

router.post('/schedule', teacherController.ScheduleTimeTable)
// router.get("/weeklyschedule", teacherController.getScheduleByCurrentWeek)
router.post('/schedule', teacherController.ScheduleTimeTable)
router.get("/all-schedule",teacherController.getAllClassSchedule)
router.get("/timetable",isLoggedIn, isStudent, teacherController.getClassScheduleByClass)
router.get("/schedule:id",teacherController.getClassScheduleById)
router.put("/update-schedule:id",teacherController.  getClassScheduleByIdAndUpdate)

module.exports = router
