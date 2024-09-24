const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api/notifications', notificationRoutes);


// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/payments', require('./routes/paymentRoutes'));
// app.use('/notifications', require('./routes/notificationRoutes'));
app.use('/assignments', require('./routes/taskAssignmentRoutes'));



const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
