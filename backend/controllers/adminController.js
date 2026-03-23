const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: '7d'
  })
}

// Admin Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    // Find admin
    const admin = await Admin.findOne({ email: email.toLowerCase() })

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Generate token
    const token = generateToken(admin._id)

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      }
    })
  } catch (error) {
    console.error('Admin login error:', error)
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    })
  }
}

// Get Admin Profile
exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      })
    }

    res.json({
      success: true,
      data: admin
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    })
  }
}

// Initialize Admin (First time setup)
exports.initializeAdmin = async (req, res) => {
  try {
    // Check if admin already exists
    const adminExists = await Admin.findOne()

    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      })
    }

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      })
    }

    const admin = new Admin({
      name,
      email: email.toLowerCase(),
      password,
      role: 'superadmin'
    })

    await admin.save()

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    })
  } catch (error) {
    console.error('Initialize admin error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating admin',
      error: error.message
    })
  }
}


