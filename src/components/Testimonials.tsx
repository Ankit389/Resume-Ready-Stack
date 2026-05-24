import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    name: "Rohit Sharma",
    role: "Software Developer",
    company: "HCL Technologies",
    text: "Got 3 interview calls within a week! My resume passed ATS for the first time. Amazing service!",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Data Analyst",
    company: "StartupHub",
    text: "The LinkedIn profile optimization was a game-changer. Recruiters started reaching out to me!",
    rating: 5
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Product Manager",
    company: "Accenture",
    text: "Professional resume writing helped me land my dream job. Worth every penny!",
    rating: 5
  },
  {
    id: 4,
    name: "Neha Singh",
    role: "UX Designer",
    company: "Infosys",
    text: "The portfolio setup service was incredible. My work is now professionally presented.",
    rating: 5
  }
]

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
  }

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  }

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Section Header */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Our Clients Say 💬</h2>
          <p className="testimonials-subtitle">Real results from job seekers who trusted us</p>
        </div>

        {/* Testimonials Grid - Desktop View */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              {/* Star Rating */}
              <div className="testimonial-rating">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    className={`star ${index < testimonial.rating ? 'star-filled' : 'star-empty'}`}
                    size={16}
                    fill={index < testimonial.rating ? '#f59e0b' : 'none'}
                    color={index < testimonial.rating ? '#f59e0b' : '#d1d5db'}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="testimonial-text">"{testimonial.text}"</p>

              {/* Client Info */}
              <div className="testimonial-client">
                <div className="client-avatar">
                  <span className="avatar-initials">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="client-info">
                  <h4 className="client-name">{testimonial.name}</h4>
                  <p className="client-role">{testimonial.role}</p>
                  {testimonial.company && (
                    <p className="client-company">{testimonial.company}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="testimonials-carousel">
          <div className="carousel-container">
            <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
              ‹
            </button>
            
            <div className="carousel-track">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                >
                  <div className="testimonial-card">
                    {/* Star Rating */}
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star 
                          key={starIndex} 
                          className={`star ${starIndex < testimonial.rating ? 'star-filled' : 'star-empty'}`}
                          size={16}
                          fill={starIndex < testimonial.rating ? '#f59e0b' : 'none'}
                          color={starIndex < testimonial.rating ? '#f59e0b' : '#d1d5db'}
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="testimonial-text">"{testimonial.text}"</p>

                    {/* Client Info */}
                    <div className="testimonial-client">
                      <div className="client-avatar">
                        <span className="avatar-initials">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="client-info">
                        <h4 className="client-name">{testimonial.name}</h4>
                        <p className="client-role">{testimonial.role}</p>
                        {testimonial.company && (
                          <p className="client-company">{testimonial.company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
              ›
            </button>
          </div>

          {/* Carousel Dots */}
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="testimonials-cta">
          <a href="#payment-plans" className="cta-button">
            Get Free Resume Audit 🚀
          </a>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
