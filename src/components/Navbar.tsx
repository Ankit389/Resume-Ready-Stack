// import { useEffect, useState } from 'react'
// import './Navbar.css'

// type NavItem = { label: string; href: string }

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false)

//   const navItems: NavItem[] = [
//     { label: 'Home', href: '#home' },
//     { label: 'About', href: '#about' },
//     { label: 'Services', href: '#services' },
//     { label: 'Pricing', href: '#pricing' },
//     { label: 'Contact', href: '#contact' }
//   ]

//   useEffect(() => {
//     if (!menuOpen) return

//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') setMenuOpen(false)
//     }

//     window.addEventListener('keydown', onKeyDown)
//     return () => window.removeEventListener('keydown', onKeyDown)
//   }, [menuOpen])

//   return (
//     <header className="navbar">
//       <div className="container navbar-inner">
//         <a className="navbar-brand" href="#home" aria-label="Go to Home">
//           <img
//             className="navbar-brand-logo  w-[120px] / width: 120px  "
//             src="/resume-ready-stack-logo.svg"
//             alt="Resume Ready Stack  "
//           />
//           <span className="navbar-brand-text  w-300px ">RESUME READY  STACK</span>
//         </a>

//         <nav className="navbar-links  " aria-label="Primary navigation">
//           {navItems.map((item) => (
//             <a key={item.href} href={item.href} className="navbar-link">
//               {item.label}
//             </a>
//           ))}
//         </nav>

//         <a className="navbar-cta" href="#pricing">
//           Get Package
//         </a>

//         <button
//           className="navbar-menu-btn"
//           type="button"
//           aria-label="Open menu"
//           aria-expanded={menuOpen}
//           onClick={() => setMenuOpen((v) => !v)}
//         >
//           <span className="navbar-menu-icon" aria-hidden="true">
//             <span />
//             <span />
//             <span />
//           </span>
//         </button>
//       </div>

//       {menuOpen && (
//         <div
//           className="navbar-mobile-overlay"
//           role="dialog"
//           aria-modal="true"
//           aria-label="Mobile menu"
//           onClick={() => setMenuOpen(false)}
//         >
//           <div className="navbar-mobile" onClick={(e) => e.stopPropagation()}>
//             <div className="navbar-mobile-header">
//               <span className="navbar-mobile-title">Menu</span>
//               <button
//                 className="navbar-mobile-close"
//                 type="button"
//                 aria-label="Close menu"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 ×
//               </button>
//             </div>

//             <div className="navbar-mobile-links">
//               {navItems.map((item) => (
//                 <a
//                   key={item.href}
//                   href={item.href}
//                   className="navbar-mobile-link"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {item.label}
//                 </a>
//               ))}
//             </div>

//             <a
//               className="navbar-mobile-cta"
//               href="#pricing"
//               onClick={() => setMenuOpen(false)}
//             >
//               Get Package
//             </a>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }

// export default Navbar





import { useEffect, useState } from 'react'
import './Navbar.css'

type NavItem = {
  label: string
  href: string
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
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
    <header className="navbar">
      <div className="container navbar-inner">
        {/* LEFT: LOGO */}
        <a className="navbar-brand" href="#home" aria-label="Go to Home">
          <img
            className="navbar-brand-logo"
            src="/resume-ready-stack-logo.svg"
            alt="Resume Ready Stack"
          />
          <span className="navbar-brand-text">RESUME READY STACK</span>
        </a>

        {/* CENTER / RIGHT: LINKS */}
        <nav className="navbar-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="navbar-link">
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a className="navbar-cta" href="#pricing">
          Get Package
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          className="navbar-menu-btn"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="navbar-menu-icon">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="navbar-mobile-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="navbar-mobile"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="navbar-mobile-header">
              <span className="navbar-mobile-title">Menu</span>
              <button
                className="navbar-mobile-close"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="navbar-mobile-links">
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
            </div>

            <a
              className="navbar-mobile-cta"
              href="#pricing"
              onClick={() => setMenuOpen(false)}
            >
              Get Package
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar