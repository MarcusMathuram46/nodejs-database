const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignmentModel');
const Student = require('../models/studentModel');
const Mentor = require('../models/mentorModel');

router.post('/assignStudentToMentor', async (req, res) => {
    try {
        const { mentorId, studentId, details } = req.body;

        // Check if the student has already been assigned
        const existingAssignment = await Assignment.findOne({ student: studentId });
        if (existingAssignment) {
            return res.status(400).json({ error: 'Student is already assigned to a mentor.' });
        }

        // Create a new assignment
        const assignment = new Assignment({
            mentor: mentorId,
            student: studentId,
            details: details || '',
        });

        // Update the mentor's students array
        await Mentor.findByIdAndUpdate(mentorId, { $push: { students: studentId } });

        // Update the student's mentor field
        await Student.findByIdAndUpdate(studentId, { mentor: mentorId });

        // Save the assignment
        const savedAssignment = await assignment.save();

        res.status(201).json(savedAssignment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Assign or Change Mentor for a particular Student
router.put('/assignMentorToStudent/:studentId', async (req, res) => {
    try {
        const { mentorId } = req.body;
        const studentId = req.params.studentId;

        // Update the student's mentor field
        const updatedStudent = await Student.findByIdAndUpdate(studentId, { mentor: mentorId }, { new: true });

        // Update the mentor's students array
        await Mentor.findByIdAndUpdate(mentorId, { $push: { students: studentId } });

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all students for a particular mentor
router.get('/studentsForMentor/:mentorId', async (req, res) => {
    try {
        const mentorId = req.params.mentorId;

        // Get all students for the given mentor
        const students = await Student.find({ mentor: mentorId });

        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get the previous mentor for a particular student
router.get('/previousMentorForStudent/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;

        // Get the student's previous mentor
        const assignment = await Assignment.findOne({ student: studentId }).sort({ assignedAt: -1 });

        if (!assignment) {
            return res.status(404).json({ error: 'No previous mentor found for the student.' });
        }

        const previousMentorId = assignment.mentor;

        res.status(200).json({ previousMentorId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;