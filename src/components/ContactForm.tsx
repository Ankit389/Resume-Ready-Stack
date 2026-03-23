import { useState } from 'react'
import './ContactForm.css'
import { CONTACT, gmailComposeUrl, whatsappUrl } from '../config/contact'

interface FormData {
  name: string
  email: string
  phone: string
  serviceType: string
  message: string
  currentResume: File | null
  jobDescription: File | null
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  serviceType?: string
  message?: string
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
    currentResume: null,
    jobDescription: null
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const services = [
    'ATS Resume Writing',
    'Cover Letter Writing', 
    'LinkedIn Optimization',
    'Portfolio Creation',
    'Complete Package (Resume + Cover Letter + LinkedIn)',
    'Other/Consultation'
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      const file = files[0]
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload PDF, Word, or text file')
        return
      }
      
      setFormData(prev => ({ ...prev, [name]: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Create email content
      const subject = `New Service Request: ${formData.serviceType} - ${formData.name}`
      
      let body = `📋 New Service Request from Resume Ready Stack Website\n\n`
      body += `👤 Name: ${formData.name}\n`
      body += `📧 Email: ${formData.email}\n`
      body += `📱 Phone: ${formData.phone}\n`
      body += `🎯 Service Type: ${formData.serviceType}\n\n`
      body += `📝 Message:\n${formData.message}\n\n`
      
      if (formData.currentResume) {
        body += `📄 Current Resume: ${formData.currentResume.name}\n`
      }
      
      if (formData.jobDescription) {
        body += `📋 Job Description: ${formData.jobDescription.name}\n`
      }
      
      body += `\n---\nSubmitted on: ${new Date().toLocaleString()}`

      // Open Gmail compose with pre-filled content
      const gmailUrl = gmailComposeUrl({
        to: CONTACT.email,
        subject,
        body
      })

      // Open in new tab
      window.open(gmailUrl, '_blank')
      
      // Also send WhatsApp notification
      const whatsappMsg = `New service request from ${formData.name} (${formData.email}) for ${formData.serviceType}. Check email for details.`
      window.open(whatsappUrl(CONTACT.whatsappPhone, whatsappMsg), '_blank')

      setSubmitStatus('success')
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          message: '',
          currentResume: null,
          jobDescription: null
        })
        setSubmitStatus('idle')
      }, 3000)

    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-form" className="contact-form-section">
      <div className="container">
        <div className="contact-form-header">
          <h2 className="contact-form-title">Get Your Career Started</h2>
          <p className="contact-form-subtitle">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+91 98765 43210"
                  disabled={isSubmitting}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="serviceType" className="form-label">
                  Service Type <span className="required">*</span>
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className={`form-select ${errors.serviceType ? 'error' : ''}`}
                  disabled={isSubmitting}
                >
                  <option value="">Select a service...</option>
                  {services.map(service => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.serviceType && <span className="error-message">{errors.serviceType}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Tell us about your career goals <span className="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`form-textarea ${errors.message ? 'error' : ''}`}
                placeholder="Describe your current situation, target role, industry, and what you'd like to achieve..."
                rows={4}
                disabled={isSubmitting}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="currentResume" className="form-label">
                  Current Resume (Optional)
                </label>
                <input
                  type="file"
                  id="currentResume"
                  name="currentResume"
                  onChange={handleFileChange}
                  className="form-file"
                  accept=".pdf,.doc,.docx,.txt"
                  disabled={isSubmitting}
                />
                <small className="form-help">
                  PDF, Word, or text file (max 5MB)
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="jobDescription" className="form-label">
                  Job Description (Optional)
                </label>
                <input
                  type="file"
                  id="jobDescription"
                  name="jobDescription"
                  onChange={handleFileChange}
                  className="form-file"
                  accept=".pdf,.doc,.docx,.txt"
                  disabled={isSubmitting}
                />
                <small className="form-help">
                  Target job description (max 5MB)
                </small>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send Request'
                )}
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className="form-success">
                ✅ Thank you! Your request has been sent. We'll contact you within 24 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-error">
                ❌ Something went wrong. Please try again or contact us directly.
              </div>
            )}
          </form>

          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-info-icon">📧</div>
              <div className="contact-info-content">
                <h4>Email Us</h4>
                <p>{CONTACT.email}</p>
                <small>We respond within 24 hours</small>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">💬</div>
              <div className="contact-info-content">
                <h4>WhatsApp</h4>
                <p>Instant support available</p>
                <small>Quick responses for urgent queries</small>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">⭐</div>
              <div className="contact-info-content">
                <h4>Why Choose Us?</h4>
                <p>50+ successful resumes • 95% interview rate • ATS-optimized</p>
                <small>Professional service guaranteed</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
