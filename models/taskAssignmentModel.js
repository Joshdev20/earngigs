const db = require('../config/db');

const TaskAssignment = {
  assign: (task_id, worker_id, callback) => {
    db.query(
      'INSERT INTO task_assignments (task_id, worker_id, status) VALUES (?, ?, ?)',
      [task_id, worker_id, 'assigned'],
      callback
    );
  },
  getByWorkerId: (worker_id, callback) => {
    db.query('SELECT * FROM task_assignments WHERE worker_id = ?', [worker_id], callback);
  },
  updateStatus: (task_id, worker_id, status, callback) => {
    db.query(
      'UPDATE task_assignments SET status = ? WHERE task_id = ? AND worker_id = ?',
      [status, task_id, worker_id],
      callback
    );
  },
};

module.exports = TaskAssignment;
