const Payment = require('../models/paymentModel');
const Task = require('../models/taskModel');

exports.createPayment = (req, res) => {
  const { task_id, worker_id, amount } = req.body;

  Task.getById(task_id, (err, task) => {
    if (err || !task) return res.status(404).json({ message: 'Task not found' });
    
    Payment.create(task_id, worker_id, amount, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error creating payment' });
      res.status(201).json({ message: 'Payment created successfully' });
    });
  });
};

exports.getPaymentsByWorker = (req, res) => {
  const worker_id = req.user.id; // Assuming worker is authenticated
  Payment.getByWorkerId(worker_id, (err, payments) => {
    if (err) return res.status(500).json({ message: 'Error fetching payments' });
    res.json(payments);
  });
};

exports.updatePaymentStatus = (req, res) => {
  const { id, status } = req.body;

  Payment.updateStatus(id, status, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating payment status' });
    res.json({ message: 'Payment status updated successfully' });
  });
};
