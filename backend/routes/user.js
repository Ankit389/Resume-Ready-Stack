const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// GET /api/user/profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(10);
    res.json({ success: true, data: { user, orders } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
});

// PUT /api/user/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id, { name, phone }, { new: true, runValidators: true }
    ).select('-password');
    res.json({ success: true, data: user, message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

module.exports = router;
