const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number }, // Student's age
    grade: { type: String }, // Student's academic grade
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }, // Assigned mentor
});

module.exports = mongoose.model('Student', studentSchema);