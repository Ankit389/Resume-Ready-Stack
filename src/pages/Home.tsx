import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, Users, Award, TrendingUp, Briefcase, FileText, Globe, MessageSquare, ChevronDown, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

const stats = [
  { icon: Users,      value: '500+',  label: 'Clients Served' },
  { icon: TrendingUp, value: '94%',   label: 'Interview Rate' },
  { icon: Award,      value: '5+',    label: 'Years Experience' },
  { icon: Star,       value: '4.9/5', label: 'Client Rating' },
];

const services = [
  { icon: FileText,      title: 'ATS Resume Writing',   desc: 'Keyword-optimized resumes that pass ATS filters and impress hiring managers.', accent: '#6C63FF' },
  { icon: Globe,         title: 'LinkedIn Optimization', desc: 'Profile makeovers that attract recruiters and boost your visibility 10x.',       accent: '#00C9A7' },
  { icon: MessageSquare, title: 'Cover Letter Writing',  desc: 'Compelling cover letters tailored to each job opportunity.',                      accent: '#f97316' },
  { icon: Briefcase,     title: 'Career Coaching',       desc: 'End-to-end support from job search strategy to offer negotiation.',               accent: '#ec4899' },
];

const testimonials = [
  { name: 'Rahul Sharma', role: 'Software Engineer @ Google',  text: 'Got 3 interview calls within a week of updating my resume. Absolutely worth it!',     rating: 5 },
  { name: 'Priya Mehta',  role: 'Marketing Manager @ Zomato',  text: 'My LinkedIn messages tripled after the profile optimization. Amazing work!',           rating: 5 },
  { name: 'Arjun Patel',  role: 'Data Analyst @ Flipkart',     text: "Landed my dream job in 3 weeks with Purnima's help. 10/10 recommend!",                 rating: 5 },
];

const reasons = [
  'ATS Score above 90% guaranteed',
  '24-hour turnaround on most services',
  "Unlimited revisions until you're satisfied",
  'Direct WhatsApp support from expert',
  'Industry-specific keyword optimization',
];

const whyStats = [
  { value: '94%',  label: 'Get Interviews',  sub: 'within 2 weeks' },
  { value: '3x',   label: 'More Callbacks',  sub: 'than average resumes' },
  { value: '500+', label: 'Happy Clients',   sub: 'across all industries' },
  { value: '5★',   label: 'Average Rating',  sub: 'from verified clients' },
];

export default function Home() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  return (
    <div style={{ background: '#0F172A', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div className="absolute inset-0 grid-bg" />
        <div className="glow-orb" style={{ width: 480, height: 480, background: '#6C63FF', top: 40, left: '20%', opacity: 0.09 }} />
        <div className="glow-orb" style={{ width: 320, height: 320, background: '#00C9A7', bottom: 60, right: '20%', opacity: 0.07 }} />

        <div
          className="container-page"
          style={{
            position: 'relative', zIndex: 10, textAlign: 'center',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            paddingTop: 40, paddingBottom: 40,
          }}
        >
          <div className="section-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>
            <Star style={{ width: 11, height: 11 }} />
            #1 Career Profile Specialist in India
          </div>

          <h1 className="heading-xl" style={{ marginBottom: 20 }}>
            Land Your{' '}
            <span className="gradient-text">Dream Job</span>
            <br />with an ATS-Ready Resume
          </h1>

          <p className="body-lg" style={{ maxWidth: 560, margin: '0 auto 36px' }}>
            Professional resume writing, LinkedIn optimization & career coaching that gets you shortlisted.
            500+ professionals placed in top companies.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
            <Link to="/pricing">
              <Button size="lg" variant="glow">Get Started Today <ArrowRight style={{ width: 18, height: 18 }} /></Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="secondary">Explore Services</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ maxWidth: 640, margin: '0 auto' }}>
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="glass"
                style={{ padding: '20px 16px', textAlign: 'center', borderRadius: 16 }}
              >
                <Icon style={{ width: 20, height: 20, color: '#6C63FF', margin: '0 auto 8px' }} />
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>{value}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', animation: 'float 2s ease-in-out infinite' }}>
          <ChevronDown style={{ width: 24, height: 24, color: '#64748B' }} />
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section">
        <div className="container-page">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-tag" style={{ marginBottom: 14, display: 'inline-flex' }}>Our Services</div>
            <h2 className="heading-lg" style={{ marginBottom: 12 }}>
              Everything You Need to <span className="gradient-text">Get Hired</span>
            </h2>
            <p className="body-lg" style={{ maxWidth: 460, margin: '0 auto' }}>
              From resume to interview — we've got your career covered.
            </p>
          </div>

          <div className="services-grid" style={{ marginBottom: 36 }}>
            {services.map(({ icon: Icon, title, desc, accent }) => (
              <div
                key={title}
                className="glass"
                style={{
                  padding: '24px', borderRadius: 16, cursor: 'pointer',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.35)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18, background: `linear-gradient(135deg, ${accent}33, ${accent}55)`,
                  border: `1px solid ${accent}44`,
                }}>
                  <Icon style={{ width: 24, height: 24, color: accent }} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/services">
              <Button variant="outline">View All Services <ArrowRight style={{ width: 16, height: 16 }} /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb" style={{ width: 280, height: 280, background: '#6C63FF', top: 0, right: 0, opacity: 0.07 }} />
        <div className="container-page">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'center' }}>
            <div>
              <div className="section-tag" style={{ marginBottom: 14 }}>Why Choose Us</div>
              <h2 className="heading-lg" style={{ marginBottom: 16 }}>
                The <span className="gradient-text">Results</span> Speak for Themselves
              </h2>
              <p className="body-lg" style={{ marginBottom: 28 }}>
                We don't just write resumes — we craft career narratives that resonate with ATS systems and human recruiters alike.
              </p>
              <ul style={{ listStyle: 'none', marginBottom: 32 }}>
                {reasons.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <CheckCircle style={{ width: 18, height: 18, color: '#00C9A7', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: '#E2E8F0' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about">
                <Button variant="outline">Learn More About Us <ArrowRight style={{ width: 16, height: 16 }} /></Button>
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {whyStats.map(({ value, label, sub }) => (
                <div
                  key={label}
                  className="glass"
                  style={{ padding: '24px 20px', textAlign: 'center', borderRadius: 16, transition: 'transform 0.25s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  <div className="gradient-text" style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 4 }}>{value}</div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{label}</div>
                  <div style={{ color: '#64748B', fontSize: '0.78rem', marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section">
        <div className="container-page">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-tag" style={{ marginBottom: 14, display: 'inline-flex' }}>Testimonials</div>
            <h2 className="heading-lg">What Clients <span className="gradient-text">Say</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {testimonials.map(({ name, role, text, rating }) => (
              <Card key={name}>
                <CardContent style={{ padding: 24 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} style={{ width: 15, height: 15, fill: '#fbbf24', color: '#fbbf24' }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: 20 }}>"{text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                      background: 'linear-gradient(135deg, #6C63FF, #00C9A7)',
                    }}>
                      {name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>{name}</div>
                      <div style={{ color: '#64748B', fontSize: '0.78rem' }}>{role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container-narrow">
          <div
            style={{
              background: '#1E293B', borderRadius: 24, padding: '60px 40px',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
              border: '1.5px solid rgba(108,99,255,0.3)',
            }}
          >
            <div className="glow-orb" style={{ width: 280, height: 280, background: '#6C63FF', top: -80, left: '50%', transform: 'translateX(-50%)', opacity: 0.14 }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <Badge variant="glow" style={{ marginBottom: 20 }}>
                <Zap style={{ width: 12, height: 12 }} /> Limited Slots Available
              </Badge>
              <h2 className="heading-lg" style={{ marginBottom: 14 }}>Ready to Transform Your Career?</h2>
              <p className="body-lg" style={{ maxWidth: 460, margin: '0 auto 32px' }}>
                Book your free resume audit today and take the first step toward your dream job.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/pricing">
                  <Button size="lg" variant="glow">Get Started <ArrowRight style={{ width: 16, height: 16 }} /></Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="secondary">Book Free Consultation</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
