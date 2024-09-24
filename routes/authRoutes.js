const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to handle registration for users (workers and businesses)
router.post('/register', authController.register);

// Route to handle user login
router.post('/login', authController.login);

// Route to handle user logout
router.post('/logout', authMiddleware, authController.logout);

// Route to check authentication status
router.get('/status', authMiddleware, authController.checkAuthStatus);

module.exports = router;
