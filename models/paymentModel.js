const db = require('../config/db');

const Payment = {
  create: (task_id, worker_id, amount, callback) => {
    db.query(
      'INSERT INTO payments (task_id, worker_id, amount, status) VALUES (?, ?, ?, ?)',
      [task_id, worker_id, amount, 'pending'],
      callback
    );
  },
  getByWorkerId: (worker_id, callback) => {
    db.query('SELECT * FROM payments WHERE worker_id = ?', [worker_id], callback);
  },
  updateStatus: (id, status, callback) => {
    db.query('UPDATE payments SET status = ? WHERE id = ?', [status, id], callback);
  },
};

module.exports = Payment;
