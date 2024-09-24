const express = require('express');
const router = express.Router();
const { assignTask, getAssignmentsByWorker, updateAssignmentStatus } = require('../controllers/taskAssignmentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes
router.post('/assign', authMiddleware, assignTask);                  // Assign a task
router.get('/worker', authMiddleware, getAssignmentsByWorker);       // Get tasks assigned to a worker
router.put('/status', authMiddleware, updateAssignmentStatus);       // Update task assignment status

module.exports = router;
