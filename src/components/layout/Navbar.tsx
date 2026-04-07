import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase, User, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#060612]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm leading-tight block">Purnima Career</span>
              <span className="text-purple-400 text-xs leading-tight block">Studio</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === path
                    ? 'text-white bg-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-slate-300">{user?.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 glass rounded-xl shadow-2xl border border-white/10 py-1 z-50">
                    <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
                <Link to="/signup"><Button size="sm">Get Started</Button></Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#060612]/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(({ label, path }) => (
              <Link key={path} to={path} className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === path ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                {label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/5 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login"><Button variant="outline" className="w-full">Sign In</Button></Link>
                  <Link to="/signup"><Button className="w-full">Get Started</Button></Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
