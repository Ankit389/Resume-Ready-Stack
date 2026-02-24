import { useState } from 'react'
import './Pricing.css'

interface Package {
  id: string
  name: string
  price: number
  originalPrice?: number
  badge?: string
  features: string[]
  color: string
  popular?: boolean
}

function Pricing() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const packages: Package[] = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: 999,
       originalPrice: 1299,
      badge: 'Best for Freshers',
      color: 'blue',
      features: [
        'Resume ATS Optimization',
        'LinkedIn Headline Optimization',
        'LinkedIn Summary Optimization',
        'Indeed / Internshala Basic Profile Optimization',
        '1 Revision',
        'Delivery Time: 2–3 Working Days'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: 1499,
      originalPrice: 1999,
      badge: 'Most Popular',
      color: 'purple',
      popular: true,
      features: [
        'Complete Resume Rewrite (ATS Friendly + Professional Format)',
        'LinkedIn Complete Profile Optimization',
        'Job Portal Profile Optimization',
        'Job Search Keyword Optimization',
        '2 Revisions',
        'Priority Support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: 2499,
      originalPrice: 3500,
      badge: 'Best Value',
      color: 'gold',
      features: [
        '3 Types of Professional Resume (ATS + Professional + Job Specific)',
        'Complete LinkedIn Advanced Optimization',
        'All Job Portal Advanced Optimization',
        'Advanced Job Search Keyword Strategy',
        'Direct HR Mail Drafting Support',
        'Interview Preparation Guidance (Basic)',
        'Unlimited Revisions (Within Service Period)',
        'Priority Team Support',
        'Fast Track Delivery'
      ]
    }
  ]

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg)
    setShowPaymentModal(true)
  }

  const handleWhatsAppPayment = (pkg: Package) => {
    const phoneNumber = '1234567890' // Replace with your WhatsApp number
    const message = encodeURIComponent(
      `Hello! I want to purchase the ${pkg.name} (₹${pkg.price}). Please share payment details.`
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    setShowPaymentModal(false)
  }

  const handleEmailPayment = (pkg: Package) => {
    const email = 'contact@purnimacareerstudio.com'
    const subject = encodeURIComponent(`Payment Request - ${pkg.name}`)
    const body = encodeURIComponent(
      `Hello,\n\nI want to purchase the ${pkg.name} (₹${pkg.price}).\n\nPlease share payment details.\n\nThank you!`
    )
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    setShowPaymentModal(false)
  }

  return (
    <>
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Package</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Select the perfect package that fits your career needs and budget
            </p>
          </div>

          <div className="pricing-grid">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`pricing-card ${pkg.popular ? 'popular' : ''} ${pkg.color}`}
              >
                {pkg.badge && (
                  <div className="package-badge">{pkg.badge}</div>
                )}
                
                <div className="package-header">
                  <h3 className="package-name">{pkg.name}</h3>
                  <div className="package-price">
                    <span className="currency">₹</span>
                    <span className="amount">{pkg.price.toLocaleString('en-IN')}</span>
                    {pkg.originalPrice && (
                      <span className="original-price">
                        ₹{pkg.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="package-features">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span className="feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="package-button"
                  onClick={() => handleSelectPackage(pkg)}
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && selectedPackage && (
        <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowPaymentModal(false)}
            >
              ×
            </button>

            <div className="payment-modal-content">
              <h3 className="modal-title">Complete Your Payment</h3>
              <div className="selected-package-info">
                <h4>{selectedPackage.name}</h4>
                <p className="package-price-display">
                  ₹{selectedPackage.price.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="payment-options">
                <div className="payment-option-section">
                  <h5 className="payment-section-title">📱 Pay via UPI QR Code</h5>
                  <div className="paytm-qr-container">
                    <div className="qr-user-info">
                      <div className="qr-user-icon">👤</div>
                      <div className="qr-user-name">Purnima Rani</div>
                    </div>
                    <div className="qr-code-wrapper">
                      <img
                        src="/paytm-qr.png"
                        alt="UPI QR Code"
                        className="paytm-qr-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const placeholder = target.nextElementSibling as HTMLElement;
                          if (placeholder) placeholder.style.display = 'flex';
                        }}
                      />
                      <div className="qr-code-placeholder" style={{display: 'none'}}>
                        <div className="qr-icon">📱</div>
                        <p className="qr-note">QR Code image not found. Please add paytm-qr.png in public folder.</p>
                      </div>
                    </div>
                    <div className="upi-id-display">
                      <span className="upi-label">UPI ID:</span>
                      <span className="upi-id">technicalpurnima123@oksbi</span>
                      <button 
                        className="copy-upi-btn"
                        onClick={() => {
                          navigator.clipboard.writeText('technicalpurnima123@oksbi');
                          alert('UPI ID copied to clipboard!');
                        }}
                        title="Copy UPI ID"
                      >
                        📋
                      </button>
                    </div>
                    <p className="qr-scan-instruction">Scan to pay with any UPI app</p>
                  </div>
                  <div className="payment-amount-display">
                    <strong>Amount: ₹{selectedPackage.price.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className="payment-divider">
                  <span>OR</span>
                </div>

                <div className="payment-option-section">
                  <h5 className="payment-section-title">💬 Contact for Payment</h5>
                  <div className="contact-payment-buttons">
                    <button
                      className="payment-contact-btn whatsapp-btn"
                      onClick={() => handleWhatsAppPayment(selectedPackage)}
                    >
                      <span className="btn-icon">💬</span>
                      <span>Pay via WhatsApp</span>
                    </button>
                    <button
                      className="payment-contact-btn email-btn"
                      onClick={() => handleEmailPayment(selectedPackage)}
                    >
                      <span className="btn-icon">📧</span>
                      <span>Pay via Email</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="payment-instructions">
                <h6>Payment Instructions:</h6>
                <ol>
                  <li>Select your preferred payment method above</li>
                  <li>Complete the payment</li>
                  <li>Share payment screenshot via WhatsApp or Email</li>
                  <li>We'll verify and start your service within 24 hours</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Pricing

