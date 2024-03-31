const mongoose = require('mongoose')

const ClassScheduleSchema = new mongoose.Schema({
  subject: {
    type:String,
    required:true
  },
  className: {
    type: String,
    enum: ['JSS1','JSS2','JSS3','SS1', 'SS2', 'SS3'],
    required: true
  },
  
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
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
  color: {
    type: String,
    enum: ['green', 'yellow', 'red', 'blue', 'black'],
    required: true
  },
  // teacher: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Teacher',
  //   required: true
  // }
})

module.exports = mongoose.model('ClassSchedule', ClassScheduleSchema)
