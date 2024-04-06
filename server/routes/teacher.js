// Route to handle student admission application
const express = require('express')
const router = express.Router()
const { getClassStudents, getStudentsAbsentData, getStudentsPresentData, markAttendance } = require("../controllers/studentAttendanceController")

// Define routes


router.get("/studentAttendance/:class", getClassStudents)
router.get("/studentAttendance", getStudentsAbsentData)
router.get("/studensPresent", getStudentsPresentData)
router.post("/markAttendance", markAttendance)

module.exports = router
