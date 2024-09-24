const Notification = require('../models/notificationModel');

exports.createNotification = (req, res) => {
  const { user_id, message } = req.body;

  Notification.create(user_id, message, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error creating notification' });
    res.status(201).json({ message: 'Notification created' });
  });
};

exports.getNotificationsByUser = (req, res) => {
  const user_id = req.user.id;

  Notification.getByUserId(user_id, (err, notifications) => {
    if (err) return res.status(500).json({ message: 'Error fetching notifications' });
    res.json(notifications);
  });
};

exports.markNotificationAsRead = (req, res) => {
  const { id } = req.params;

  Notification.markAsRead(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error marking notification as read' });
    res.json({ message: 'Notification marked as read' });
  });
};
