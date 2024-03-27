// Route to handle questions and assessment creation
const express = require('express')
const router = express.Router()
const { createQuestion, createAssessment } = require('../controllers/assessmentController')

// Define routes

router.post('/question', createQuestion)
router.post('/create', createAssessment)

module.exports = router
