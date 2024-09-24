const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: (data, callback) => {
    bcrypt.hash(data.password, 10, (err, hash) => {
      if (err) throw err;
      db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [data.name, data.email, hash, data.role],
        callback
      );
    });
  },
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },
};

module.exports = User;
