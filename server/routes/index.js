const express = require('express')
const authRoutes = require('./auth')
const studentRoutes = require('./student')
const teacherRoutes = require('./teacher')
const assessmentRoutes = require('./assessment')
const currentweekRoutes = require('./currentweekSchedule')

const router = express.Router()
router.use('/auth', authRoutes)
router.use('/students', studentRoutes)
router.use('/teacher', teacherRoutes)
router.use('/assessment', assessmentRoutes)
router.use('/current-class-schedule', currentweekRoutes)
router.get('/helloworld', (req, res)=> {res.send("Hello World this is Schoolbase backend")})

module.exports = router
