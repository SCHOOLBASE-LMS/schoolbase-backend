// Route to handle questions and assessment creation
const express = require('express')
const router = express.Router()
const { assessmentController } = require('../controllers')

// Define routes

// Questions
router.post('/question', assessmentController.createQuestion)
router.post('/add-question/:id', assessmentController.addQuestionsToAssessment)
router.get('/question/:id', assessmentController.getQuestionById)
router.get('/question/filter', assessmentController.getQuestionByFilter)
router.get('/question/:class', assessmentController.getQuestionsByClass)

// Assessment
router.post('/create', assessmentController.createAssessment)
router.put('/set-mark/:id', assessmentController.setAssessmentTotalMarks)

module.exports = router
