const ServiceRequest = require('../models/ServiceRequest')

// Create Service Request
exports.createServiceRequest = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      serviceType,
      serviceName,
      packageType,
      amount,
      jobDescription,
      uploadedFiles
    } = req.body

    // Validation
    if (!name || !email || !serviceType || !serviceName || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, service type, service name, and amount are required'
      })
    }

    // Create service request
    const serviceRequest = new ServiceRequest({
      name,
      email,
      phone: phone || '',
      serviceType,
      serviceName,
      packageType: packageType || '',
      amount,
      jobDescription: jobDescription || '',
      uploadedFiles: uploadedFiles || [],
      status: 'pending',
      paymentStatus: 'pending'
    })

    await serviceRequest.save()

    res.status(201).json({
      success: true,
      message: 'Service request created successfully',
      data: {
        id: serviceRequest._id,
        serviceName: serviceRequest.serviceName,
        amount: serviceRequest.amount,
        status: serviceRequest.status
      }
    })
  } catch (error) {
    console.error('Service request error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating service request',
      error: error.message
    })
  }
}

// Get All Service Requests (Admin)
exports.getAllServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find()
      .sort({ createdAt: -1 })
      .select('-__v')

    res.json({
      success: true,
      count: requests.length,
      data: requests
    })
  } catch (error) {
    console.error('Get service requests error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching service requests',
      error: error.message
    })
  }
}

// Get Single Service Request
exports.getServiceRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      })
    }

    res.json({
      success: true,
      data: request
    })
  } catch (error) {
    console.error('Get service request error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching service request',
      error: error.message
    })
  }
}

// Update Service Request Status (Admin)
exports.updateServiceRequest = async (req, res) => {
  try {
    const { status, notes } = req.body

    const request = await ServiceRequest.findById(req.params.id)

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      })
    }

    if (status) {
      request.status = status
      if (status === 'completed') {
        request.completedAt = new Date()
      }
    }

    if (notes) {
      request.notes = notes
    }

    await request.save()

    res.json({
      success: true,
      message: 'Service request updated successfully',
      data: request
    })
  } catch (error) {
    console.error('Update service request error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating service request',
      error: error.message
    })
  }
}


