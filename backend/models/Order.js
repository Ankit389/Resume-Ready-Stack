const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestEmail: { type: String },
  planName: { type: String, required: true },
  planId: { type: Number },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  paymentMethod: { type: String, default: 'razorpay' },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  customerName: { type: String },
  customerEmail: { type: String },
  customerPhone: { type: String },
  notes: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
