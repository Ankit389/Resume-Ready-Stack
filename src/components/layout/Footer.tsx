import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin, Share2, Globe, ExternalLink } from 'lucide-react';
import { Separator } from '../ui/separator';

const footerLinks = {
  Services: [
    { label: 'ATS Resume Writing', path: '/services' },
    { label: 'LinkedIn Optimization', path: '/services' },
    { label: 'Cover Letter', path: '/services' },
    { label: 'Interview Prep', path: '/services' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ],
  Account: [
    { label: 'Sign Up', path: '/signup' },
    { label: 'Login', path: '/login' },
    { label: 'Dashboard', path: '/dashboard' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#060612]">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-white leading-tight block">Purnima Career Studio</span>
                <span className="text-purple-400 text-xs">Resume & Career Specialist</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Helping professionals land their dream jobs with ATS-optimized resumes, LinkedIn profiles, and career coaching.
            </p>
            <div className="space-y-2">
              <a href="mailto:technicalpurnima123@oksbi.com" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-purple-400 transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" /> technicalpurnima123@oksbi.com
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-purple-400 transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" /> +91 98765 43210
              </a>
              <span className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 flex-shrink-0" /> India (Remote Services)
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link to={path} className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2024 Purnima Career Studio. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[Share2, Globe, ExternalLink].map((Icon, i) => (
              <button key={i} className="w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
