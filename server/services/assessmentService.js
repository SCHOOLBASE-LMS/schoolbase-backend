const { Assessment, Question, AssessmentRecord } = require('../models')

const createQuestion = async (questionData) => {
  // Ther is need to handle media file upload for questions later
  const questionExists = await Question.findOne({ text: questionData.text, type: questionData.type })
  if (questionExists) {
    throw new Error('Question already exists')
  }
  const newQuestion = new Question(questionData)
  await newQuestion.save()
  return newQuestion
}

const getQuestionById = async (questionId) => {
  const question = await Question.findById({ _id: questionId })
  await question.populate('createdBy')
  if (!question) throw new Error('Question not found')
  return question
}

const getQuestionsByClass = async (question) => {
  const questions = await Question.findAll({ className: question.className })
  if (!questions) throw new Error(`No questions found for this class ${question.className}`)
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
  await assessment.populate('questions')
  if (!assessment) throw new Error('Assessment not found')
  return assessment
}

const addQuestionsToAssessment = async (assessmentId, questions) => {
  const assessment = await getAssessment(assessmentId)
  if (!assessment) throw new Error('Assessment not found')
  assessment.questions.push(questions.question)
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
  if (questionsInAssessment.length < 1) throw new Error('No questions added yet')
  const summedMarks = questionsInAssessment.reduce(
    (acc, question) =>
      acc + question.marks, 0)
  console.log(summedMarks)
  await updateAssessment(assessmentId, { totalMarks: summedMarks })
}

// Grade Assessment
const createAssessmentRecord = async (assessmentId, responses) => {
  const assessmentResponseExists = await AssessmentRecord.find({ assessment: assessmentId })
  if (assessmentResponseExists) throw new Error('Assessment as already been submitted')
  const assessmentResponse = new AssessmentRecord(responses)
  await assessmentResponse.save()
  return assessmentResponse
}

const getAssessmentRecord = async (assessmentId) => {
  const assessmentObj = await AssessmentRecord.findById({ assessmentId })
  assessmentObj.filter((assessment) => {
    return assessment.question === assessment.choice
  })
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
  setAssessmentTotalMarks,
  createAssessmentRecord,
  getAssessmentRecord
}
