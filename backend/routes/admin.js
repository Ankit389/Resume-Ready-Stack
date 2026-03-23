const express = require('express')
const router = express.Router()
const { login, getProfile, initializeAdmin } = require('../controllers/adminController')
const { protect } = require('../middleware/auth')

// Public routes
router.post('/login', login)
router.post('/initialize', initializeAdmin) // First time setup only

// Protected routes
router.get('/profile', protect, getProfile)

module.exports = router


