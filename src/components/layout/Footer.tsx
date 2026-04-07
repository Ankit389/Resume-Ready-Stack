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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 w-fit">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)', boxShadow: '0 0 20px rgba(108,99,255,0.3)' }}
              >
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-[15px] leading-tight block">Resume Ready Stack</span>
                <span className="text-xs" style={{ color: '#6C63FF' }}>Career Profile Specialist</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: '#64748B' }}>
              Helping professionals land their dream jobs with ATS-optimized resumes, LinkedIn profiles, and career coaching.
            </p>
            <div className="space-y-3">
              <a href="mailto:technicalpurnima123@oksbi.com" className="flex items-center gap-2.5 text-sm transition-colors group" style={{ color: '#64748B' }}>
                <Mail className="w-4 h-4 flex-shrink-0 group-hover:text-[#6C63FF] transition-colors" />
                <span className="group-hover:text-[#E2E8F0] transition-colors">technicalpurnima123@oksbi.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2.5 text-sm transition-colors group" style={{ color: '#64748B' }}>
                <Phone className="w-4 h-4 flex-shrink-0 group-hover:text-[#6C63FF] transition-colors" />
                <span className="group-hover:text-[#E2E8F0] transition-colors">+91 98765 43210</span>
              </a>
              <span className="flex items-center gap-2.5 text-sm" style={{ color: '#64748B' }}>
                <MapPin className="w-4 h-4 flex-shrink-0" /> India (Remote Services)
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold mb-5 text-sm tracking-wide">{heading}</h4>
              <ul className="space-y-3">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-sm transition-colors hover:text-[#6C63FF]"
                      style={{ color: '#64748B' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: '#475569' }}>
            © 2024 Resume Ready Stack. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5">
            {[Share2, Globe, ExternalLink].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(30,41,59,0.8)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#64748B',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#6C63FF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
