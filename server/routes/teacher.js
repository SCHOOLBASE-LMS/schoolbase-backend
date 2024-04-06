// Route to handle teachers route
const express = require('express')
const router = express.Router()
const {teacherController} = require("../controllers")
const {isLoggedIn, isStudent} = require("../middlewares/auth")

// Define routes

router.post('/schedule', teacherController.ScheduleTimeTable)
router.get("/weeklyschedule", teacherController.getScheduleByCurrentWeek)
router.get("/schedule/:id",teacherController.getClassScheduleById)
router.put("/update-schedule/:id",teacherController.getClassScheduleByIdAndUpdate)
router.delete("/delete-schedule/:id",teacherController.getClassScheduleByIdAndDelete )

module.exports = router
