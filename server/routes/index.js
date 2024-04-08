const express = require('express')
const studentRoutes = require('./student')
const assessmentRoutes = require('./assessment')

const router = express.Router()

router.use('/students', studentRoutes)
router.use('/assessment', assessmentRoutes)

module.exports = router
