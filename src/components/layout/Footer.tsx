import { Link } from 'react-router-dom';
import { FileText, Mail, Phone, MapPin, Share2, Globe, ExternalLink } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'ATS Resume Writing',    path: '/services' },
    { label: 'LinkedIn Optimization', path: '/services' },
    { label: 'Cover Letter',          path: '/services' },
    { label: 'Interview Prep',        path: '/services' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Pricing',  path: '/pricing' },
    { label: 'Contact',  path: '/contact' },
  ],
  Account: [
    { label: 'Sign Up',   path: '/signup' },
    { label: 'Login',     path: '/login' },
    { label: 'Dashboard', path: '/dashboard' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#0A1120', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="container-page" style={{ paddingTop: 64, paddingBottom: 32 }}>

        {/* Top grid */}
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16, textDecoration: 'none' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #6C63FF, #00C9A7)', boxShadow: '0 0 20px rgba(108,99,255,0.3)',
              }}>
                <FileText style={{ width: 20, height: 20, color: '#fff' }} />
              </div>
              <div>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', display: 'block', lineHeight: 1.2 }}>Resume Ready Stack</span>
                <span style={{ fontSize: '0.72rem', color: '#6C63FF' }}>Career Profile Specialist</span>
              </div>
            </Link>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.7, marginBottom: 20, maxWidth: 260 }}>
              Helping professionals land their dream jobs with ATS-optimized resumes, LinkedIn profiles, and career coaching.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: Mail,   text: 'resumereadystack@gmail.com', href: 'mailto:resumereadystack@gmail.com' },
                { icon: Phone,  text: '+91 98765 43210',               href: 'tel:+919876543210' },
                { icon: MapPin, text: 'India (Remote Services)',        href: null },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon style={{ width: 14, height: 14, color: '#64748B', flexShrink: 0 }} />
                  {href
                    ? <a href={href} style={{ fontSize: '0.82rem', color: '#64748B', textDecoration: 'none' }}>{text}</a>
                    : <span style={{ fontSize: '0.82rem', color: '#64748B' }}>{text}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginBottom: 18, letterSpacing: '0.02em' }}>{heading}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#6C63FF'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#64748B'; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: 24 }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <p style={{ fontSize: '0.82rem', color: '#475569' }}>
            © 2024 Resume Ready Stack. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {[Share2, Globe, ExternalLink].map((Icon, i) => (
              <button
                key={i}
                style={{
                  width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#64748B', cursor: 'pointer', transition: 'color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#6C63FF'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#64748B'; }}
              >
                <Icon style={{ width: 15, height: 15 }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
