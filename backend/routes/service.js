const express = require('express')
const router = express.Router()
const {
  createServiceRequest,
  getAllServiceRequests,
  getServiceRequest,
  updateServiceRequest
} = require('../controllers/serviceController')
const { protect } = require('../middleware/auth')

// Public route
router.post('/', createServiceRequest)

// Admin routes
router.get('/all', protect, getAllServiceRequests)
router.get('/:id', protect, getServiceRequest)
router.put('/:id', protect, updateServiceRequest)

module.exports = router


