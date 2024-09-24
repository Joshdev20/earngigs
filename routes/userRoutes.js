const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to handle registration for both workers and businesses
router.post('/register', userController.registerUser);

// Route to handle login for workers and businesses
router.post('/login', userController.loginUser);

// Route to get user profile (requires authentication)
router.get('/profile', authMiddleware, userController.getUserProfile);

// Route to update user profile (requires authentication)
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Logout route
router.post('/logout', userController.logoutUser);

module.exports = router;
