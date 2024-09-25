const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const db = require('./config/db'); // Database configuration
const cookieParser = require('cookie-parser'); // Import cookie-parser
const bodyParser = require('body-parser'); // To parse request bodies

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const taskAssignmentRoutes = require('./routes/taskAssignmentRoutes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/assignments', taskAssignmentRoutes);

// Server Listening
const PORT = process.env.PORT || 5008;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
