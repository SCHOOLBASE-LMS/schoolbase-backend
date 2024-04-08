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
router.get('/:id', assessmentController.getAssessment)

// Assessment recording and grading
router.post('/:id/create-record', assessmentController.createAssessmentRecord)
router.get('/record/:id', assessmentController.getAssessmentRecordById)
router.get('/:studentId/record', assessmentController.getAssessmentRecordByStudentId)
router.put('/mark/:id', assessmentController.markAssessment)
router.get('/responses/:studentId', assessmentController.getStudentsResponsesAndCorrectAnswer)

module.exports = router
