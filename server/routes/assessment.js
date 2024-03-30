// Route to handle questions and assessment creation
const express = require('express')
const router = express.Router()
const { assessmentController } = require('../controllers')

// Define routes

router.post('/question', assessmentController.createQuestion)
router.post('/create', assessmentController.createAssessment)

module.exports = router
