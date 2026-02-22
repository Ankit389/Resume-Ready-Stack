import './About.css'

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <div className="section-divider"></div>
        </div>
        <div className="about-card">
          <div className="about-image">
            <div className="professional-portrait-wrapper">
              <div className="professional-portrait">
                <img 
                  src="/purnima-rani.jpg" 
                  alt="Purnima Rani" 
                  className="portrait-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="portrait-placeholder" style={{display: 'none'}}>
                  <div className="portrait-icon">👤</div>
                </div>
              </div>
              <div className="portrait-name">Purnima Rani</div>
            </div>
          </div>
          <div className="about-text">
            <p className="about-intro">
              I am a dedicated Resume Writer & Career Profile Specialist with a proven track record 
              of helping professionals achieve their career goals. With expertise spanning both IT and 
              Non-IT industries, I understand the unique requirements and expectations across diverse 
              sectors.
            </p>
            <p>
              Having created <strong>50+ professional resumes</strong>, I specialize in crafting 
              documents that not only showcase your skills and experience but also pass through 
              Applicant Tracking Systems (ATS) with ease. My <strong>ATS-focused approach</strong> 
              ensures that your resume reaches human recruiters, while my understanding of 
              recruitment processes helps me create <strong>recruiter-friendly profiles</strong> 
              that make a lasting impression.
            </p>
            <p>
              Whether you're in technology, finance, marketing, healthcare, or any other field, 
              I tailor each resume to highlight your unique value proposition. My goal is to help 
              you stand out in today's competitive job market and secure more interview opportunities.
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">✓</span>
                <span>50+ Resumes Created</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">✓</span>
                <span>IT & Non-IT Experience</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">✓</span>
                <span>ATS-Optimized Approach</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">✓</span>
                <span>Recruiter-Friendly Profiles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

