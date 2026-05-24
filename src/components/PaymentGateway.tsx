import { useState, useEffect, ChangeEvent } from "react"
import { Check, CreditCard, Shield, Clock, User, Mail, Phone, Building } from 'lucide-react'
import { paymentAPI } from '../lib/api'
import './PaymentGateway.css'

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentData {
  name: string
  email: string
  phone: string
  company?: string
  planName: string
  planPrice: number
  planFeatures: string[]
}

function PaymentGateway() {
  const [loading, setLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    agreeTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')

  // Get payment data from URL params or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const planName = urlParams.get('plan') || localStorage.getItem('selectedPlan')
    const planPrice = parseInt(urlParams.get('price') || localStorage.getItem('planPrice') || '1999')
    
    if (planName) {
      // Mock plan data - in real app, this would come from your plans
      const plans: Record<string, { price: number; features: string[] }> = {
        'Resume Audit': {
          price: 0,
          features: ['Free Resume Review', 'ATS Score Check', 'Keyword Analysis', 'Format Check']
        },
        'ATS Optimization': {
          price: 1999,
          features: ['ATS Resume', 'Cover Letter', 'Keyword Optimization', 'Format Fix']
        },
        'Profile Package': {
          price: 2999,
          features: ['ATS Resume', 'LinkedIn Profile', 'Cover Letter', 'Portfolio Setup']
        },
        'Complete Career': {
          price: 4999,
          features: ['ATS Resume', 'LinkedIn Profile', 'Portfolio Website', 'Cover Letter', 'Interview Prep', 'Job Support']
        },
        'Test Payment': {
          price: 2,
          features: ['Test Payment', 'Payment Gateway Check', 'Transaction Verification']
        }
      }

      setPaymentData({
        name: '',
        email: '',
        phone: '',
        company: '',
        planName,
        planPrice,
        planFeatures: plans[planName]?.features || []
      })
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const loadScript = () => new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

  const initializePayment = async () => {
    if (!validateForm()) {
      return
    }

    if (!paymentData) {
      setError('Payment details are missing. Please go back and try again.')
      return
    }

    setLoading(true)
    setError('')

    const loaded = await loadScript()
    if (!loaded) {
      alert('Payment system is loading. Please try again.')
      setLoading(false)
      return
    }

    try {
      const planId = localStorage.getItem('planId') || paymentData.planName
      const orderResponse = await paymentAPI.createOrder({
        planName: paymentData.planName,
        planId: String(planId),
        amount: paymentData.planPrice,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        notes: {
          plan: paymentData.planName,
          company: formData.company,
        },
      })

      const orderData = orderResponse.data?.data
      if (!orderData || !orderData.razorpayOrderId) {
        throw new Error('Unable to create payment order. Please try again.')
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Resume Ready Stack',
        description: `${paymentData.planName} - Professional Resume Service`,
        image: '/resume-ready-stack-logo.svg',
        order_id: orderData.razorpayOrderId,
        handler: async function (response: any) {
          try {
            await paymentAPI.verifyPayment({
              orderId: orderData.orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              customerName: formData.name,
              customerEmail: formData.email,
              customerPhone: formData.phone,
            })

            setPaymentSuccess(true)
            const paymentDetails = {
              razorpay_payment_id: response.razorpay_payment_id,
              ...paymentData,
              ...formData,
              paidAt: new Date().toISOString(),
            }
            localStorage.setItem('paymentSuccess', JSON.stringify(paymentDetails))

            setTimeout(() => {
              window.location.href = '/payment-success'
            }, 2000)
          } catch (verifyError: any) {
            console.error('Verification failed:', verifyError)
            const verifyMessage = verifyError?.response?.data?.message || 'Payment verification failed. Please contact support.'
            setError(verifyMessage)
            alert(verifyMessage)
            setLoading(false)
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          plan: paymentData.planName,
          company: formData.company,
        },
        theme: {
          color: '#9333ea',
          backdrop_color: '#f4efff',
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
            console.log('Payment modal dismissed')
          },
          escape: true,
          handleback: true,
          confirm_close: true,
          animation: 'slide',
        },
      }

      try {
        const rzp = new window.Razorpay(options)
        rzp.open()
        rzp.on('payment.failed', function (response: any) {
          console.error('Payment failed:', response)
          alert(`Payment Failed: ${response.error?.description || response.error?.reason || 'Please try again.'}`)
          setLoading(false)
        })
      } catch (error) {
        console.error('Razorpay error:', error)
        alert('Payment system error. Please try again.')
        setLoading(false)
      }
    } catch (err: any) {
      console.error('Order creation error:', err)
      setError(err?.response?.data?.message || err?.message || 'Unable to start payment. Please try again.')
      setLoading(false)
    }
  }

  if (!paymentData) {
    return (
      <div className="payment-gateway-loading">
        <div className="loading-spinner"></div>
        <p>Loading payment details...</p>
      </div>
    )
  }

  if (paymentSuccess) {
    return (
      <div className="payment-success">
        <div className="success-icon">✅</div>
        <h2>Payment Successful!</h2>
        <p>Thank you for choosing Resume Ready Stack.</p>
        <p>We will contact you within 24 hours to get started.</p>
        <p>Redirecting to success page...</p>
      </div>
    )
  }

  return (
    <div className="payment-gateway">
      <div className="payment-container">
        {/* Header */}
        <div className="payment-header">
          <div className="payment-logo">
            <img src="/resume-ready-stack-logo.svg" alt="Resume Ready Stack" />
            <h1>Resume Ready Stack</h1>
          </div>
          <div className="payment-security">
            <Shield className="security-icon" />
            <span>Secure Payment</span>
          </div>
        </div>

        {error && (
          <div className="payment-error-banner">
            <p>{error}</p>
          </div>
        )}

        <div className="payment-content">
          {/* Plan Summary */}
          <div className="plan-summary">
            <div className="plan-header">
              <h2>{paymentData.planName}</h2>
              <div className="plan-price">
                {paymentData.planPrice === 0 ? (
                  <span className="free-price">FREE</span>
                ) : (
                  <span className="paid-price">₹{paymentData.planPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
            </div>
            
            <div className="plan-features">
              <h3>What you'll get:</h3>
              <ul>
                {paymentData.planFeatures.map((feature, index) => (
                  <li key={index}>
                    <Check className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment Form */}
          <div className="payment-form">
            <h3>Complete Your Purchase</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">
                  <User className="input-icon" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <Mail className="input-icon" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <Phone className="input-icon" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="98765 43210"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="company">
                  <Building className="input-icon" />
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company name"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="terms-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className={errors.agreeTerms ? 'error' : ''}
                />
                <span>
                  I agree to the <a href="/terms" target="_blank">Terms and Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                </span>
              </label>
              {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
            </div>

            {/* Payment Button */}
            <button
              className="payment-button"
              onClick={initializePayment}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  Processing Payment...
                </>
              ) : paymentData.planPrice === 0 ? (
                <>
                  <Check className="button-icon" />
                  Get Free Service
                </>
              ) : (
                <>
                  <CreditCard className="button-icon" />
                  Pay ₹{paymentData.planPrice.toLocaleString('en-IN')}
                </>
              )}
            </button>

            {/* Security Badges */}
            <div className="security-badges">
              <div className="badge">
                <Shield className="badge-icon" />
                <span>SSL Encrypted</span>
              </div>
              <div className="badge">
                <Clock className="badge-icon" />
                <span>Instant Access</span>
              </div>
              <div className="badge">
                <CreditCard className="badge-icon" />
                <span>Multiple Payment Options</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="payment-footer">
          <p>Need help? Contact us at <a href="tel:+919876543210">+91 98765 43210</a></p>
          <p>or WhatsApp us at <a href="https://wa.me/919876543210" target="_blank">+91 98765 43210</a></p>
        </div>
      </div>
    </div>
  )
}

export default PaymentGateway
