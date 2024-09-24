// controllers/businessController.js
const Task = require('../models/taskModel');

exports.getBusinessTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ created_by: req.user.id });
    res.render('businessTasks', { tasks });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
