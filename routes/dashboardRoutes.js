// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Admin Dashboard
router.get('/admin-dashboard', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.render('adminDashboard');
});

// Worker Dashboard
router.get('/worker-dashboard', authMiddleware, roleMiddleware('worker'), (req, res) => {
  res.render('workerDashboard');
});

// Business Dashboard
router.get('/business-dashboard', authMiddleware, roleMiddleware('business'), (req, res) => {
  res.render('businessDashboard');
});

module.exports = router;
