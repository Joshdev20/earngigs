const Task = require('../models/taskModel');

exports.createTask = (req, res) => {
  const { title, description, category, budget } = req.body;
  const created_by = req.user.id; // Assuming the user is authenticated

  // Check if all required fields are provided
  if (!title || !description || !category || !budget) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  Task.create({ title, description, category, budget, created_by }, (err, result) => {
    if (err) {
      console.error('Error creating task:', err);
      return res.status(500).json({ message: 'Error creating task' });
    }
    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  });
};

exports.getAllTasks = (req, res) => {
  Task.getAll((err, tasks) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).json({ message: 'Error fetching tasks' });
    }
    res.json(tasks);
  });
};

exports.getTaskById = (req, res) => {
  const { id } = req.params;
  
  Task.getById(id, (err, task) => {
    if (err) {
      console.error('Error fetching task:', err);
      return res.status(500).json({ message: 'Error fetching task' });
    }
    if (!task.length) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, category, budget } = req.body;

  // Check if all required fields are provided
  if (!title && !description && !category && !budget) {
    return res.status(400).json({ message: 'At least one field must be provided for update' });
  }

  Task.update(id, { title, description, category, budget }, (err, result) => {
    if (err) {
      console.error('Error updating task:', err);
      return res.status(500).json({ message: 'Error updating task' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task updated successfully' });
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;

  Task.delete(id, (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({ message: 'Error deleting task' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
};
