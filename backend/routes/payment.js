const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Order = require("../models/Order");
const { protect } = require("../middleware/auth");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/order", async (req, res) => {
  try {
    const {
      planName,
      planId,
      amount,
      customerName,
      customerEmail,
      customerPhone,
      notes,
    } = req.body;

    if (!planName || !amount || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: "planName, amount and customerEmail are required",
      });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Razorpay configuration is missing on the server",
      });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `order_rcpt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        planName,
        planId: planId ?? "",
        customerEmail,
        customerPhone: customerPhone || "",
        ...notes,
      },
    });

    const order = await Order.create({
      user: req.user?._id || null,
      planName,
      planId,
      amount,
      currency: "INR",
      status: "pending",
      paymentMethod: "razorpay",
      razorpayOrderId: razorpayOrder.id,
      customerName: customerName || "",
      customerEmail,
      customerPhone: customerPhone || "",
      notes: notes || {},
    });

    res.status(201).json({
      success: true,
      data: {
        orderId: order._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error("Create payment order error:", error);
    res
      .status(500)
      .json({ success: false, message: "Unable to create payment order" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const {
      orderId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      customerName,
      customerEmail,
      customerPhone,
    } = req.body;

    if (
      !orderId ||
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification fields are missing",
      });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Razorpay secret is not configured",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Payment signature invalid" });
    }

    const order =
      (await Order.findOne({ razorpayOrderId: razorpay_order_id })) ||
      (await Order.findById(orderId));
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = "paid";
    order.razorpayPaymentId = razorpay_payment_id;
    order.customerName = customerName || order.customerName;
    order.customerEmail = customerEmail || order.customerEmail;
    order.customerPhone = customerPhone || order.customerPhone;
    await order.save();

    res.json({ success: true, data: order });
  } catch (error) {
    console.error("Verify payment error:", error);
    res
      .status(500)
      .json({ success: false, message: "Unable to verify payment" });
  }
});

router.post("/webhook", async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Webhook signature or secret missing",
        });
    }

    const rawBody = req.body;
    const bodyString =
      rawBody instanceof Buffer
        ? rawBody.toString("utf8")
        : JSON.stringify(rawBody);
    const payload = JSON.parse(bodyString);
    const generatedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(bodyString)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid webhook signature" });
    }

    const event = payload?.event;
    const paymentEntity = payload?.payload?.payment?.entity;
    const razorpayOrderId = paymentEntity?.order_id;
    const razorpayPaymentId = paymentEntity?.id;

    if (
      event !== "payment.captured" &&
      event !== "order.paid" &&
      event !== "payment.authorized"
    ) {
      return res.status(200).json({ success: true, message: "Event ignored" });
    }

    const order = await Order.findOne({ razorpayOrderId });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = "paid";
    order.razorpayPaymentId = razorpayPaymentId || order.razorpayPaymentId;
    await order.save();

    return res
      .status(200)
      .json({ success: true, message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Unable to process webhook" });
  }
});

module.exports = router;
