import { useEffect, useState } from 'react'
import './Navbar.css'

type NavItem = { label: string; href: string }

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Payment Plans', href: '#payment-plans' },
    { label: 'Contact', href: '#contact' }
  ]

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <a className="navbar-brand" href="#home" aria-label="Go to Home">
            <div className="navbar-brand-logo">
              <img
                src="/resume-ready-stack-logo.svg"
                alt="Resume Ready Stack"
              />
            </div>
            <span className="navbar-brand-text">RESUME READY STACK</span>
          </a>

          <nav className="navbar-links" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="navbar-link">
                {item.label}
              </a>
            ))}
          </nav>

          <a className="navbar-cta" href="#payment-plans">
            Get Package
          </a>

          <button
            className="navbar-menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <div className="navbar-menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="navbar-mobile-overlay"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="navbar-mobile"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="navbar-mobile-header">
              <h3 className="navbar-mobile-title">Menu</h3>
              <button
                className="navbar-mobile-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="navbar-mobile-links" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  className="navbar-mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a 
              className="navbar-mobile-cta" 
              href="#payment-plans"
              onClick={() => setMenuOpen(false)}
            >
              Get Package
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
