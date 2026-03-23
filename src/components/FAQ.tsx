import { useState } from 'react'
import './FAQ.css'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

function FAQ() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How long does it take to create a resume?',
      answer: 'Typically 2-3 working days for standard resume writing. Express delivery (24 hours) is available for an additional fee. We take time to understand your background and target roles to create the best resume.',
      category: 'Timeline'
    },
    {
      id: '2',
      question: 'What is ATS and why is it important?',
      answer: 'ATS (Applicant Tracking System) is software used by 90% of companies to screen resumes. Our ATS-optimized resumes use proper formatting, keywords, and structure to pass through these automated systems and reach human recruiters.',
      category: 'ATS'
    },
    {
      id: '3',
      question: 'Do you offer revisions?',
      answer: 'Yes! We include 1-2 revisions with all our packages. Additional revisions can be purchased if needed. We work with you until you\'re 100% satisfied with your resume.',
      category: 'Revisions'
    },
    {
      id: '4',
      question: 'What industries do you cover?',
      answer: 'We cover all industries including IT, Healthcare, Finance, Marketing, Engineering, Education, and more. Our writers have experience across diverse sectors and customize resumes for your specific industry.',
      category: 'Industries'
    },
    {
      id: '5',
      question: 'How do I share my job description?',
      answer: 'You can share job descriptions through our contact form, email, or WhatsApp. The more details you provide about your target role, the better we can customize your resume.',
      category: 'Process'
    },
    {
      id: '6',
      question: 'What\'s the difference between fresher and experienced pricing?',
      answer: 'Fresher pricing (₹999) is for students and professionals with 0-2 years of experience. Experienced pricing (₹1,499) is for professionals with 2+ years of experience and requires more complex resume structuring.',
      category: 'Pricing'
    },
    {
      id: '7',
      question: 'Do you provide LinkedIn optimization?',
      answer: 'Yes! We optimize your LinkedIn profile including headline, summary, experience descriptions, and skills to attract recruiters and increase visibility in LinkedIn searches.',
      category: 'LinkedIn'
    },
    {
      id: '8',
      question: 'What format will I receive my resume in?',
      answer: 'You\'ll receive your resume in both PDF (for applications) and Word (for future edits) formats. The PDF is ATS-optimized and the Word file is fully editable.',
      category: 'Delivery'
    },
    {
      id: '9',
      question: 'How successful are your resumes?',
      answer: 'Our success rate is 95% - 95% of our clients get interview calls within 30 days. We\'ve helped 50+ professionals land their dream jobs across various industries.',
      category: 'Results'
    },
    {
      id: '10',
      question: 'Do you offer cover letters?',
      answer: 'Yes! We write customized cover letters that complement your resume and address specific job requirements. Cover letters are tailored for each application.',
      category: 'Services'
    },
    {
      id: '11',
      question: 'What payment methods do you accept?',
      answer: 'We accept Paytm, Google Pay, PhonePe, UPI, and bank transfers. Payment details are provided after we discuss your requirements. Secure payment options available.',
      category: 'Payment'
    },
    {
      id: '12',
      question: 'Can you help with portfolio creation?',
      answer: 'Yes! We create professional portfolios showcasing your work, projects, and achievements. Portfolios are especially useful for creative professionals and those in technical fields.',
      category: 'Services'
    }
  ]

  const categories = ['All', 'Timeline', 'ATS', 'Revisions', 'Industries', 'Process', 'Pricing', 'LinkedIn', 'Delivery', 'Results', 'Services', 'Payment']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  const toggleItem = (id: string) => {
    setActiveItem(activeItem === id ? null : id)
  }

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about our resume writing services
          </p>
        </div>

        <div className="faq-categories">
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="faq-container">
          <div className="faq-list">
            {filteredFAQs.map((item) => (
              <div
                key={item.id}
                className={`faq-item ${activeItem === item.id ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={activeItem === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-toggle">
                    <span className="faq-icon">{activeItem === item.id ? '−' : '+'}</span>
                  </span>
                </button>
                
                <div
                  id={`faq-answer-${item.id}`}
                  className={`faq-answer ${activeItem === item.id ? 'show' : ''}`}
                >
                  <div className="faq-answer-content">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-sidebar">
            <div className="faq-help-card">
              <div className="help-icon">💬</div>
              <h3>Still have questions?</h3>
              <p>Can't find the answer you're looking for? Our team is here to help!</p>
              <div className="help-actions">
                <a href="#contact-form" className="btn btn-primary">
                  Contact Us
                </a>
                <a href="tel:+919876543210" className="btn btn-outline">
                  Call Now
                </a>
              </div>
            </div>

            <div className="faq-stats">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24hr</div>
                <div className="stat-label">Response Time</div>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-cta">
          <div className="cta-content">
            <h3>Ready to transform your career?</h3>
            <p>Join 50+ professionals who landed their dream jobs with our help</p>
            <a href="#pricing" className="btn btn-large btn-primary">
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
