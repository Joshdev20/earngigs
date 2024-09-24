const User = require('../models/userModel'); // Adjust the path to your User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Make sure to install this package if you haven't already

const userController = {
  registerUser: (req, res) => {
    const { name, email, password, role } = req.body;
    User.findByEmail(email, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Error hashing password' });
        }
        User.create({ name, email, password: hashedPassword, role }, (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'Error creating user' });
          }
          res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
        });
      });
    });
  },

  loginUser: (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: 'Error comparing passwords' });
        }
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = createToken(user); // Generate a JWT token
        res.status(200).json({ message: 'Login successful', token, user });
      });
    });
  },

  getUserProfile: (req, res) => {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    User.findById(userId, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (!results) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(results);
    });
  },

  // You can add more methods like updateUserProfile, deleteUser, etc.
  updateUserProfile: (req, res) => {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const { name, email, role } = req.body; // Get updated data from request body
    
    User.update(userId, { name, email, role }, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'User profile updated successfully' });
    });
},

logoutUser: (req, res) => {
    // Logic to handle logout (e.g., invalidate token or session)
    res.status(200).json({ message: 'User logged out successfully' });
},

};

// Helper function to create JWT token
function createToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set your secret in environment variables
}

module.exports = userController;
