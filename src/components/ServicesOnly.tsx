import { useState } from 'react'
import './ServicesOnly.css'

interface Service {
  id: string
  name: string
  icon: string
  originalPrice?: number
  currentPrice?: number
  description: string
  detailedDescription: string
  benefits: string[]
  features: string[]
  whyImportant: string
  process: string[]
  deliveryTime: string
  revisions: number
  color: string
  badge?: string
  popular?: boolean
}

function ServicesOnly() {
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [upiId] = useState('technicalpurnima123@oksbi') // Actual UPI ID from instructions
  const [upiName] = useState('Purnima Rani') // UPI Display Name

  const services: Service[] = [
    {
      id: 'ats-resume',
      name: 'ATS Resume Writing',
      icon: '📄',
      originalPrice: 1000,
      currentPrice: 899,
      description: 'Professional ATS-optimized resumes that get you shortlisted',
      detailedDescription: 'Our ATS-optimized resumes are designed to pass through automated screening systems used by 90% of Fortune 500 companies.',
      benefits: [
        '90% higher chance of getting shortlisted',
        'Passes ATS screening easily',
        'Industry-specific keywords',
        'Professional formatting'
      ],
      features: [
        'ATS-friendly formatting',
        'Keyword optimization',
        'Professional layout design',
        'PDF & Word formats',
        'Email support'
      ],
      whyImportant: '75% of resumes are rejected by ATS before reaching human recruiters. Our optimized resumes ensure you pass this critical screening.',
      process: [
        'Initial consultation',
        'Resume analysis',
        'Keyword research',
        'Draft creation',
        'ATS testing',
        'Final delivery'
      ],
      deliveryTime: '2-3 working days',
      revisions: 2,
      color: 'blue',
      badge: 'POPULAR',
      popular: true
    },
    {
      id: 'cover-letter',
      name: 'Cover Letter Writing',
      icon: '✉️',
      originalPrice: 499,
      currentPrice: 399,
      description: 'Compelling cover letters that make recruiters want to meet you',
      detailedDescription: 'A well-written cover letter can increase your chances of getting an interview by 40%.',
      benefits: [
        '40% higher interview rate',
        'Job-specific customization',
        'Shows your personality',
        'Highlights achievements'
      ],
      features: [
        'Job-specific customization',
        'Professional tone',
        'Achievement-focused content',
        'ATS-optimized formatting',
        'Word and PDF formats'
      ],
      whyImportant: 'Cover letters give you the opportunity to tell your story and explain gaps or career changes that resumes can\'t convey.',
      process: [
        'Job description analysis',
        'Background review',
        'Achievement identification',
        'Draft creation',
        'Professional editing',
        'Final version'
      ],
      deliveryTime: '1-2 working days',
      revisions: 1,
      color: 'purple'
    },
    {
      id: 'job-profile-optimization',
      name: 'All Job Profile Optimization',
      icon: '🌐',
      originalPrice: 2499,
      currentPrice: 1999,
      description: 'Complete optimization for LinkedIn, Naukri, Indeed, Internshala & OKRemote',
      detailedDescription: 'Maximize your visibility across all major job portals with our comprehensive profile optimization service.',
      benefits: [
        '300% more recruiter views',
        'Higher ranking in searches',
        'Professional online presence',
        'More interview opportunities'
      ],
      features: [
        'LinkedIn profile optimization',
        'Naukri.com enhancement',
        'Indeed profile setup',
        'Internshala optimization',
        'OKRemote profile creation',
        'Profile photo guidance',
        'Skills endorsement strategy'
      ],
      whyImportant: '85% of recruiters use LinkedIn to find candidates. Optimized profiles increase your visibility and chances of being discovered.',
      process: [
        'Current profile audit',
        'Keyword research',
        'Profile content creation',
        'Headline optimization',
        'Skills setup',
        'Profile completion'
      ],
      deliveryTime: '3-4 working days',
      revisions: 2,
      color: 'green',
      badge: 'BEST VALUE'
    },
    {
      id: 'portfolio-website',
      name: 'Portfolio Website',
      icon: '🎨',
      originalPrice: 2499,
      currentPrice: 1499,
      description: 'Professional portfolio website to showcase your work',
      detailedDescription: 'Stand out from the competition with a professional portfolio website. Perfect for creative professionals, freelancers, and anyone wanting to showcase their work.',
      benefits: [
        'Professional online presence',
        'Showcase your best work',
        'Impress potential employers',
        'Build personal brand',
        '24/7 accessibility'
      ],
      features: [
        'Modern responsive design',
        'Mobile-friendly layout',
        'Contact form integration',
        'Gallery/portfolio section',
        'About section',
        'Social media links',
        'SEO optimization',
        'Basic or Professional options available'
      ],
      whyImportant: 'Having a portfolio website makes you look professional and serious about your career. It\'s 24/7 accessible and shows your work in the best possible light.',
      process: [
        'Design consultation',
        'Content gathering',
        'Website development',
        'Mobile optimization',
        'Testing and review',
        'Launch and training'
      ],
      deliveryTime: '5-7 working days',
      revisions: 3,
      color: 'orange',
      badge: 'POPULAR'
    },
    {
      id: 'personal-website',
      name: 'Personal Website',
      icon: '💻',
      originalPrice: 4999,
      currentPrice: 2999,
      description: 'Complete personal website with advanced features',
      detailedDescription: 'Transform your online presence with a professional personal website that includes blog, portfolio, contact forms, and advanced features to establish your authority in your field.',
      benefits: [
        'Establish professional authority',
        'Complete online branding',
        'Lead generation tool',
        'Career advancement platform',
        'Networking hub'
      ],
      features: [
        'Custom design and branding',
        'Blog functionality',
        'Portfolio/gallery',
        'Contact forms',
        'Social media integration',
        'SEO optimization',
        'Analytics setup',
        'Mobile responsive',
        'Fast loading speed',
        'One-on-one consultation meeting'
      ],
      whyImportant: 'A personal website is your digital headquarters. It helps you build authority, attract opportunities, and create a professional brand that works for you 24/7.',
      process: [
        'Strategy consultation',
        'Design mockups',
        'Content planning',
        'Website development',
        'Testing and optimization',
        'Training and handover',
        'One-on-one consultation meeting'
      ],
      deliveryTime: '7-10 working days',
      revisions: 5,
      color: 'red',
      badge: 'PREMIUM'
    }
  ]

  const getDiscountPercentage = (original: number, current: number) => {
    if (original === 0) return 0
    return Math.round(((original - current) / original) * 100)
  }

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
  }

  const handleGetStarted = (service: Service) => {
    setSelectedService(service)
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    // Handle successful payment
    alert('Payment successful! We will contact you soon.')
    setShowPaymentModal(false)
    setSelectedService(null)
  }

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId)
    alert('UPI ID copied to clipboard!')
  }

  return (
    <section id="services" className="services-only">
      <div className="container">
        <div className="services-header">
          <div className="services-badge">OUR SERVICES</div>
          <h2 className="services-title">Professional Career Services</h2>
          <p className="services-subtitle">
            Industry-leading services designed to help you land your dream job faster
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${service.popular ? 'popular' : ''}`}
            >
              {service.badge && (
                <div className="service-badge-card">{service.badge}</div>
              )}
              
              <div className="service-header">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
              </div>

              {service.currentPrice && (
                <div className="service-pricing">
                  {service.originalPrice && (
                    <div className="original-price">₹{service.originalPrice.toLocaleString('en-IN')}</div>
                  )}
                  <div className="current-price">
                    ₹{service.currentPrice.toLocaleString('en-IN')}
                    {service.originalPrice && (
                      <span className="discount-badge">
                        {getDiscountPercentage(service.originalPrice, service.currentPrice)}% OFF
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="service-content">
                <div className="service-benefits">
                  <h4>Key Benefits:</h4>
                  <ul className="benefits-list">
                    {service.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="benefit-item">
                        <span className="benefit-icon">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="why-important">
                  <h4>Why Important:</h4>
                  <p>{service.whyImportant}</p>
                </div>

                <button
                  className="expand-button"
                  onClick={() => toggleServiceExpansion(service.id)}
                >
                  {expandedService === service.id ? 'Show Less' : 'Know More'}
                  <span className={`expand-icon ${expandedService === service.id ? 'expanded' : ''}`}>▼</span>
                </button>

                {expandedService === service.id && (
                  <div className="service-details">
                    <div className="detailed-description">
                      <h4>Detailed Description:</h4>
                      <p>{service.detailedDescription}</p>
                    </div>

                    <div className="service-features">
                      <h4>What's Included:</h4>
                      <ul className="features-list">
                        {service.features.map((feature, index) => (
                          <li key={index} className="feature-item">
                            <span className="feature-check">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="service-process">
                      <h4>Our Process:</h4>
                      <div className="process-steps">
                        {service.process.map((step, index) => (
                          <div key={index} className="process-step">
                            <div className="step-number">{index + 1}</div>
                            <div className="step-content">{step}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="service-delivery">
                      <div className="delivery-info">
                        <span className="delivery-label">Delivery:</span>
                        <span className="delivery-value">{service.deliveryTime}</span>
                      </div>
                      <div className="revisions-info">
                        <span className="revisions-label">Revisions:</span>
                        <span className="revisions-value">{service.revisions} included</span>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  className="service-button"
                  onClick={() => handleGetStarted(service)}
                >
                  {service.currentPrice ? 
                    `Order Now - ₹${service.currentPrice.toLocaleString('en-IN')}` : 
                    'Order Now'
                  }
                </button>
              </div>

              {service.popular && (
                <div className="popular-ribbon">
                  <span>POPULAR</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="services-footer">
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">🏆</span>
              <div className="trust-content">
                <h4>Expert Professionals</h4>
                <p>Industry-certified experts with 10+ years experience</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <div className="trust-content">
                <h4>Fast Delivery</h4>
                <p>Quick turnaround without compromising quality</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">💯</span>
              <div className="trust-content">
                <h4>Satisfaction Guaranteed</h4>
                <p>100% satisfaction or money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedService && (
        <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="payment-header">
              <h3>Complete Your Order</h3>
              <button className="close-button" onClick={() => setShowPaymentModal(false)}>×</button>
            </div>
            
            <div className="payment-content">
              <div className="order-summary">
                <h4>Order Summary</h4>
                <div className="order-item">
                  <span>{selectedService.name}</span>
                  <span>
                    {selectedService.currentPrice ? 
                      `₹${selectedService.currentPrice.toLocaleString('en-IN')}` : 
                      'Contact for Price'
                    }
                  </span>
                </div>
                {selectedService.currentPrice && (
                  <div className="order-total">
                    <span>Total</span>
                    <span>₹{selectedService.currentPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              <div className="payment-methods">
                <h4>Payment Methods</h4>
                <div className="payment-options">
                  <div className="payment-option">
                    <input type="radio" id="paytm" name="payment" defaultChecked />
                    <label htmlFor="paytm">Paytm</label>
                  </div>
                  <div className="payment-option">
                    <input type="radio" id="gpay" name="payment" />
                    <label htmlFor="gpay">Google Pay</label>
                  </div>
                  <div className="payment-option">
                    <input type="radio" id="phonepe" name="payment" />
                    <label htmlFor="phonepe">PhonePe</label>
                  </div>
                  <div className="payment-option">
                    <input type="radio" id="upi" name="payment" />
                    <label htmlFor="upi">UPI Transfer</label>
                  </div>
                </div>
              </div>

              <div className="qr-section">
                <h4>Scan to Pay</h4>
                <div className="qr-code">
                  <img 
                    src="/paytm-qr.png" 
                    alt="Payment QR Code" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY5Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwiPk5vIFFSIDwvdGV4dD4KPHN2ZyB4PSI1MCIgeT0iNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMUUyOTNCIj4KPHBhdGggZD0iTTUwIDUwIEw1MCAxMDAgTDcwIDEwMCBMNzAgNzAgTDkwIDcwIEw5MCA1MCBMNzAgNTAgTDcwIDcwIEw1MCA3MCBMNTAgNTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+';
                    }}
                  />
                </div>
                <p className="qr-instructions">
                  Scan the QR code with any payment app or use UPI ID below
                </p>
                
                <div className="upi-section">
                  <h5>Or Pay via UPI ID</h5>
                  <div className="upi-name">
                    <span className="name-label">Pay to:</span>
                    <span className="name-value">{upiName}</span>
                  </div>
                  <div className="upi-id-container">
                    <input 
                      type="text" 
                      value={upiId} 
                      readOnly 
                      className="upi-input"
                    />
                    <button className="copy-button" onClick={copyUpiId}>
                      Copy UPI ID
                    </button>
                  </div>
                </div>
              </div>

              <div className="payment-actions">
                <button className="pay-button" onClick={handlePaymentSuccess}>
                  {selectedService.currentPrice ? 
                    `Pay ₹${selectedService.currentPrice.toLocaleString('en-IN')}` : 
                    'Proceed to Payment'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ServicesOnly
