const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentorModel');
const logger = require('../utils/logger');

// Create a new mentor
router.post('/', async (req, res) => {
    try {
        const { name, email, specialization } = req.body; // Assuming these are the mentor's properties

        // Create a new mentor using the Mentor model
        const newMentor = new Mentor({
            name,
            email,
            specialization,
            // Other mentor properties...
        });

        // Save the new mentor to the database
        const savedMentor = await newMentor.save();

        res.status(201).json({ msg: 'Mentor created successfully', mentor: savedMentor });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
