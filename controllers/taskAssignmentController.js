const TaskAssignment = require('../models/taskAssignmentModel');
const Task = require('../models/taskModel');

exports.assignTask = (req, res) => {
  const { task_id, worker_id } = req.body;

  Task.getById(task_id, (err, task) => {
    if (err || !task) return res.status(404).json({ message: 'Task not found' });

    TaskAssignment.assign(task_id, worker_id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error assigning task' });
      res.status(201).json({ message: 'Task assigned successfully' });
    });
  });
};

exports.getAssignmentsByWorker = (req, res) => {
  const worker_id = req.user.id; // Assuming worker is authenticated

  TaskAssignment.getByWorkerId(worker_id, (err, assignments) => {
    if (err) return res.status(500).json({ message: 'Error fetching assignments' });
    res.json(assignments);
  });
};

exports.updateAssignmentStatus = (req, res) => {
  const { task_id, worker_id, status } = req.body;

  TaskAssignment.updateStatus(task_id, worker_id, status, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating assignment status' });
    res.json({ message: 'Assignment status updated successfully' });
  });
};
