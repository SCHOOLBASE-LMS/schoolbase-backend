const mongoose = require('mongoose')

const AssessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  type: {
    type: String,
    enum: ['quiz', 'test', 'exam'],
    required: true
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  availableFrom: Date,
  availableUntil: Date,
  duration: Number, // in minutes
  totalMarks: Number,
  passingMarks: Number
},
{ timestamps: true }
)

const Assessment = mongoose.model('Assessment', AssessmentSchema)
module.exports = Assessment
