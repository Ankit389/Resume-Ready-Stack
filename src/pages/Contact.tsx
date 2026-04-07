import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, AlertCircle, Share2, Globe, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { contactAPI } from '../lib/api';

const contactInfo = [
  { icon: Mail,    label: 'Email',               value: 'technicalpurnima123@oksbi.com', href: 'mailto:technicalpurnima123@oksbi.com' },
  { icon: Phone,   label: 'WhatsApp / Call',      value: '+91 98765 43210',               href: 'tel:+919876543210' },
  { icon: MapPin,  label: 'Location',             value: 'India (Remote Services Worldwide)', href: null },
  { icon: Clock,   label: 'Working Hours',        value: 'Mon–Sat: 9AM – 7PM IST',       href: null },
];

const services = [
  'ATS Resume Writing', 'LinkedIn Optimization', 'Cover Letter',
  'Interview Preparation', 'Complete Career Package', 'Job Search Strategy', 'Other',
];

const BOX = { background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px' };

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);
  const [error, setError]   = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())                                         e.name    = 'Name is required';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim() || form.message.trim().length < 10)  e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setError(''); setLoading(true);
    try {
      await contactAPI.send(form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen" style={{ background: '#0F172A' }}>

      {/* Hero */}
      <section className="relative py-20">
        <div className="glow-orb w-80 h-80 bg-[#6C63FF] top-0 right-0" style={{ opacity: 0.07 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-tag mx-auto w-fit mb-4">Get In Touch</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="max-w-lg mx-auto text-lg" style={{ color: '#94A3B8' }}>
            Have a question or ready to get started? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">
              {/* Contact info */}
              <div className="p-6" style={BOX}>
                <h2 className="text-lg font-bold text-white mb-5">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.25)' }}
                      >
                        <Icon className="w-4 h-4" style={{ color: '#6C63FF' }} />
                      </div>
                      <div>
                        <div className="text-xs mb-0.5" style={{ color: '#64748B' }}>{label}</div>
                        {href
                          ? <a href={href} className="text-sm transition-colors hover:opacity-80" style={{ color: '#E2E8F0' }}>{value}</a>
                          : <span className="text-sm" style={{ color: '#E2E8F0' }}>{value}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <div className="p-6" style={BOX}>
                <h3 className="text-white font-bold mb-2">Quick WhatsApp</h3>
                <p className="text-sm mb-4" style={{ color: '#94A3B8' }}>Prefer chatting? Send us a message for instant response.</p>
                <a href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20my%20resume" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="w-4 h-4" /> WhatsApp Us
                  </Button>
                </a>
              </div>

              {/* Social */}
              <div className="p-6" style={BOX}>
                <h3 className="text-white font-bold mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {[Share2, Globe].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                      style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)', color: '#6C63FF' }}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="p-8" style={BOX}>
                {sent ? (
                  <div className="text-center py-12">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'rgba(0,201,167,0.15)' }}
                    >
                      <CheckCircle className="w-8 h-8" style={{ color: '#00C9A7' }} />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">Message Sent!</h2>
                    <p className="mb-6" style={{ color: '#94A3B8' }}>We'll get back to you within 24 hours.</p>
                    <Button onClick={() => setSent(false)} variant="outline">Send Another Message</Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
                    {error && (
                      <div
                        className="flex items-center gap-2 rounded-xl p-3 mb-5 text-sm"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}
                      >
                        <AlertCircle className="w-4 h-4" /> {error}
                      </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label>Full Name *</Label>
                          <Input placeholder="Your name" value={form.name}
                            className={errors.name ? 'ring-1 ring-red-500' : ''}
                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                          {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <Label>Email Address *</Label>
                          <Input type="email" placeholder="you@email.com" value={form.email}
                            className={errors.email ? 'ring-1 ring-red-500' : ''}
                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <Label>Phone <span style={{ color: '#64748B' }}>(Optional)</span></Label>
                          <Input type="tel" placeholder="+91 98765 43210" value={form.phone}
                            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Service Interested In</Label>
                          <select
                            className="flex h-11 w-full rounded-xl px-4 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                            style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0', focusRing: '#6C63FF' } as any}
                            value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                          >
                            <option value="" style={{ background: '#1E293B' }}>Select a service...</option>
                            {services.map(s => <option key={s} value={s} style={{ background: '#1E293B' }}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Message *</Label>
                        <textarea
                          rows={5}
                          placeholder="Tell us about yourself and what you're looking for..."
                          className="flex w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 resize-none"
                          style={{
                            background: '#1E293B', border: errors.message ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.1)',
                            color: '#E2E8F0', outline: 'none',
                          } as any}
                          value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        />
                        {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                      </div>
                      <Button type="submit" size="lg" className="w-full" variant="glow" disabled={loading}>
                        {loading
                          ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</span>
                          : <span className="flex items-center gap-2"><Send className="w-4 h-4" />Send Message</span>}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
