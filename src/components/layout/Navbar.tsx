import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FileText, User, LogOut, ChevronDown, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#07071a]/80 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(139,92,246,0.15),0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        {/* Top gradient border line */}
        <div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/40 group-hover:shadow-purple-500/70 group-hover:scale-105 transition-all duration-300">
                <FileText className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-white text-[15px] tracking-tight group-hover:text-purple-100 transition-colors duration-200">
                  Resume Ready
                </span>
                <span className="text-[11px] font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-widest uppercase">
                  Stack
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive(path)
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {/* Background hover fill */}
                  <span
                    className={`absolute inset-0 rounded-lg transition-all duration-200 ${
                      isActive(path)
                        ? 'bg-white/10'
                        : 'bg-transparent group-hover:bg-white/5'
                    }`}
                  />
                  {/* Active bottom bar */}
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
                      isActive(path) ? 'w-4 opacity-100' : 'w-0 opacity-0 group-hover:w-3 group-hover:opacity-60'
                    }`}
                  />
                  <span className="relative">{label}</span>
                </Link>
              ))}
            </div>

            {/* ── Desktop Auth ── */}
            <div className="hidden md:flex items-center gap-2.5">
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/40 transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-slate-300 font-medium">{user?.name.split(' ')[0]}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute right-0 top-full mt-2 w-52 origin-top-right transition-all duration-200 ${
                      userMenuOpen
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <div className="bg-[#0e0e2a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl shadow-black/60 overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-xs text-slate-500">Signed in as</p>
                        <p className="text-sm text-white font-semibold truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-purple-400" />
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-px transition-all duration-200"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200"
            >
              <span
                className={`absolute transition-all duration-300 ${open ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
              >
                <X className="w-4.5 h-4.5 text-white" />
              </span>
              <span
                className={`absolute transition-all duration-300 ${open ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}
              >
                <Menu className="w-4.5 h-4.5 text-slate-300" />
              </span>
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-white/8 bg-[#07071a]/95 backdrop-blur-2xl px-4 pt-4 pb-6 space-y-1">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(path)
                    ? 'text-white bg-white/10 border border-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {label}
                {isActive(path) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                )}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-white/8 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-white font-semibold">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 border border-transparent transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-purple-400" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/5 border border-transparent transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-3 rounded-xl text-sm font-medium text-slate-300 border border-white/10 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-lg shadow-purple-500/30 transition-all duration-200"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 lg:h-[68px]" />
    </>
  );
}
