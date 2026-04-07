import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Briefcase, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className="min-h-screen bg-[#060612] flex items-center justify-center p-4 pt-20">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="glow-orb w-80 h-80 bg-purple-600 top-20 left-1/4 opacity-15" />
      <div className="glow-orb w-60 h-60 bg-pink-600 bottom-20 right-1/4 opacity-10" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to your account</p>
        </div>

        <div className="glass rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10"
                  value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input id="password" type={showPass ? 'text' : 'password'} placeholder="Enter your password" className="pl-10 pr-10"
                  value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing In...</span> : <span className="flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4" /></span>}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">Create one free</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          By signing in, you agree to our{' '}
          <span className="text-purple-400 cursor-pointer">Terms of Service</span> and{' '}
          <span className="text-purple-400 cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
