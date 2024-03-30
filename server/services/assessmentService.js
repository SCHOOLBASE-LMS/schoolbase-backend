const { Assessment, Question } = require('../models')

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

const getQuestionById = async (questionId) => {
  const question = await Question.findById({ questionId })
  if (!question) throw new Error('Question not found')
  return question
}

const getQuestionsByClass = async (className) => {
  const questions = await Question.findAll({ className })
  if (!questions) throw new Error(`No questions found for this class ${className}`)
  return questions
}

const getQuestionByFilter = async (filter) => {
  const questions = await Question.find(filter)
  if (!questions || questions.length === 0) throw new Error('No questions found for the filter you provided')
  return questions
}

// Assessment functions

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

const getAssessment = async (assessmentId) => {
  const assessment = await Assessment.findOne({ _id: assessmentId })
  if (!assessment) throw new Error('Assessment not found')
  return assessment
}

const addQuestionsToAssessment = async (assessmentId, questions) => {
  const assessment = await getAssessment(assessmentId)
  if (!assessment) throw new Error('Assessment not found')
  assessment.questions.push(...questions)
  assessment.save()
  return assessment
}

const updateAssessment = async (assessmentId, newData) => {
  const assessment = await getAssessment(assessmentId)
  if (!assessment) throw new Error('Assessment not found: ' + assessmentId)
  const updatedAssessment = assessment.set(newData)
  await updatedAssessment.save()
  return updatedAssessment
}

// This function will not be used for now. There is a pre-save hook serving the same purpose in the model.
const setAssessmentTotalMarks = async (assessmentId) => {
  const assessment = await getAssessment(assessmentId)
  if (!assessment) throw new Error('Assessment not found: ' + assessmentId)
  const questionsInAssessment = assessment.questions
  const summedMarks = questionsInAssessment.reduce(
    (acc, question) => {
      return acc + question.marks
    }, 0)
  updateAssessment(assessmentId, { totalMarks: summedMarks })
}

module.exports = {
  createQuestion,
  getQuestionById,
  getQuestionByFilter,
  getQuestionsByClass,
  createAssessment,
  getAssessment,
  addQuestionsToAssessment,
  updateAssessment,
  setAssessmentTotalMarks
}
