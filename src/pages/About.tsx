import { Link } from 'react-router-dom';
import { Award, CheckCircle, Heart, Target, Users, ArrowRight, Globe, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

const milestones = [
  { year: '2019', title: 'Started Career Coaching',  desc: 'Began helping freshers with resume writing while working in HR.' },
  { year: '2020', title: 'First 100 Clients',        desc: 'Reached 100 satisfied clients during the pandemic job market surge.' },
  { year: '2022', title: 'Purnima Career Studio',    desc: 'Launched dedicated studio offering full career profile services.' },
  { year: '2024', title: '500+ Placements',          desc: 'Helped over 500 professionals land jobs at top companies.' },
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
  background: '#1E293B',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
};

export default function About() {
  return (
    <div style={{ background: '#0F172A', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb" style={{ width: 360, height: 360, background: '#6C63FF', top: -60, right: 0, opacity: 0.07 }} />
        <div className="container-page">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'center' }}>
            <div className="animate-fade-in-up">
              <div className="section-tag" style={{ marginBottom: 14 }}>About Us</div>
              <h1 className="heading-xl" style={{ marginBottom: 18 }}>
                Meet <span className="gradient-text">Purnima Rani</span>
                <br />Your Career Growth Partner
              </h1>
              <p className="body-lg" style={{ marginBottom: 16 }}>
                With 5+ years of experience in HR and career consulting, I specialize in crafting ATS-optimized resumes and LinkedIn profiles that get professionals noticed by top employers across India.
              </p>
              <p className="body-lg" style={{ marginBottom: 32 }}>
                I've helped freshers, mid-level professionals, and senior executives find their dream jobs with a deeply personal approach.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/contact">
                  <Button size="lg" variant="glow">Work With Me <ArrowRight style={{ width: 17, height: 17 }} /></Button>
                </Link>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline"><Globe style={{ width: 16, height: 16 }} /> LinkedIn</Button>
                </a>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                ...CARD, borderRadius: 24, overflow: 'hidden',
                aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 48 }}>
                  <div style={{
                    width: 120, height: 120, borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '3rem', fontWeight: 900, color: '#fff',
                    background: 'linear-gradient(135deg, #6C63FF, #00C9A7)',
                  }}>P</div>
                  <p style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700 }}>Purnima Rani</p>
                  <p style={{ color: '#64748B', fontSize: '0.875rem', textAlign: 'center' }}>Career Profile Specialist<br />HR & Resume Expert</p>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: -16, right: -16, ...CARD, border: '1px solid rgba(108,99,255,0.3)', padding: 16, borderRadius: 16 }}>
                <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 900 }}>500+</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Happy Clients</div>
              </div>
              <div style={{ position: 'absolute', top: -16, left: -16, ...CARD, border: '1px solid rgba(0,201,167,0.3)', padding: 16, borderRadius: 16 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#00C9A7' }}>94%</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Interview Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-page">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-tag" style={{ marginBottom: 14, display: 'inline-flex' }}>My Values</div>
            <h2 className="heading-lg">What Drives <span className="gradient-text">My Work</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ ...CARD, padding: 24, textAlign: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  background: 'linear-gradient(135deg, rgba(108,99,255,0.18), rgba(0,201,167,0.18))',
                  border: '1px solid rgba(108,99,255,0.28)',
                }}>
                  <Icon style={{ width: 22, height: 22, color: '#6C63FF' }} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-tag" style={{ marginBottom: 14, display: 'inline-flex' }}>Journey</div>
            <h2 className="heading-lg">My <span className="gradient-text">Career Story</span></h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 24, top: 0, bottom: 0, width: 1,
              background: 'linear-gradient(to bottom, #6C63FF, #00C9A7)',
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {milestones.map(({ year, title, desc }, i) => (
                <div key={year} className="animate-fade-in-up" style={{ display: 'flex', gap: 32, paddingLeft: 68, animationDelay: `${i * 0.1}s` }}>
                  <div style={{
                    position: 'absolute', left: 12, width: 24, height: 24, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(135deg, #6C63FF, #00C9A7)',
                    border: '2px solid #0F172A', boxShadow: '0 0 16px rgba(108,99,255,0.4)',
                  }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />
                  </div>
                  <div style={{ ...CARD, padding: 20, flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6C63FF', marginBottom: 4 }}>{year}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section">
        <div className="container-page">
          <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: 48 }}>
            Areas of <span className="gradient-text">Expertise</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {skills.map(({ skill, level }) => (
              <div key={skill}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#E2E8F0' }}>{skill}</span>
                  <span style={{ fontSize: '0.875rem', color: '#6C63FF' }}>{level}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ width: `${level}%`, height: '100%', borderRadius: 99, background: 'linear-gradient(to right, #6C63FF, #00C9A7)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-narrow">
          <div style={{ ...CARD, border: '1.5px solid rgba(108,99,255,0.25)', borderRadius: 24, padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="glow-orb" style={{ width: 260, height: 260, background: '#6C63FF', top: -80, left: '50%', transform: 'translateX(-50%)', opacity: 0.12 }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 className="heading-md" style={{ marginBottom: 12 }}>Ready to Work Together?</h2>
              <p className="body-lg" style={{ marginBottom: 32 }}>
                Let's craft a career profile that opens doors to your dream opportunities.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact"><Button size="lg" variant="glow">Get In Touch <Mail style={{ width: 16, height: 16 }} /></Button></Link>
                <Link to="/pricing"><Button size="lg" variant="secondary">View Pricing</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
