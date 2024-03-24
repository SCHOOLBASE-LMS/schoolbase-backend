const mongoose = require('mongoose')

const AttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  isPresent: {
    type: Boolean,
    required: true,
    default: false
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Teacher'
  },
  markedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  reasonForAbseence: { type: String }
}, { timestamps: true })

const Attendance = mongoose.model('Student', AttendanceSchema)
module.exports = Attendance
