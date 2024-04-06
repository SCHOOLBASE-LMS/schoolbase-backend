const express = require('express')
const studentRoutes = require('./student')
const teacherRoutes = require("./teacher")

const router = express.Router()

router.use('/students', studentRoutes)
router.use("/teacher", teacherRoutes)

module.exports = router
