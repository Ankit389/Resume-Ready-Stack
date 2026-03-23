const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      })
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')

      // Get admin from token
      req.admin = await Admin.findById(decoded.id).select('-password')

      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: 'Admin not found'
        })
      }

      next()
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      })
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message
    })
  }
}


