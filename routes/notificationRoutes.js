const express = require('express');
const router = express.Router();
const { createNotification, getNotificationsByUser, markNotificationAsRead } = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes
router.post('/', authMiddleware, createNotification);       // Create notification
router.get('/', authMiddleware, getNotificationsByUser);    // Get notifications by user
router.put('/:id', authMiddleware, markNotificationAsRead); // Mark notification as read

module.exports = router;
