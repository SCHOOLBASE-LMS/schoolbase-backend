const express = require('express')
const studentRoutes = require('./student')
const teacherRoutes = require('./teacher')

const assessmentRoutes = require('./assessment')

const router = express.Router()

router.use('/students', studentRoutes)
router.use('/teacher', teacherRoutes)

router.use('/assessment', assessmentRoutes)

module.exports = router
