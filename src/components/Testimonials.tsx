import { useState } from 'react'
import './Testimonials.css'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  testimonial: string
  beforeAfter?: {
    before: string
    after: string
  }
  service: string
  date: string
}

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Rahul Sharma',
      role: 'Software Engineer',
      company: 'Infosys',
      avatar: '👨‍💻',
      rating: 5,
      testimonial: 'I was struggling to get interview calls for 6 months. After getting my resume optimized by Resume Ready Stack, I received 8 interview calls in just 2 weeks! The ATS-friendly format made all the difference.',
      beforeAfter: {
        before: '0 interview calls in 6 months',
        after: '8 interview calls in 2 weeks, landed job at Infosys'
      },
      service: 'ATS Resume Writing',
      date: '2024'
    },
    {
      id: '2',
      name: 'Priya Patel',
      role: 'Marketing Manager',
      company: 'Hindustan Unilever',
      avatar: '👩‍💼',
      rating: 5,
      testimonial: 'The LinkedIn optimization service was exceptional! My profile views increased by 300% and recruiters started reaching out directly. The cover letter was perfectly tailored for each application.',
      beforeAfter: {
        before: '50 profile views per month',
        after: '200+ profile views per month, multiple recruiter messages'
      },
      service: 'LinkedIn Optimization + Cover Letter',
      date: '2024'
    },
    {
      id: '3',
      name: 'Amit Kumar',
      role: 'Data Analyst',
      company: 'TCS',
      avatar: '👨‍📊',
      rating: 5,
      testimonial: 'As a fresher, I had no idea how to structure my resume. The team created a professional resume highlighting my projects and skills. I got placed in TCS through campus placement!',
      service: 'Fresher Resume Writing',
      date: '2023'
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      role: 'HR Professional',
      company: 'Wipro',
      avatar: '👩‍💼',
      rating: 5,
      testimonial: 'The complete package was worth every penny! Resume, cover letter, and LinkedIn optimization - everything was perfect. I especially loved the portfolio creation that showcased my HR projects.',
      service: 'Complete Package',
      date: '2024'
    },
    {
      id: '5',
      name: 'Vikram Singh',
      role: 'Mechanical Engineer',
      company: 'Larsen & Toubro',
      avatar: '👷‍♂️',
      rating: 5,
      testimonial: 'My technical resume was transformed! The team knew exactly what recruiters in engineering look for. The portfolio section with my project details was impressive.',
      service: 'ATS Resume + Portfolio',
      date: '2023'
    },
    {
      id: '6',
      name: 'Neha Gupta',
      role: 'Business Analyst',
      company: 'Deloitte',
      avatar: '👩‍💻',
      rating: 5,
      testimonial: 'Outstanding service! The resume highlighted my business analysis skills perfectly. The cover letter addressed the job requirements specifically. Got multiple offers!',
      service: 'Resume + Cover Letter',
      date: '2024'
    }
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setActiveIndex(index)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ))
  }

  const currentTestimonial = testimonials[activeIndex]

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Success Stories</h2>
          <p className="testimonials-subtitle">
            Hear from professionals who transformed their careers with our help
          </p>
        </div>

        <div className="testimonials-stats">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">30</div>
            <div className="stat-label">Days Average</div>
          </div>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-carousel">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="client-info">
                  <div className="client-avatar">
                    <span className="avatar-emoji">{currentTestimonial.avatar}</span>
                  </div>
                  <div className="client-details">
                    <h3 className="client-name">{currentTestimonial.name}</h3>
                    <p className="client-role">{currentTestimonial.role}</p>
                    <p className="client-company">{currentTestimonial.company}</p>
                  </div>
                </div>
                <div className="testimonial-meta">
                  <div className="rating">
                    {renderStars(currentTestimonial.rating)}
                  </div>
                  <div className="service-badge">
                    {currentTestimonial.service}
                  </div>
                </div>
              </div>

              <div className="testimonial-content">
                <p className="testimonial-text">
                  "{currentTestimonial.testimonial}"
                </p>
              </div>

              {currentTestimonial.beforeAfter && (
                <div className="before-after">
                  <div className="before">
                    <h4>Before</h4>
                    <p>{currentTestimonial.beforeAfter.before}</p>
                  </div>
                  <div className="arrow">→</div>
                  <div className="after">
                    <h4>After</h4>
                    <p>{currentTestimonial.beforeAfter.after}</p>
                  </div>
                </div>
              )}

              <div className="testimonial-footer">
                <div className="testimonial-date">
                  Placed in {currentTestimonial.date}
                </div>
              </div>
            </div>

            <div className="carousel-controls">
              <button 
                className="carousel-btn prev"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                ‹
              </button>
              
              <div className="carousel-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => goToTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className="carousel-btn next"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                ›
              </button>
            </div>
          </div>

          <div className="testimonials-grid">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`testimonial-card-small ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
              >
                <div className="card-small-header">
                  <div className="client-avatar-small">
                    <span className="avatar-emoji">{testimonial.avatar}</span>
                  </div>
                  <div className="client-info-small">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
                <div className="rating-small">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="testimonial-text-small">
                  "{testimonial.testimonial.substring(0, 100)}..."
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials-cta">
          <div className="cta-content">
            <h3>Ready to write your success story?</h3>
            <p>Join 50+ professionals who landed their dream jobs</p>
            <a href="#pricing" className="btn btn-primary btn-large">
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
