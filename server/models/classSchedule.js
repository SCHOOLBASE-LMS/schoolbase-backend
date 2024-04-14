const mongoose = require('mongoose')

const ClassScheduleSchema = new mongoose.Schema({
  class: {
    type: String,
    enum: ['SS1', 'SS2', 'SS3'],
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  start: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  day: {
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  }
})

const ClassSchedule = mongoose.model('ClassSchedule', ClassScheduleSchema)
module.exports = ClassSchedule
