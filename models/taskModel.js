const db = require('../config/db');

const Task = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO tasks (title, description, category, budget, created_by) VALUES (?, ?, ?, ?, ?)',
        [data.title, data.description, data.category, data.budget, data.created_by],
        (err, result) => {
          if (err) {
            console.error('Error inserting task:', err);
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks WHERE status = "open"', (err, results) => {
        if (err) {
          console.error('Error fetching tasks:', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) {
          console.error('Error fetching task:', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE tasks SET title = ?, description = ?, category = ?, budget = ? WHERE id = ?',
        [data.title, data.description, data.category, data.budget, id],
        (err, result) => {
          if (err) {
            console.error('Error updating task:', err);
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error deleting task:', err);
          return reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = Task;
