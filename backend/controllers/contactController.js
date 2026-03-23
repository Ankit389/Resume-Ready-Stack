const Contact = require('../models/Contact')

// Submit Contact Form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, message, serviceInterest } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      })
    }

    // Create contact
    const contact = new Contact({
      name,
      email,
      phone: phone || '',
      message,
      serviceInterest: serviceInterest || ''
    })

    await contact.save()

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email
      }
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    })
  }
}

// Get All Contacts (Admin only)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v')

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    })
  }
}


