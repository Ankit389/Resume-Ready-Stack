import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Eye, EyeOff, Briefcase, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated]);

  const validate = () => {
    if (!form.name.trim() || form.name.trim().length < 2) return 'Name must be at least 2 characters';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Enter a valid email address';
    if (form.password.length < 6) return 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password, form.phone);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'][passwordStrength];
  const strengthColor = ['', 'bg-red-500', 'bg-amber-500', 'bg-emerald-500'][passwordStrength];

  return (
    <div className="min-h-screen bg-[#060612] flex items-center justify-center p-4 pt-20">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="glow-orb w-80 h-80 bg-purple-600 top-20 right-1/4 opacity-15" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Start your career transformation today</p>
        </div>

        <div className="glass rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input id="name" placeholder="Rahul Sharma" className="pl-10"
                  value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10"
                  value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input id="phone" type="tel" placeholder="+91 98765 43210" className="pl-10"
                  value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input id="password" type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters" className="pl-10 pr-10"
                  value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength ? strengthColor : 'bg-white/10'}`} />)}
                  </div>
                  <span className="text-xs text-slate-400">{strengthLabel}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input id="confirmPassword" type="password" placeholder="Repeat password" className="pl-10"
                  value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))} />
                {form.confirmPassword && form.password === form.confirmPassword && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                )}
              </div>
            </div>

            <Button type="submit" className="w-full mt-2" size="lg" disabled={loading}>
              {loading ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating Account...</span> : <span className="flex items-center gap-2">Create Account <ArrowRight className="w-4 h-4" /></span>}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
