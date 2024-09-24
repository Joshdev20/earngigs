const Task = require('../models/taskModel');

exports.createTask = (req, res) => {
  const { title, description, category, budget } = req.body;
  const created_by = req.user.id; // Assuming the user is authenticated

  Task.create({ title, description, category, budget, created_by }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error creating task' });
    res.status(201).json({ message: 'Task created successfully' });
  });
};

exports.getAllTasks = (req, res) => {
  Task.getAll((err, tasks) => {
    if (err) return res.status(500).json({ message: 'Error fetching tasks' });
    res.json(tasks);
  });
};

exports.getTaskById = (req, res) => {
  const { id } = req.params;
  Task.getById(id, (err, task) => {
    if (err) return res.status(500).json({ message: 'Error fetching task' });
    res.json(task);
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, category, budget } = req.body;

  Task.update(id, { title, description, category, budget }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating task' });
    res.json({ message: 'Task updated successfully' });
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;

  Task.delete(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting task' });
    res.json({ message: 'Task deleted successfully' });
  });
};
