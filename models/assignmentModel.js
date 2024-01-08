const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    assignedAt: { type: Date, default: Date.now },
    details: { type: String }
});

module.exports = mongoose.model('Assignment', assignmentSchema);