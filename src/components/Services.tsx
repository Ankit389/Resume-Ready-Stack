import './Services.css'

function Services() {
  const services = [
    {
      title: 'ATS Resume Writing',
      description: 'Professionally crafted resumes optimized for Applicant Tracking Systems. Keyword-rich content that gets you past automated screening.',
      icon: '📄'
    },
    {
      title: 'Cover Letter Writing',
      description: 'Compelling cover letters tailored to each job application. Showcases your unique value and demonstrates perfect fit for the role.',
      icon: '✉️'
    },
    {
      title: 'LinkedIn Profile Optimization',
      description: 'Complete LinkedIn profile makeover to maximize visibility. Attract recruiters and build a strong professional brand online.',
      icon: '💼'
    },
    {
      title: 'Portfolio Creation',
      description: 'Professional portfolio development to showcase your work, projects, and achievements. Stand out with a polished online presence.',
      icon: '🎨'
    },
    {
      title: 'Resume Review & ATS Improvement',
      description: 'Comprehensive review of your existing resume with actionable feedback. Enhance ATS compatibility and overall impact.',
      icon: '🔍'
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Services</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Comprehensive career services designed to elevate your professional presence
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

