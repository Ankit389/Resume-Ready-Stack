const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-ready-stack'

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message)
    process.exit(1)
  })

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Resume Ready Stack API is running!',
    status: 'success',
    version: '1.0.0'
  })
})

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  })
})

// Import Routes
const contactRoutes = require('./routes/contact')
const serviceRoutes = require('./routes/service')
const adminRoutes = require('./routes/admin')

app.use('/api/contact', contactRoutes)
app.use('/api/service', serviceRoutes)
app.use('/api/admin', adminRoutes)

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 API: http://localhost:${PORT}`)
})


