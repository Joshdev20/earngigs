const User = require('../models/userModel');
const { createToken } = require('../utils/tokenUtils'); // Assuming you have a function to create JWT tokens
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported

// User registration
const registerUser = (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate the input
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the user already exists
  User.findByUsername(username, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking user' });
    }
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create the new user
    User.create({ username, email, password, role }, (err, newUser) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Error creating user' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: newUser.insertId });
    });
  });
};

// User login
const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Validate the input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Authenticate user
  User.findByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate token
      const token = createToken(user); // Generate JWT token

      // Set the token in the cookie
      res.cookie('token', token, { httpOnly: true }); // Set cookie

      // Send a successful response
      res.status(200).json({ message: 'Login successful', user });
    });
  });
};

// Get user profile
const getUserProfile = (req, res) => {
  const userId = req.user.id; // Assuming user information is attached to req.user

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });
};

// Update user profile
const updateUserProfile = (req, res) => {
  const userId = req.user.id;
  const { username, password } = req.body;

  // Update user information
  User.update(userId, { username, password }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating user' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  });
};

// Delete user
const deleteUser = (req, res) => {
  const userId = req.user.id;

  User.delete(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting user' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  });
};

// Export functions using module.exports
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser // Make sure to add deleteUser if you are using it
};
