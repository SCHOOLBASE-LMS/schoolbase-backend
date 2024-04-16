// Route to handle student admission application
const express = require('express')
const router = express.Router()
const { getClassStudents, getStudentsAbsentData, getStudentsPresentData, markAttendance } = require('../controllers/studentAttendanceController')
// Route to handle teachers route
const { teacherController } = require('../controllers')
const { isLoggedIn, isStudent } = require('../middlewares/auth')

// Define routes

router.get('/studentAttendance/:class', getClassStudents)
router.get('/studentAbsent', getStudentsAbsentData)
router.get('/studentPresent', getStudentsPresentData)
router.post('/markAttendance', markAttendance)

// Define routes

router.post('/schedule', teacherController.ScheduleTimeTable)
router.get('/weeklyschedule', teacherController.getScheduleByCurrentWeek)
router.get('/schedule/:id', teacherController.getClassScheduleById)
router.put('/update-schedule/:id', teacherController.getClassScheduleByIdAndUpdate)
router.delete('/delete-schedule/:id', teacherController.getClassScheduleByIdAndDelete)

module.exports = router
