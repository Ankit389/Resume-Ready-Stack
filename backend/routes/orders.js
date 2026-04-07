const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const { planName, planId, amount, customerName, customerEmail, customerPhone, notes } = req.body;
    const order = await Order.create({
      user: req.user?._id || null,
      planName, planId, amount,
      customerName, customerEmail, customerPhone, notes,
      status: 'pending'
    });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
});

// GET /api/orders/my - Get current user's orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

module.exports = router;
