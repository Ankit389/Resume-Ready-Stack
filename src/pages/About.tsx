import { Link } from 'react-router-dom';
import { Award, CheckCircle, Heart, Target, Users, ArrowRight, Globe, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

const milestones = [
  { year: '2020', title: 'Started Career Coaching',  desc: 'Began helping freshers with resume writing while working in HR.' },
  { year: '2021', title: 'First 100 Clients',        desc: 'Reached 100 satisfied clients during the pandemic job market surge.' },
  { year: '2022', title: 'Resume Ready Stack',       desc: 'Launched dedicated platform offering full career profile services.' },
  { year: '2024', title: 'CEO & Founder',            desc: 'Leading a team to help professionals land jobs at top companies.' },
];

const values = [
  { icon: Heart,  title: 'Client First',           desc: 'Every decision we make is centered around your career success.' },
  { icon: Target, title: 'Results Driven',          desc: 'We measure our success by your interview calls and job offers.' },
  { icon: Award,  title: 'Quality Work',            desc: 'No templates. Every resume is handcrafted for your unique story.' },
  { icon: Users,  title: 'Long-term Relationship',  desc: 'We support you beyond the resume, for your entire career journey.' },
];

const skills = [
  { skill: 'ATS Resume Optimization',   level: 98 },
  { skill: 'LinkedIn Profile Building',  level: 95 },
  { skill: 'Cover Letter Writing',       level: 90 },
  { skill: 'Interview Coaching',         level: 88 },
  { skill: 'Job Search Strategy',        level: 92 },
  { skill: 'Personal Branding',          level: 87 },
];

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(0,0,0,0.06)',
  borderRadius: 16,
  boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
};

export default function About() {
  return (
    <div style={{ background: '#F8FAFC', color: '#0F172A', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb" style={{ width: 360, height: 360, background: '#6C63FF', top: -60, right: 0, opacity: 0.05 }} />
        <div className="container-page">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, alignItems: 'center' }}>
            {/* Text Content */}
            <div className="animate-fade-in-up" style={{ maxWidth: 640 }}>
              <div className="section-tag" style={{ marginBottom: 14, background: 'rgba(108,99,255,0.1)', color: '#6C63FF' }}>About Us</div>
              <h1 className="heading-xl" style={{ marginBottom: 18, color: '#0F172A' }}>
                Meet <span className="gradient-text">Purnima Rani</span>
                <br />Your Career Growth Partner
              </h1>
              <p className="body-lg" style={{ marginBottom: 16, color: '#475569' }}>
                With 4 years of experience in HR and career consulting, I lead Resume Ready Stack as its CEO. I specialize in crafting ATS-optimized resumes and LinkedIn profiles that get professionals noticed by top employers across India.
              </p>
              <p className="body-lg" style={{ marginBottom: 32, color: '#475569' }}>
                I've helped freshers, mid-level professionals, and senior executives find their dream jobs with a deeply personal approach.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Button asChild size="lg" variant="glow">
                  <Link to="/contact">Work With Me <ArrowRight style={{ width: 17, height: 17, marginLeft: 4 }} /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" style={{ borderColor: '#CBD5E1', color: '#0F172A', background: 'transparent' }}>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Globe style={{ width: 16, height: 16, marginRight: 6 }} /> LinkedIn</a>
                </Button>
              </div>
            </div>

            {/* Profile Card + Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, alignItems: 'start' }}>
              <div style={{
                ...CARD, borderRadius: 24, overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 48,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                  <img 
                    src="/purnima-ceo.png" 
                    alt="Purnima Rani" 
                    style={{
                      width: 120, height: 120, borderRadius: '50%', objectFit: 'cover',
                      border: '4px solid #fff', boxShadow: '0 8px 24px rgba(108,99,255,0.2)'
                    }} 
                  />
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#0F172A', fontSize: '1.25rem', fontWeight: 800 }}>Purnima Rani</p>
                    <p style={{ color: '#6C63FF', fontSize: '0.9rem', fontWeight: 600 }}>CEO & Founder</p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ ...CARD, border: '1px solid rgba(108,99,255,0.2)', padding: 20, borderRadius: 16, textAlign: 'center' }}>
                  <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 900 }}>500+</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Happy Clients</div>
                </div>
                <div style={{ ...CARD, border: '1px solid rgba(0,201,167,0.2)', padding: 20, borderRadius: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#00C9A7' }}>94%</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Interview Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-page">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-tag" style={{ marginBottom: 14, display: 'inline-flex', background: 'rgba(108,99,255,0.1)', color: '#6C63FF', border: 'none' }}>My Values</div>
            <h2 className="heading-lg" style={{ color: '#0F172A' }}>What Drives <span className="gradient-text">My Work</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ ...CARD, padding: 24, textAlign: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,201,167,0.1))',
                  border: '1px solid rgba(108,99,255,0.2)',
                }}>
                  <Icon style={{ width: 22, height: 22, color: '#6C63FF' }} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: '#ffffff', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-tag" style={{ marginBottom: 14, display: 'inline-flex', background: 'rgba(108,99,255,0.1)', color: '#6C63FF', border: 'none' }}>Journey</div>
            <h2 className="heading-lg" style={{ color: '#0F172A' }}>My <span className="gradient-text">Career Story</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {milestones.map(({ year, title, desc }, i) => (
              <div key={year} className="animate-fade-in-up" style={{ display: 'flex', gap: 20, alignItems: 'flex-start', animationDelay: `${i * 0.1}s` }}>
                {/* Dot */}
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #6C63FF, #00C9A7)',
                  boxShadow: '0 4px 12px rgba(108,99,255,0.25)',
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
                </div>
                {/* Content */}
                <div style={{ ...CARD, padding: 24, flex: 1, background: '#F8FAFC' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6C63FF', marginBottom: 6 }}>{year}</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section">
        <div className="container-page">
          <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: 48, color: '#0F172A' }}>
            Areas of <span className="gradient-text">Expertise</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {skills.map(({ skill, level }) => (
              <div key={skill} style={{ ...CARD, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A' }}>{skill}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#6C63FF' }}>{level}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: '#E2E8F0', overflow: 'hidden' }}>
                  <div style={{ width: `${level}%`, height: '100%', borderRadius: 99, background: 'linear-gradient(to right, #6C63FF, #00C9A7)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pb-24">
        <div className="container-narrow">
          <div style={{ ...CARD, border: '1.5px solid rgba(108,99,255,0.25)', borderRadius: 24, padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: '#ffffff' }}>
            <div className="glow-orb" style={{ width: 260, height: 260, background: '#6C63FF', top: -80, left: '50%', transform: 'translateX(-50%)', opacity: 0.08 }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 className="heading-md" style={{ marginBottom: 12, color: '#0F172A' }}>Ready to Work Together?</h2>
              <p className="body-lg" style={{ marginBottom: 32, color: '#475569' }}>
                Let's craft a career profile that opens doors to your dream opportunities.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button asChild size="lg" variant="glow">
                  <Link to="/contact">Get In Touch <Mail style={{ width: 16, height: 16, marginLeft: 6 }} /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" style={{ borderColor: '#CBD5E1', color: '#0F172A', background: '#F8FAFC' }}>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
