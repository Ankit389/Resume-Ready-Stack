const mongoose = require('mongoose')

const ServiceRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: [
      'ats-resume',
      'cover-letter',
      'linkedin-optimization',
      'resume-review',
      'job-portal-optimization',
      'website-making'
    ]
  },
  serviceName: {
    type: String,
    required: true
  },
  packageType: {
    type: String,
    // e.g., 'fresher', 'experienced', 'basic', 'advanced', 'individual', 'bundle'
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  jobDescription: {
    type: String,
    trim: true
  },
  uploadedFiles: [{
    type: String // URLs from file upload
  }],
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
})

ServiceRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema)


