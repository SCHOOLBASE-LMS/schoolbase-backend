// Route to handle student admission application
const express = require('express')
const router = express.Router()
const  {createStudent}  = require('../controllers/studentController')

// Define routes

router.post("/signup", createStudent)


module.exports = router