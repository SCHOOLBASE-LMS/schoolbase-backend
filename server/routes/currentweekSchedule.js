const express = require('express')
const router = express.Router()
const { currentWeekSchedule } = require('../controllers')
const { isLoggedIn, isStudent } = require('../middlewares/auth')

router.get('/all-schedule', isLoggedIn, currentWeekSchedule.getClassScheduleByClass)

module.exports = router
