const express = require('express')
const router = express.Router()
const { submitContact, getAllContacts } = require('../controllers/contactController')
const { protect } = require('../middleware/auth')

// Public route
router.post('/', submitContact)

// Admin routes
router.get('/all', protect, getAllContacts)

module.exports = router


