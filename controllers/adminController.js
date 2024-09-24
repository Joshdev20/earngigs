// controllers/adminController.js
const User = require('../models/userModel');

// Admin manages users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('adminUsers', { users });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
