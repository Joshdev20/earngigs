const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Route accessible only by 'business' role
router.post('/create-task', authMiddleware, roleMiddleware('business'), (req, res) => {
  // Business-specific task creation logic
  res.send('Task created successfully');
});

// Route accessible only by 'worker' role
router.get('/browse-tasks', authMiddleware, roleMiddleware('worker'), (req, res) => {
  // Worker-specific task browsing logic
  res.send('Here are the tasks you can work on');
});


// Route to handle registration for users (workers and businesses)
router.post('/register', authController.register);

// Route to handle user login
router.post('/login', authController.login);

// Route to handle user logout
router.post('/logout', authMiddleware, authController.logout);

// Route to check authentication status
router.get('/status', authMiddleware, authController.checkAuthStatus);

module.exports = router;
