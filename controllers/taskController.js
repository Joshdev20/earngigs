const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  const { title, description, category, budget } = req.body;
  const created_by = req.user.id; // Assuming the user is authenticated

  // Check if all required fields are provided
  if (!title || !description || !category || !budget) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await Task.create({ title, description, category, budget, created_by });
    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  } catch (err) {
    console.error('Error creating task:', err);
    return res.status(500).json({ message: 'Error creating task' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    return res.status(500).json({ message: 'Error fetching tasks' });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const task = await Task.getById(id);
    if (!task.length) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task[0]); // Assuming you want to return a single task object
  } catch (err) {
    console.error('Error fetching task:', err);
    return res.status(500).json({ message: 'Error fetching task' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, budget } = req.body;

  // Check if at least one field is provided for update
  if (!title && !description && !category && !budget) {
    return res.status(400).json({ message: 'At least one field must be provided for update' });
  }

  try {
    const result = await Task.update(id, { title, description, category, budget });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error('Error updating task:', err);
    return res.status(500).json({ message: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Task.delete(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    return res.status(500).json({ message: 'Error deleting task' });
  }
};
