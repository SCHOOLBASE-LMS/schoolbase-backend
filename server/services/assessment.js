const Assessment = require('../models/assessment')
const Question = require('../models/question')

const createQuestion = async (questionData) => {
  // Ther is need to handle media file upload for questions later
  const questionExists = await Question.findOne({ text: questionData.text, type: questionData.type })
  if (questionExists) {
    throw new Error('Question already exists')
  }
  const newQuestion = Question(questionData)
  await newQuestion.save()
  return newQuestion
}

const createAssessment = async (assessmentData) => {
  const assessmentExists = await Assessment.findOne({
    title: assessmentData.title,
    class: assessmentData.class,
    subject: assessmentData.subject
  })
  if (assessmentExists) throw new Error('Assessment already exists')
  const newAssessment = await Assessment(assessmentData)
  await newAssessment.save()
  return newAssessment
}

module.exports = {
  createQuestion,
  createAssessment
}
