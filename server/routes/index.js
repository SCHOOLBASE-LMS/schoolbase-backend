const express = require('express')
const authRoutes = require('./auth')
const studentRoutes = require('./student')
const teacherRoutes = require('./teacher')

const assessmentRoutes = require('./assessment')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/students', studentRoutes)
router.use('/teacher', teacherRoutes)

router.use('/assessment', assessmentRoutes)

module.exports = router
