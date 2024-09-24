const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

// Middleware to check if user is authenticated
const authMiddleware = require('../middlewares/authMiddleware');

// Routes
router.post('/', authMiddleware, createTask);          // Create a task
router.get('/', getAllTasks);                          // Get all tasks
router.get('/:id', getTaskById);                       // Get a specific task
router.put('/:id', authMiddleware, updateTask);        // Update a task
router.delete('/:id', authMiddleware, deleteTask);     // Delete a task

module.exports = router;
