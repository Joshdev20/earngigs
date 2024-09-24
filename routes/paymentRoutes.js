const express = require('express');
const router = express.Router();
const { createPayment, getPaymentsByWorker, updatePaymentStatus } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes
router.post('/', authMiddleware, createPayment);           // Create a payment
router.get('/worker', authMiddleware, getPaymentsByWorker); // Get payments for a worker
router.put('/status', authMiddleware, updatePaymentStatus); // Update payment status

module.exports = router;
