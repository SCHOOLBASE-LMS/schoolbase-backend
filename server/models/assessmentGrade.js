const mongoose = require('mongoose')

const AssessmentGradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  marksObtained: {
    type: Number,
    required: true
  },
  feedback: String
}, { timestamps: true })

const AssessmentGrade = mongoose.model('Assessment', AssessmentGradeSchema)
module.exports = AssessmentGrade
