const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: (data, callback) => {
    bcrypt.hash(data.password, 10, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err.message); // Log the error
        return callback(err); // Return the error through the callback
      }
      db.query(
        'INSERT INTO users (name, email, username, password, role) VALUES (?, ?, ?, ?, ?)',
        [data.name, data.email, data.username, hash, data.role],
        callback
      );
    });
  },

  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  // Method to find a user by username
  findByUsername: (username, callback) => {
    db.query('SELECT * FROM users WHERE name = ?', [username], (err, results) => {
      if (err) {
        console.error('Error finding user by username:', err); // Log error
        return callback(err);
      }
      callback(null, results[0]); // Return the first user found
    });
  },

  // Method to find a user by their ID
  findById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Database query error:', err); // Log any database query errors
        return callback(err);
      }
      if (results.length === 0) {
        console.log(`No user found with id: ${id}`); // Log if no user found
        return callback(null, null); // No user found
      }
      callback(null, results[0]); // Return the first user found
    });
  },

  // Method to update a user
  update: (userId, data, callback) => {
    const { username, password } = data;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err.message);
        return callback(err);
      }
      db.query(
        'UPDATE users SET username = ?, password = ? WHERE id = ?',
        [username, hash, userId],
        callback
      );
    });
  },

  // Method to delete a user
  delete: (userId, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [userId], callback);
  }
};

module.exports = User;
