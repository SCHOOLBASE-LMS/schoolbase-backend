const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'short-answer', 'essay'],
    required: true
  },
  media: {
    list: [String] // Allows for embedding media like diagrams/audio/video files in a question
  },
  options: [{ text: String, isCorrect: Boolean }], // For 'multiple-choice' and 'true/false'
  correctAnswer: String, // For 'short-answer' and 'essay'; for 'multiple-choice' and 'true/false', it is derived from options
  marks: Number
}, { timestamps: true })

const Question = mongoose.model('Question', QuestionSchema)
module.exports = Question
