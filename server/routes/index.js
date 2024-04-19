const express = require('express')
const studentRoutes = require('./student')
const teacherRoutes = require('./teacher')

const assessmentRoutes = require('./assessment')
const currentweekRoutes = require("./currentweekSchedule")

const router = express.Router()
router.use('/students', studentRoutes)
router.use('/teacher', teacherRoutes)

router.use('/assessment', assessmentRoutes)
// router.use('/teacher', teacherRoutes)
router.use('/current-class-schedule', currentweekRoutes)

module.exports = router
