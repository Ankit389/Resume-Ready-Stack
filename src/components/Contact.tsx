import './Contact.css'

function Contact() {
  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number (format: country code + number without + or spaces)
    const phoneNumber = '1234567890' // Example: Replace with actual number
    const message = encodeURIComponent('Hello! I\'m interested in your resume services.')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const handleEmailClick = () => {
    const email = 'contact@purnimacareerstudio.com'
    const subject = encodeURIComponent('Inquiry about Resume Services')
    const body = encodeURIComponent('Hello,\n\nI would like to know more about your resume services.\n\nThank you!')
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Ready to Transform Your Career?</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Take the first step towards landing your dream job. Let's discuss how I can help you create a standout resume and professional profile.
          </p>
        </div>

        <div className="cta-section">
          <div className="cta-content">
            <div className="cta-header">
              <h3 className="cta-headline">Get Started Today</h3>
              <p className="cta-subtitle">Transform Your Career with Professional Resume Services</p>
            </div>
            
            <p className="cta-message">
              Whether you need <strong>Resume Writing</strong>, <strong>Cover Letters</strong>, 
              <strong> LinkedIn Optimization</strong>, or <strong>Portfolio Creation</strong>, 
              I'm here to help you succeed. Reach out now and let's make your career goals a reality.
            </p>
            
            <div className="services-mention">
              <div className="service-tag">
                <span className="tag-icon">📄</span>
                <span>Resume Writing</span>
              </div>
              <div className="service-tag">
                <span className="tag-icon">✉️</span>
                <span>Cover Letters</span>
              </div>
              <div className="service-tag">
                <span className="tag-icon">💼</span>
                <span>LinkedIn Optimization</span>
              </div>
              <div className="service-tag">
                <span className="tag-icon">🎨</span>
                <span>Portfolio Creation</span>
              </div>
            </div>

            <div className="cta-buttons">
              <button onClick={handleWhatsAppClick} className="cta-btn cta-whatsapp">
                <span className="cta-icon">💬</span>
                <span className="cta-text">Contact on WhatsApp</span>
              </button>
              <button onClick={handleEmailClick} className="cta-btn cta-email">
                <span className="cta-icon">📧</span>
                <span className="cta-text">Send an Email</span>
              </button>
            </div>

            <div className="cta-features">
              <div className="cta-feature-item">
                <span className="feature-check">✓</span>
                <span>Quick Response (Within 24 Hours)</span>
              </div>
              <div className="cta-feature-item">
                <span className="feature-check">✓</span>
                <span>Free Consultation Available</span>
              </div>
              <div className="cta-feature-item">
                <span className="feature-check">✓</span>
                <span>Revision Support Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact


