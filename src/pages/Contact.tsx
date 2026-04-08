import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, AlertCircle, Share2, Globe, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { contactAPI } from '../lib/api';

const contactInfo = [
  { icon: Mail,   label: 'Email',           value: 'technicalpurnima123@oksbi.com', href: 'mailto:technicalpurnima123@oksbi.com' },
  { icon: Phone,  label: 'WhatsApp / Call', value: '+91 98765 43210',               href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Location',        value: 'India (Remote Services Worldwide)', href: null },
  { icon: Clock,  label: 'Working Hours',   value: 'Mon–Sat: 9AM – 7PM IST',       href: null },
];

const services = [
  'ATS Resume Writing', 'LinkedIn Optimization', 'Cover Letter',
  'Interview Preparation', 'Complete Career Package', 'Job Search Strategy', 'Other',
];

const CARD: React.CSSProperties = {
  background: '#1E293B',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
};

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);
  const [error, setError]   = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())                                               e.name    = 'Name is required';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email   = 'Valid email required';
    if (!form.message.trim() || form.message.trim().length < 10)        e.message = 'Message must be at least 10 characters';
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
      setError(err.response?.data?.message || 'Failed to send. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ background: '#0F172A', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: 72, paddingBottom: 48, overflow: 'hidden' }}>
        <div className="glow-orb" style={{ width: 320, height: 320, background: '#6C63FF', top: -60, right: 0, opacity: 0.07 }} />
        <div className="container-page" style={{ textAlign: 'center' }}>
          <div className="section-tag" style={{ marginBottom: 14, display: 'inline-flex' }}>Get In Touch</div>
          <h1 className="heading-xl" style={{ marginBottom: 14 }}>
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="body-lg" style={{ maxWidth: 460, margin: '0 auto' }}>
            Have a question or ready to get started? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ paddingBottom: 96 }}>
        <div className="container-page">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>

            {/* Left Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Contact Info */}
              <div style={{ ...CARD, padding: 24 }}>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 20 }}>Contact Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.25)',
                      }}>
                        <Icon style={{ width: 16, height: 16, color: '#6C63FF' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: 2 }}>{label}</div>
                        {href
                          ? <a href={href} style={{ fontSize: '0.875rem', color: '#E2E8F0' }}>{value}</a>
                          : <span style={{ fontSize: '0.875rem', color: '#E2E8F0' }}>{value}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <div style={{ ...CARD, padding: 24 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>Quick WhatsApp</h3>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: 16, lineHeight: 1.6 }}>
                  Prefer chatting? Send us a message for instant response.
                </p>
                <a href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20my%20resume" target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                  <Button className="w-full" variant="outline">
                    <MessageSquare style={{ width: 16, height: 16 }} /> WhatsApp Us
                  </Button>
                </a>
              </div>

              {/* Social */}
              <div style={{ ...CARD, padding: 24 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 14 }}>Follow Us</h3>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[Share2, Globe].map((Icon, i) => (
                    <button
                      key={i}
                      style={{
                        width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)', color: '#6C63FF', cursor: 'pointer',
                      }}
                    >
                      <Icon style={{ width: 16, height: 16 }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={{ ...CARD, padding: 32 }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px', background: 'rgba(0,201,167,0.15)',
                  }}>
                    <CheckCircle style={{ width: 32, height: 32, color: '#00C9A7' }} />
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: 8 }}>Message Sent!</h2>
                  <p style={{ color: '#94A3B8', marginBottom: 24 }}>We'll get back to you within 24 hours.</p>
                  <Button onClick={() => setSent(false)} variant="outline">Send Another Message</Button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>Send a Message</h2>

                  {error && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', marginBottom: 20,
                      background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: 10, fontSize: '0.875rem', color: '#f87171',
                    }}>
                      <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} /> {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
                      <div>
                        <Label style={{ display: 'block', marginBottom: 6 }}>Full Name *</Label>
                        <Input
                          placeholder="Your name"
                          value={form.name}
                          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          style={errors.name ? { borderColor: 'rgba(239,68,68,0.6)' } : {}}
                        />
                        {errors.name && <p style={{ fontSize: '0.78rem', color: '#f87171', marginTop: 4 }}>{errors.name}</p>}
                      </div>
                      <div>
                        <Label style={{ display: 'block', marginBottom: 6 }}>Email Address *</Label>
                        <Input
                          type="email" placeholder="you@email.com"
                          value={form.email}
                          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                          style={errors.email ? { borderColor: 'rgba(239,68,68,0.6)' } : {}}
                        />
                        {errors.email && <p style={{ fontSize: '0.78rem', color: '#f87171', marginTop: 4 }}>{errors.email}</p>}
                      </div>
                      <div>
                        <Label style={{ display: 'block', marginBottom: 6 }}>Phone <span style={{ color: '#64748B' }}>(Optional)</span></Label>
                        <Input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                      </div>
                      <div>
                        <Label style={{ display: 'block', marginBottom: 6 }}>Service Interested In</Label>
                        <select
                          value={form.service}
                          onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                          style={{
                            width: '100%', height: 44, padding: '0 14px', borderRadius: 12,
                            background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)',
                            color: form.service ? '#E2E8F0' : '#64748B', fontSize: '0.875rem',
                          }}
                        >
                          <option value="" style={{ background: '#1E293B', color: '#64748B' }}>Select a service...</option>
                          {services.map(s => <option key={s} value={s} style={{ background: '#1E293B' }}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <Label style={{ display: 'block', marginBottom: 6 }}>Message *</Label>
                      <textarea
                        rows={5} placeholder="Tell us about yourself and what you're looking for..."
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        style={{
                          width: '100%', padding: '12px 14px', borderRadius: 12, resize: 'vertical',
                          background: '#1E293B', fontSize: '0.875rem', color: '#E2E8F0', lineHeight: 1.6,
                          border: errors.message ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.1)',
                        }}
                      />
                      {errors.message && <p style={{ fontSize: '0.78rem', color: '#f87171', marginTop: 4 }}>{errors.message}</p>}
                    </div>

                    <Button type="submit" size="lg" className="w-full" variant="glow" disabled={loading}>
                      {loading
                        ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                            Sending...
                          </span>
                        : <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Send style={{ width: 16, height: 16 }} /> Send Message
                          </span>}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
