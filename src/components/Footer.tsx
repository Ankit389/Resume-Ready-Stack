import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-about">
            <h3 className="footer-title">Resume Ready Stack</h3>
            <p className="footer-description">
              Professional Resume Writing & Career Profile Services. Helping professionals 
              achieve their career goals with ATS-optimized resumes and compelling profiles.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="WhatsApp">
                <span className="social-icon">💬</span>
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <span className="social-icon">📧</span>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <span className="social-icon">💼</span>
              </a>
            </div>
          </div>

          <div className="footer-section footer-services">
            <h4 className="footer-subtitle">Services</h4>
            <ul className="footer-links">
              <li><a href="#services">ATS Resume Writing</a></li>
              <li><a href="#services">Cover Letter Writing</a></li>
              <li><a href="#services">LinkedIn Optimization</a></li>
              <li><a href="#services">Portfolio Creation</a></li>
              <li><a href="#services">Resume Review</a></li>
            </ul>
          </div>

          <div className="footer-section footer-quick-links">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About Me</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#why-choose-me">Why Choose Me</a></li>
              <li><a href="#proof">Proof & Results</a></li>
              <li><a href="#process">How It Works</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section footer-contact">
            <h4 className="footer-subtitle">Get In Touch</h4>
            <div className="footer-contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>contact@purnimacareerstudio.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💬</span>
                <span>Available on WhatsApp</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <span>Response within 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear}Resume Ready Stack. All rights reserved.</p>
            <p className="footer-tagline">Crafting Careers, One Resume at a Time</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

