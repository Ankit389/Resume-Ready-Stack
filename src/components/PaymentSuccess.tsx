import { useEffect, useState } from 'react'
import { Check, Phone, Mail, MessageCircle, Clock, ArrowRight } from 'lucide-react'
import './PaymentSuccess.css'

function PaymentSuccess() {
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    // Get payment details from localStorage
    const stored = localStorage.getItem('paymentSuccess')
    if (stored) {
      setPaymentDetails(JSON.parse(stored))
    }

    // Countdown for redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = '/'
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleWhatsApp = () => {
    const message = `Hi! I've just purchased the ${paymentDetails?.planName || 'service'} (Payment ID: ${paymentDetails?.razorpay_payment_id}). Please let me know the next steps.`
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleCall = () => {
    window.open('tel:+919876543210', '_self')
  }

  const handleEmail = () => {
    window.open('mailto:resumereadystack@gmail.com?subject=Payment Confirmation - Resume Ready Stack', '_blank')
  }

  return (
    <div className="payment-success">
      <div className="success-container">
        {/* Success Animation */}
        <div className="success-animation">
          <div className="success-circle">
            <Check className="success-check" />
          </div>
          <div className="success-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>

        {/* Success Message */}
        <div className="success-content">
          <h1 className="success-title">Payment Successful! 🎉</h1>
          <p className="success-message">
            Thank you for choosing Resume Ready Stack! Your payment has been successfully processed.
          </p>
          
          {paymentDetails && (
            <div className="payment-details">
              <h3>Order Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Service:</span>
                  <span className="detail-value">{paymentDetails.planName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Payment ID:</span>
                  <span className="detail-value">{paymentDetails.razorpay_payment_id}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">
                    {paymentDetails.planPrice === 0 ? 'FREE' : `₹${paymentDetails.planPrice.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{paymentDetails.email}</span>
                </div>
              </div>
            </div>
          )}

          {/* What's Next */}
          <div className="next-steps">
            <h3>What's Next?</h3>
            <div className="steps-list">
              <div className="step-item">
                <Clock className="step-icon" />
                <div className="step-content">
                  <h4>Within 24 Hours</h4>
                  <p>Our team will contact you to schedule your consultation</p>
                </div>
              </div>
              <div className="step-item">
                <Mail className="step-icon" />
                <div className="step-content">
                  <h4>Email Confirmation</h4>
                  <p>You'll receive a detailed email with next steps</p>
                </div>
              </div>
              <div className="step-item">
                <Check className="step-icon" />
                <div className="step-content">
                  <h4>Service Delivery</h4>
                  <p>Get your professional resume and career services</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="contact-actions">
            <h3>Need Immediate Assistance?</h3>
            <div className="action-buttons">
              <button className="action-btn whatsapp-btn" onClick={handleWhatsApp}>
                <MessageCircle className="btn-icon" />
                WhatsApp Us
              </button>
              <button className="action-btn call-btn" onClick={handleCall}>
                <Phone className="btn-icon" />
                Call Now
              </button>
              <button className="action-btn email-btn" onClick={handleEmail}>
                <Mail className="btn-icon" />
                Send Email
              </button>
            </div>
          </div>

          {/* Redirect Notice */}
          <div className="redirect-notice">
            <p>
              You will be redirected to the homepage in <span className="countdown">{countdown}</span> seconds
            </p>
            <button 
              className="home-btn" 
              onClick={() => window.location.href = '/'}
            >
              Go to Homepage Now
              <ArrowRight className="btn-arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
