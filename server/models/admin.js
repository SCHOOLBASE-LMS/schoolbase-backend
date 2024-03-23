const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessLevel: {
        type: String,
        enum: ["super", "admin"]
    },
    role: {
        type: String,
        default: "staff"
    }
})

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;