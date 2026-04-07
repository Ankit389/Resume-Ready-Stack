const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static data (used when DB is not connected)
const services = [
  { id: 1, name: 'ATS Resume Writing', price: 1999, category: 'resume', icon: '📄', description: 'Professional ATS-optimized resume tailored to your target role.', features: ['ATS Keyword Optimization', 'Professional Formatting', 'Tailored to Job Role', 'Unlimited Revisions'], duration: '3-5 days', popular: false },
  { id: 2, name: 'LinkedIn Profile Optimization', price: 1499, category: 'linkedin', icon: '💼', description: 'Boost your LinkedIn presence and get noticed by recruiters.', features: ['Keyword-Rich Headline', 'Compelling Summary', 'Skills & Endorsements', 'Profile Photo Tips'], duration: '2-3 days', popular: true },
  { id: 3, name: 'Cover Letter Writing', price: 799, category: 'cover', icon: '✉️', description: 'Compelling cover letters that get you through the door.', features: ['Tailored to Each Job', 'ATS-Friendly Format', 'Storytelling Approach', 'Highlight Key Achievements'], duration: '1-2 days', popular: false },
  { id: 4, name: 'Complete Career Package', price: 3999, category: 'package', icon: '🚀', description: 'Everything you need to transform your career profile.', features: ['ATS Resume', 'LinkedIn Optimization', 'Cover Letter', 'Interview Prep Guide', 'Job Application Strategy'], duration: '5-7 days', popular: true },
  { id: 5, name: 'Interview Preparation', price: 2499, category: 'interview', icon: '🎯', description: 'Mock interviews and coaching to land your dream job.', features: ['Mock Interview Sessions', 'Common Q&A Practice', 'Body Language Tips', 'Salary Negotiation'], duration: '4-6 days', popular: false },
  { id: 6, name: 'Job Search Strategy', price: 1299, category: 'strategy', icon: '🗺️', description: 'Strategic job search plan tailored to your goals.', features: ['Target Company Research', 'Application Tracking', 'Networking Strategy', 'Personal Branding'], duration: '2-3 days', popular: false },
];

const plans = [
  { id: 1, name: 'Resume Audit', price: 0, type: 'free', badge: 'Free', description: 'Get started with a professional review', features: ['Free Resume Review', 'ATS Score Check', 'Keyword Analysis', 'Basic Format Check'], cta: 'Get Free Audit' },
  { id: 2, name: 'ATS Optimization', price: 1999, type: 'core', badge: 'Popular', description: 'Professional ATS-optimized resume', features: ['ATS Resume Rewrite', 'Cover Letter', 'Keyword Optimization', 'Format Fix', '2 Revisions'], popular: true, cta: 'Get Started' },
  { id: 3, name: 'Profile Package', price: 2999, type: 'premium', badge: 'Value', description: 'Complete career profile package', features: ['ATS Resume', 'LinkedIn Profile', 'Cover Letter', 'Portfolio Setup', '3 Revisions'], cta: 'Get Package' },
  { id: 4, name: 'Complete Career', price: 4999, type: 'ultimate', badge: 'Best Value', description: 'Ultimate career transformation', features: ['ATS Resume', 'LinkedIn Profile', 'Portfolio Website', 'Cover Letter', 'Interview Prep', 'Job Support', 'Unlimited Revisions'], best: true, cta: 'Transform Career' },
];

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/user', require('./routes/user'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Purnima Career Studio API', timestamp: new Date().toISOString() });
});

// Services
app.get('/api/services', (req, res) => {
  res.json({ success: true, data: services, count: services.length });
});

app.get('/api/services/:id', (req, res) => {
  const service = services.find(s => s.id === parseInt(req.params.id));
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, data: service });
});

// Plans
app.get('/api/plans', (req, res) => {
  res.json({ success: true, data: plans, count: plans.length });
});

app.get('/api/plans/:id', (req, res) => {
  const plan = plans.find(p => p.id === parseInt(req.params.id));
  if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
  res.json({ success: true, data: plan });
});

// Contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, phone, service } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Try saving to MongoDB if connected
    try {
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState === 1) {
        const Contact = require('./models/Contact');
        await Contact.create({ name, email, phone, message, serviceInterest: service });
      }
    } catch (dbErr) {
      console.log('DB not available, logging contact locally');
    }

    console.log('New contact:', { name, email, message: message.substring(0, 50) });
    res.status(201).json({ success: true, message: 'Message received! We will contact you within 24 hours.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Cannot ${req.method} ${req.originalUrl}` });
});

app.listen(PORT, 'localhost', () => {
  console.log(`🚀 Purnima Career Studio API running on port ${PORT}`);
  console.log(`📡 Health: http://localhost:${PORT}/api/health`);
});

module.exports = app;
