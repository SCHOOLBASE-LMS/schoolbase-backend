const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    class: {
        list: [String]
    },
    role: {
        type: String,
        default: "staff"
    }
})

const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher