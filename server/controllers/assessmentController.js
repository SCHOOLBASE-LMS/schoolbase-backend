const assessmentService = require('../services/assessment')

const createQuestion = async (req, res) => {
  try {
    const questionData = req.body
    const question = await assessmentService.createQuestion(questionData)
    return res.status(201).json({ message: 'success', data: question })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const createAssessment = async (req, res) => {
  try {
    const assessmentData = req.body
    const assessment = await assessmentService.createAssessment(assessmentData)
    return res.status(201).json({ message: 'successfully created assessment', data: assessment })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createQuestion,
  createAssessment
}
