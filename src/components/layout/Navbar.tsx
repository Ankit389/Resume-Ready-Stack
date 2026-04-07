import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FileText, LogOut, ChevronDown, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Pricing',  path: '/pricing' },
  { label: 'Contact',  path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen]               = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();
  const menuRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setUserMenuOpen(false); }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled ? 'rgba(15,23,42,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {/* top gradient accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-400"
          style={{
            background: 'linear-gradient(to right, transparent, #6C63FF, #00C9A7, transparent)',
            opacity: scrolled ? 1 : 0,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)', boxShadow: '0 0 20px rgba(108,99,255,0.35)' }}
              >
                <FileText className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-white text-[15px] tracking-tight">Resume Ready</span>
                <span
                  className="text-[10px] font-bold tracking-[0.18em] uppercase"
                  style={{ background: 'linear-gradient(to right, #6C63FF, #00C9A7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  Stack
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
                  style={{ color: isActive(path) ? '#E2E8F0' : '#94A3B8' }}
                >
                  <span
                    className="absolute inset-0 rounded-lg transition-all duration-200"
                    style={{ background: isActive(path) ? 'rgba(108,99,255,0.12)' : 'transparent' }}
                  />
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      background: 'linear-gradient(to right, #6C63FF, #00C9A7)',
                      width: isActive(path) ? '18px' : '0px',
                    }}
                  />
                  <span className="relative">{label}</span>
                </Link>
              ))}
            </div>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-2.5">
              {isAuthenticated ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200"
                    style={{
                      background: 'rgba(30,41,59,0.8)',
                      borderColor: userMenuOpen ? 'rgba(108,99,255,0.5)' : 'rgba(255,255,255,0.1)',
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)' }}
                    >
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#E2E8F0' }}>{user?.name.split(' ')[0]}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} style={{ color: '#64748B' }} />
                  </button>

                  <div className={`absolute right-0 top-full mt-2 w-52 origin-top-right transition-all duration-200 ${userMenuOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                    <div className="rounded-xl overflow-hidden shadow-2xl" style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="text-xs" style={{ color: '#64748B' }}>Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5" style={{ color: '#94A3B8' }}>
                          <LayoutDashboard className="w-4 h-4" style={{ color: '#6C63FF' }} /> Dashboard
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-red-500/5 text-red-400">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/5 hover:text-white"
                    style={{ color: '#94A3B8' }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px"
                    style={{
                      background: 'linear-gradient(135deg, #6C63FF, #00C9A7)',
                      boxShadow: '0 4px 16px rgba(108,99,255,0.35)',
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
              style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <span className={`absolute transition-all duration-250 ${open ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
                <X className="w-4.5 h-4.5 text-white" />
              </span>
              <span className={`absolute transition-all duration-250 ${open ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
                <Menu className="w-4.5 h-4.5" style={{ color: '#94A3B8' }} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? '480px' : '0px', opacity: open ? 1 : 0 }}
        >
          <div
            className="px-4 pt-4 pb-6 space-y-1"
            style={{ background: 'rgba(15,23,42,0.97)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive(path) ? '#E2E8F0' : '#94A3B8',
                  background: isActive(path) ? 'rgba(108,99,255,0.12)' : 'transparent',
                  border: isActive(path) ? '1px solid rgba(108,99,255,0.2)' : '1px solid transparent',
                }}
              >
                {label}
                {isActive(path) && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(to right, #6C63FF, #00C9A7)' }} />
                )}
              </Link>
            ))}

            <div className="pt-4 mt-2 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)' }}>
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-white font-semibold">{user?.name}</p>
                      <p className="text-xs truncate" style={{ color: '#64748B' }}>{user?.email}</p>
                    </div>
                  </div>
                  <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors hover:bg-white/5" style={{ color: '#94A3B8' }}>
                    <LayoutDashboard className="w-4 h-4" style={{ color: '#6C63FF' }} /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/5 transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/5"
                    style={{ color: '#E2E8F0', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)', boxShadow: '0 4px 16px rgba(108,99,255,0.3)' }}
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16 lg:h-[68px]" />
    </>
  );
}
