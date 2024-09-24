// controllers/workerController.js
const Task = require('../models/taskModel');

exports.getAssignedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assigned_to: req.user.id });
    res.render('workerTasks', { tasks });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
