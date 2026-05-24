import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CreditCard, Shield, User, Mail, Phone, Building, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { paymentAPI } from '../lib/api';
import { formatPrice } from '../lib/utils';

declare global { interface Window { Razorpay: any; } }

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const params = new URLSearchParams(location.search);
  const planName = params.get('plan') || localStorage.getItem('selectedPlan') || 'Test Payment';
  const planPrice = parseInt(params.get('price') || localStorage.getItem('planPrice') || '2');
  const planId = params.get('id') || '0';

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: '',
    template: params.get('template') || '',
    agreed: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name is required';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Valid 10-digit phone required';
    if (!form.agreed) e.agreed = 'Please agree to the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const loadScript = () => new Promise<boolean>((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

  const handlePayment = async () => {
    if (!validate()) return;
    setError('');
    setLoading(true);

    if (planPrice === 0) {
      // Free plan - redirect to contact
      navigate('/contact?service=' + encodeURIComponent(planName));
      return;
    }

    const loaded = await loadScript();
    if (!loaded) {
      setError('Could not load payment system. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const orderResponse = await paymentAPI.createOrder({
        planName,
        planId,
        amount: planPrice,
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        notes: {
          plan: planName,
          company: form.company,
          template: form.template,
        },
      });

      const orderData = orderResponse.data?.data;
      if (!orderData || !orderData.razorpayOrderId) {
        throw new Error('Unable to create payment order.');
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Purnima Career Studio',
        description: `${planName} — Professional Career Service`,
        image: '/resume-ready-stack-logo.svg',
        order_id: orderData.razorpayOrderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: { plan: planName, company: form.company },
        theme: { color: '#8b5cf6' },
        modal: {
          ondismiss: () => setLoading(false),
          escape: true,
          confirm_close: true,
        },
        handler: async (response: any) => {
          try {
            await paymentAPI.verifyPayment({
              orderId: orderData.orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              customerName: form.name,
              customerEmail: form.email,
              customerPhone: form.phone,
            });

            setPaymentId(response.razorpay_payment_id);
            setSuccess(true);
          } catch (verifyError: any) {
            setError(verifyError?.response?.data?.message || 'Payment verification failed.');
          } finally {
            setLoading(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (r: any) => {
        setError(`Payment failed: ${r.error?.description || r.error?.reason || 'Please try again.'}`);
        setLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Unable to start payment. Please try again.');
      setLoading(false);
    }
  };

  if (success) return (
    <div className="flex items-center justify-center p-4 py-16">
      <div className="glass rounded-3xl p-10 max-w-md text-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-black text-white mb-3">Payment Successful! 🎉</h1>
        <p className="text-slate-400 mb-2">Thank you for choosing Purnima Career Studio.</p>
        {paymentId && <p className="text-xs text-slate-500 mb-6">Payment ID: {paymentId}</p>}
        <p className="text-slate-300 text-sm mb-8">We'll contact you within 24 hours to get started on your <strong className="text-purple-400">{planName}</strong>.</p>
        <div className="flex flex-col gap-3">
          <Button asChild className="w-full" variant="glow">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild className="w-full" variant="secondary">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/pricing" className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Pricing
        </Link>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-8">
              <h1 className="text-2xl font-black text-white mb-6">Complete Your Order</h1>

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input placeholder="Your full name" className={`pl-10 ${errors.name ? 'ring-1 ring-red-500' : ''}`}
                      value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label>Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input type="email" placeholder="you@email.com" className={`pl-10 ${errors.email ? 'ring-1 ring-red-500' : ''}`}
                      value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label>Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input type="tel" placeholder="98765 43210" className={`pl-10 ${errors.phone ? 'ring-1 ring-red-500' : ''}`}
                      value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label>Company (Optional)</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input placeholder="Your company" className="pl-10"
                      value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Preferred Template</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <select
                      className="flex h-[44px] w-full rounded-xl border border-white/10 bg-[#1E293B] pl-10 pr-4 text-[15px] text-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/60 transition-all hover:border-white/20 appearance-none cursor-pointer"
                      value={form.template}
                      onChange={e => setForm(p => ({ ...p, template: e.target.value }))}
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                    >
                      <option value="">Let our experts decide</option>
                      <option value="Classic Professional">Classic Professional</option>
                      <option value="Modern Creative">Modern Creative</option>
                      <option value="Prime ATS">Prime ATS</option>
                      <option value="Executive Leader">Executive Leader</option>
                    </select>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">You can change your mind later when we contact you.</p>
                </div>
              </div>

              <div className="mt-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.agreed} onChange={e => setForm(p => ({ ...p, agreed: e.target.checked }))}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 accent-purple-500" />
                  <span className="text-sm text-slate-400">
                    I agree to the <span className="text-purple-400 cursor-pointer">Terms of Service</span> and <span className="text-purple-400 cursor-pointer">Privacy Policy</span>. I understand that the service will be delivered within the stated timeframe.
                  </span>
                </label>
                {errors.agreed && <p className="text-red-400 text-xs mt-1">{errors.agreed}</p>}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-white mb-5">Order Summary</h2>
              <div className="bg-white/5 rounded-xl p-4 mb-5">
                <div className="text-purple-400 text-sm font-semibold mb-1">Selected Plan</div>
                <div className="text-white font-bold text-lg">{planName}</div>
              </div>

              <div className="space-y-2 mb-5 text-sm">
                <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>{formatPrice(planPrice)}</span></div>
                <div className="flex justify-between text-slate-400"><span>GST</span><span>Included</span></div>
                <div className="border-t border-white/10 pt-2 flex justify-between text-white font-bold text-base">
                  <span>Total</span><span className="gradient-text text-xl">{formatPrice(planPrice)}</span>
                </div>
              </div>

              <Button className="w-full mb-4" size="lg" variant="glow" onClick={handlePayment} disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</span>
                ) : planPrice === 0 ? (
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />Get Free Service</span>
                ) : (
                  <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" />Pay {formatPrice(planPrice)}</span>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> SSL Secured • Razorpay Protected
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                {['No hidden charges', '100% money-back guarantee', 'Unlimited revisions on top plans'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
