import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section">
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/resume-ready-stack-logo.svg"
                alt="Resume Ready Stack"
              />
            </div>
            <h3 className="footer-title">Resume Ready Stack</h3>
          </div>
          <p className="footer-description">
            Professional Resume Writing & Career Profile Services. Helping professionals 
            achieve their career goals with ATS-optimized resumes and compelling profiles.
          </p>
          <div className="footer-social">
            <a
              href="https://wa.me/919876543210?text=Hello! I want to know about your services."
              className="footer-social-link"
              aria-label="WhatsApp"
              target="_blank"
              rel="noreferrer"
            >
              <span>💬</span>
            </a>
            <a
              href="mailto:resumereadystack@gmail.com?subject=Resume / Career Profile Requirement"
              className="footer-social-link"
              aria-label="Email"
              target="_blank"
              rel="noreferrer"
            >
              <span>📧</span>
            </a>
            <a
              href="https://linkedin.com/in/purnima-rani"
              className="footer-social-link"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <span>💼</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="#home" className="footer-link">Home</a>
            </li>
            <li>
              <a href="#about" className="footer-link">About</a>
            </li>
            <li>
              <a href="#services" className="footer-link">Services</a>
            </li>
            <li>
              <a href="#payment-plans" className="footer-link">Payment Plans</a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li>
              <a href="#services" className="footer-link">ATS Resume</a>
            </li>
            <li>
              <a href="#services" className="footer-link">Cover Letter</a>
            </li>
            <li>
              <a href="#services" className="footer-link">LinkedIn Profile</a>
            </li>
            <li>
              <a href="#services" className="footer-link">Portfolio</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <div className="footer-contact">
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📧</div>
              <a href="mailto:resumereadystack@gmail.com" className="footer-contact-link">
              resumereadystack@gmail.com
              </a>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📱</div>
              <a href="tel:+919876543210" className="footer-contact-link">
                +91 98765 43210
              </a>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">💬</div>
              <a href="https://wa.me/919876543210" className="footer-contact-link">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} Resume Ready Stack. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">Privacy Policy</a>
          <a href="#" className="footer-bottom-link">Terms of Service</a>
          <a href="#" className="footer-bottom-link">Refund Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
