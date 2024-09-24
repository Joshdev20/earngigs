const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Registration function
exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if the user already exists
  User.findByEmail(email, async (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Server error');
    }
    if (result.length > 0) {
      return res.status(400).send('User already exists');
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword, role };

    User.create(newUser, (err) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).send('Server error');
      }
      res.status(201).send('User registered successfully'); // Use 201 status for successful creation
    });
  });
};

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Find user
  User.findByEmail(email, (err, result) => {
    if (err) return res.status(500).send('Server error');
    if (result.length === 0) return res.status(400).send('Invalid credentials');

    const user = result[0];

    // Check password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Server error');
      if (!isMatch) return res.status(400).send('Invalid credentials');

      // Generate JWT
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.cookie('token', token, { httpOnly: true });
      res.status(200).send('Login successful'); // Send a success response
    });
  });
};

// Logout function
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).send('Logout successful'); // Send a success response
};

// Check authentication status
exports.checkAuthStatus = (req, res) => {
  res.status(200).send('User is authenticated'); // Send a success response
};
