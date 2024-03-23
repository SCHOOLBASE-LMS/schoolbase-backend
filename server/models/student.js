const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    parentName: {
      type: String,
    },
    guardianName: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    class: {
        type: String,
    },
    extracurricular: {
        list: [String]
    },
    interests: {
        list: [String]
    },
    skills: {
        list: [String]
    },
    previousSchools: {
        list: [String]
    },
    additionalDocuments: {
        list: [String]
    },
    signature: {
        list: [String]
    },
   admissionStatus: {
        type: Boolean,
        default: false
   },
   dateAdmitted: {
        type: Date,
   }, role: {
    type: String,
    default: 'student'
   }
  },

  { timestamps: true }
);

const Student = mongoose.model("students", StudentSchema);

module.exports = Student;
