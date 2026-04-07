import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, FileText, ArrowRight, AlertCircle } from 'lucide-react';
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
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: '#0F172A' }}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg" style={{ opacity: 0.4 }} />
      <div className="glow-orb w-80 h-80 bg-[#6C63FF] top-20 left-1/4" style={{ opacity: 0.1 }} />
      <div className="glow-orb w-60 h-60 bg-[#00C9A7] bottom-20 right-1/4" style={{ opacity: 0.07 }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-2 mb-2">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)', boxShadow: '0 0 24px rgba(108,99,255,0.4)' }}
            >
              <FileText className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-black text-white mt-4 mb-1">Welcome Back</h1>
          <p style={{ color: '#94A3B8' }}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 shadow-2xl"
          style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {error && (
            <div
              className="flex items-center gap-2 rounded-xl p-3 mb-6 text-sm"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#64748B' }} />
                <Input
                  id="email" type="email" placeholder="you@example.com" className="pl-10"
                  value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#64748B' }} />
                <Input
                  id="password" type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password" className="pl-10 pr-10"
                  value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                />
                <button
                  type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: '#64748B' }}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" variant="glow" disabled={loading}>
              {loading
                ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing In...</span>
                : <span className="flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4" /></span>}
            </Button>
          </form>

          <div className="mt-6 pt-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-sm" style={{ color: '#94A3B8' }}>
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold transition-colors hover:opacity-80" style={{ color: '#6C63FF' }}>
                Create one free
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#475569' }}>
          By signing in, you agree to our{' '}
          <span className="cursor-pointer hover:underline" style={{ color: '#6C63FF' }}>Terms of Service</span>
          {' '}and{' '}
          <span className="cursor-pointer hover:underline" style={{ color: '#6C63FF' }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
