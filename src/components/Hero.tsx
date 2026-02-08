import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              ATS-Optimized Resumes & Career Profiles That Get Shortlisted
            </h1>
            <p className="hero-subheading">
              Resume Writing | Cover Letters | LinkedIn Optimization | Portfolio Creation
            </p>
            <p className="hero-supporting">
              Helping freshers and professionals get more interview calls.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-hero-primary">Get Your Resume Reviewed</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="workspace-illustration">
              <div className="laptop">
                <div className="laptop-screen">
                  <div className="screen-content">
                    <div className="resume-preview">
                      <div className="resume-line"></div>
                      <div className="resume-line short"></div>
                      <div className="resume-line"></div>
                      <div className="resume-line short"></div>
                      <div className="resume-line"></div>
                    </div>
                  </div>
                </div>
                <div className="laptop-base"></div>
              </div>
              <div className="resume-paper">
                <div className="paper-line"></div>
                <div className="paper-line short"></div>
                <div className="paper-line"></div>
              </div>
              <div className="coffee-cup"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

