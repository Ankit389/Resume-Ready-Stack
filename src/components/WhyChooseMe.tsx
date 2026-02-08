import './WhyChooseMe.css'

function WhyChooseMe() {
  const features = [
    {
      title: 'ATS Expertise',
      description: 'Deep understanding of Applicant Tracking Systems. Your resume will be optimized with the right keywords and formatting to pass automated screening.',
      icon: '✓'
    },
    {
      title: 'Job-Specific Customization',
      description: 'Every resume is tailored to match specific job requirements. I analyze job descriptions to highlight the most relevant skills and experiences.',
      icon: '✓'
    },
    {
      title: 'IT & Non-IT Experience',
      description: 'Extensive experience across diverse industries. Whether you\'re in technology, finance, healthcare, or any other field, I understand your industry\'s unique needs.',
      icon: '✓'
    },
    {
      title: 'Clear Communication',
      description: 'I maintain transparent communication throughout the process. Regular updates, quick responses, and collaborative approach ensure you\'re always in the loop.',
      icon: '✓'
    },
    {
      title: 'Professional Formatting',
      description: 'Clean, modern, and ATS-friendly formatting that makes your resume visually appealing while maintaining compatibility with recruitment systems.',
      icon: '✓'
    },
    {
      title: 'Proven Results',
      description: 'Track record of helping professionals get more interview calls. My clients consistently see improved response rates and job opportunities.',
      icon: '✓'
    }
  ]

  return (
    <section id="why-choose-me" className="why-choose-me">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Me</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            What sets my services apart and makes me the right choice for your career success
          </p>
        </div>
        <div className="why-choose-content">
          <div className="features-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">{feature.icon}</div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="why-choose-visual">
            <div className="visual-card">
              <div className="visual-icon">🎯</div>
              <div className="visual-stats">
                <div className="stat-circle">
                  <div className="stat-value">95%</div>
                  <div className="stat-label">ATS Pass Rate</div>
                </div>
                <div className="stat-circle">
                  <div className="stat-value">50+</div>
                  <div className="stat-label">Resumes Created</div>
                </div>
                <div className="stat-circle">
                  <div className="stat-value">IT & Non-IT</div>
                  <div className="stat-label">Industry Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseMe

