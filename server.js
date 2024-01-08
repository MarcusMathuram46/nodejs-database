const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mentorsRouter = require('./controllers/mentorController');
const studentsRouter = require('./controllers/studentController');
const assignmentsRouter = require('./controllers/assignmentController');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Define your API endpoints here
app.use('/assignments', require('./controllers/assignmentController'));

// Define your API endpoints here
// Change this line in server.js
app.use('/mentors', mentorsRouter);
app.use('/students', studentsRouter);
app.use('/assignments', assignmentsRouter);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;