const db = require('../config/db');

const Task = {
  create: (data, callback) => {
    db.query(
      'INSERT INTO tasks (title, description, category, budget, created_by) VALUES (?, ?, ?, ?, ?)',
      [data.title, data.description, data.category, data.budget, data.created_by],
      callback
    );
  },
  getAll: (callback) => {
    db.query('SELECT * FROM tasks WHERE status = "open"', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM tasks WHERE id = ?', [id], callback);
  },
  update: (id, data, callback) => {
    db.query(
      'UPDATE tasks SET title = ?, description = ?, category = ?, budget = ? WHERE id = ?',
      [data.title, data.description, data.category, data.budget, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
  },
};

module.exports = Task;
