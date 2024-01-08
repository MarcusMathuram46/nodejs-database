const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');
const logger = require('../utils/logger');

// Create a new student
router.post('/', async (req, res) => {
    try {
        const { name, age, grade } = req.body;
        const student = new Student({ name, age, grade });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        logger.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;