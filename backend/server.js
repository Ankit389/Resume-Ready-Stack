const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Data (In production, this would come from a database)
const services = [
  { id: 1, name: "Resume Review", price: 199, description: "Professional resume review with ATS optimization tips" },
  { id: 2, name: "LinkedIn Optimization", price: 299, description: "Complete LinkedIn profile optimization" },
  { id: 3, name: "Portfolio Website", price: 999, description: "Personal portfolio website development" },
  { id: 4, name: "Cover Letter Writing", price: 149, description: "Professional cover letter writing" },
  { id: 5, name: "Interview Preparation", price: 499, description: "Mock interviews and preparation coaching" }
];

const plans = [
  {
    id: 1,
    name: "Resume Audit",
    price: 0,
    type: "free",
    features: ["Free Resume Review", "ATS Score Check", "Keyword Analysis", "Format Check"],
    description: "Get your resume reviewed for free"
  },
  {
    id: 2,
    name: "ATS Optimization",
    price: 1999,
    type: "core",
    popular: true,
    features: ["ATS Resume", "Cover Letter", "Keyword Optimization", "Format Fix"],
    description: "Professional ATS-optimized resume"
  },
  {
    id: 3,
    name: "Profile Package",
    price: 2999,
    type: "premium",
    features: ["ATS Resume", "LinkedIn Profile", "Cover Letter", "Portfolio Setup"],
    description: "Complete career profile package"
  },
  {
    id: 4,
    name: "Complete Career",
    price: 4999,
    type: "ultimate",
    best: true,
    features: ["ATS Resume", "LinkedIn Profile", "Portfolio Website", "Cover Letter", "Interview Prep", "Job Support"],
    description: "Ultimate career transformation package"
  }
];

// Store contact messages (In production, use a database)
let contactMessages = [];

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Resume Ready Stack API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// GET /api/services - Get all services
app.get('/api/services', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Services retrieved successfully',
      data: services,
      count: services.length
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to fetch services'
    });
  }
});

// GET /api/services/:id - Get single service
app.get('/api/services/:id', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const service = services.find(s => s.id === serviceId);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
        error: `Service with ID ${serviceId} does not exist`
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Service retrieved successfully',
      data: service
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to fetch service'
    });
  }
});

// POST /api/contact - Handle contact form submissions
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message, phone, service } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'Name, email, and message are required'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
        error: 'Please provide a valid email address'
      });
    }
    
    // Create contact message object
    const contactMessage = {
      id: contactMessages.length + 1,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      phone: phone ? phone.trim() : null,
      service: service ? service.trim() : null,
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    // Store message (In production, save to database)
    contactMessages.push(contactMessage);
    
    // Log the message (In production, send email/notification)
    console.log('New contact message:', contactMessage);
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: contactMessage.id,
        name: contactMessage.name,
        timestamp: contactMessage.timestamp
      }
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to process contact form'
    });
  }
});

// GET /api/contact - Get all contact messages (Admin endpoint)
app.get('/api/contact', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Contact messages retrieved successfully',
      data: contactMessages,
      count: contactMessages.length
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to fetch contact messages'
    });
  }
});

// GET /api/plans - Get all pricing plans
app.get('/api/plans', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Plans retrieved successfully',
      data: plans,
      count: plans.length
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to fetch plans'
    });
  }
});

// GET /api/plans/:id - Get single plan
app.get('/api/plans/:id', (req, res) => {
  try {
    const planId = parseInt(req.params.id);
    const plan = plans.find(p => p.id === planId);
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
        error: `Plan with ID ${planId} does not exist`
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Plan retrieved successfully',
      data: plan
    });
  } catch (error) {
    console.error('Error fetching plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to fetch plan'
    });
  }
});

// POST /api/payments/webhook - Razorpay webhook handler
app.post('/api/payments/webhook', (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    // Verify webhook signature (In production)
    // const signature = req.headers['x-razorpay-signature'];
    // const expectedSignature = crypto.createHmac('sha256', webhookSecret)
    //   .update(JSON.stringify(req.body))
    //   .digest('hex');
    
    console.log('Payment webhook received:', req.body);
    
    // Process payment event
    const event = req.body;
    
    switch (event.event) {
      case 'payment.captured':
        console.log('Payment captured:', event.payload.payment.entity);
        // Update database, send confirmation email, etc.
        break;
      case 'payment.failed':
        console.log('Payment failed:', event.payload.payment.entity);
        // Handle failed payment
        break;
      default:
        console.log('Unknown webhook event:', event.event);
    }
    
    res.status(200).json({
      success: true,
      message: 'Webhook processed successfully'
    });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to process webhook'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Resume Ready Stack API Server running on port ${PORT}`);
  console.log(`📡 Server URL: http://localhost:${PORT}`);
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Services API: http://localhost:${PORT}/api/services`);
  console.log(`💰 Plans API: http://localhost:${PORT}/api/plans`);
  console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
  console.log('🎯 Server started successfully!');
});

module.exports = app;
