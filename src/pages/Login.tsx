import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, FileText, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden pt-20"
    >
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium z-20 transition-colors" style={{ color: '#94A3B8' }} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}>
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      {/* Background */}
      <div className="absolute inset-0 grid-bg" style={{ opacity: 0.4 }} />
      <div className="glow-orb w-80 h-80 bg-[#6C63FF] top-20 left-1/4" style={{ opacity: 0.1 }} />
      <div className="glow-orb w-60 h-60 bg-[#00C9A7] bottom-20 right-1/4" style={{ opacity: 0.07 }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex justify-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)', boxShadow: '0 0 24px rgba(108,99,255,0.4)' }}
            >
              <FileText className="w-7 h-7 text-white" />
            </div>
          </Link>
          <h1 className="text-4xl font-black text-white mt-6 mb-2">Welcome Back</h1>
          <p style={{ color: '#94A3B8' }} className="text-sm">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-3xl p-8 shadow-2xl"
          style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {error && (
            <div
              className="flex items-center gap-3 rounded-lg p-4 mb-6 text-sm"
              style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5' }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-white font-medium text-sm">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748B' }} />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-12 h-11 w-full rounded-lg"
                  style={{
                    background: '#0F172A',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#E2E8F0'
                  }}
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-white font-medium text-sm">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748B' }} />
                <Input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-12 pr-12 h-11 w-full rounded-lg"
                  style={{
                    background: '#0F172A',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#E2E8F0'
                  }}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:opacity-80"
                  style={{ color: '#64748B' }}
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-11 mt-8 font-semibold text-base rounded-lg"
              size="lg"
              variant="glow"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-7 pt-7" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-center text-sm text-center" style={{ color: '#CBD5E1' }}>
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold transition-all hover:text-white"
                style={{ color: '#60A5FA' }}
              >
                Create one free
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-8 px-4" style={{ color: '#64748B' }}>
          By signing in, you agree to our{' '}
          <span className="cursor-pointer hover:underline transition-colors" style={{ color: '#60A5FA' }}>
            Terms of Service
          </span>
          {' '}and{' '}
          <span className="cursor-pointer hover:underline transition-colors" style={{ color: '#60A5FA' }}>
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}
