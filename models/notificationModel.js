const db = require('../config/db');

const Notification = {
  create: (user_id, message, callback) => {
    db.query(
      'INSERT INTO notifications (user_id, message, status) VALUES (?, ?, ?)',
      [user_id, message, 'unread'],
      callback
    );
  },
  getByUserId: (user_id, callback) => {
    db.query('SELECT * FROM notifications WHERE user_id = ?', [user_id], callback);
  },
  markAsRead: (id, callback) => {
    db.query('UPDATE notifications SET status = ? WHERE id = ?', ['read', id], callback);
  },
};

module.exports = Notification;
