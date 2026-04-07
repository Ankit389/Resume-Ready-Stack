import { Link } from 'react-router-dom';
import { Award, CheckCircle, Heart, Target, Users, ArrowRight, Globe, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

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
  { skill: 'ATS Resume Optimization',  level: 98 },
  { skill: 'LinkedIn Profile Building', level: 95 },
  { skill: 'Cover Letter Writing',      level: 90 },
  { skill: 'Interview Coaching',        level: 88 },
  { skill: 'Job Search Strategy',       level: 92 },
  { skill: 'Personal Branding',         level: 87 },
];

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: '#0F172A' }}>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="glow-orb w-96 h-96 bg-[#6C63FF] top-0 right-0" style={{ opacity: 0.08 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="section-tag mb-4">About Us</div>
              <h1 className="text-5xl font-black text-white mb-6 leading-tight">
                Meet <span className="gradient-text">Purnima Rani</span>
                <br />Your Career Growth Partner
              </h1>
              <p className="text-[#94A3B8] leading-relaxed mb-5">
                With 5+ years of experience in HR and career consulting, I specialize in crafting ATS-optimized resumes and LinkedIn profiles that get professionals noticed by top employers across India.
              </p>
              <p className="text-[#94A3B8] leading-relaxed mb-8">
                I've helped freshers, mid-level professionals, and senior executives find their dream jobs. My approach is deeply personal — I take time to understand your unique strengths and translate them into compelling career narratives.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact">
                  <Button size="lg" variant="glow">Work With Me <ArrowRight className="w-4 h-4" /></Button>
                </Link>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline"><Globe className="w-4 h-4" /> LinkedIn</Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div
                className="rounded-3xl overflow-hidden aspect-[4/5] flex items-center justify-center"
                style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <img
                  src="/purnima-rani.png" alt="Purnima Rani"
                  className="w-full h-full object-cover object-top"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `<div class="flex flex-col items-center justify-center gap-4 p-12"><div class="w-32 h-32 rounded-full flex items-center justify-center text-white text-5xl font-bold" style="background:linear-gradient(135deg,#6C63FF,#00C9A7)">P</div><p class="text-white text-xl font-bold">Purnima Rani</p><p class="text-center text-sm" style="color:#64748B">Career Profile Specialist<br/>HR & Resume Expert</p></div>`;
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-2xl p-4 shadow-2xl" style={{ background: '#1E293B', border: '1px solid rgba(108,99,255,0.3)' }}>
                <div className="text-2xl font-black gradient-text">500+</div>
                <div className="text-xs" style={{ color: '#64748B' }}>Happy Clients</div>
              </div>
              <div className="absolute -top-4 -left-4 rounded-2xl p-4 shadow-2xl" style={{ background: '#1E293B', border: '1px solid rgba(0,201,167,0.3)' }}>
                <div className="text-2xl font-black" style={{ color: '#00C9A7' }}>94%</div>
                <div className="text-xs" style={{ color: '#64748B' }}>Interview Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit mb-4">My Values</div>
            <h2 className="text-4xl font-black text-white">What Drives <span className="gradient-text">My Work</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,201,167,0.2))', border: '1px solid rgba(108,99,255,0.3)' }}>
                    <Icon className="w-6 h-6" style={{ color: '#6C63FF' }} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit mb-4">Journey</div>
            <h2 className="text-4xl font-black text-white">My <span className="gradient-text">Career Story</span></h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #6C63FF, #00C9A7)' }} />
            <div className="space-y-8">
              {milestones.map(({ year, title, desc }, i) => (
                <div key={year} className="relative flex gap-8 pl-20 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div
                    className="absolute left-4 top-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)', border: '2px solid #0F172A', boxShadow: '0 0 16px rgba(108,99,255,0.4)' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="rounded-2xl p-5 flex-1" style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="text-sm font-bold mb-1" style={{ color: '#6C63FF' }}>{year}</div>
                    <div className="text-white font-bold mb-1">{title}</div>
                    <div className="text-sm" style={{ color: '#94A3B8' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white">Areas of <span className="gradient-text">Expertise</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map(({ skill, level }) => (
              <div key={skill} className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#E2E8F0] font-medium">{skill}</span>
                  <span style={{ color: '#6C63FF' }}>{level}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${level}%`, background: 'linear-gradient(to right, #6C63FF, #00C9A7)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 pb-28">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="rounded-3xl p-10 relative overflow-hidden" style={{ background: '#1E293B', border: '1px solid rgba(108,99,255,0.2)' }}>
            <div className="glow-orb w-64 h-64 bg-[#6C63FF] top-0 left-1/2 -translate-x-1/2" style={{ opacity: 0.12 }} />
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-4">Ready to Work Together?</h2>
              <p className="mb-8" style={{ color: '#94A3B8' }}>Let's craft a career profile that opens doors to your dream opportunities.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact"><Button size="lg" variant="glow">Get In Touch <Mail className="w-4 h-4" /></Button></Link>
                <Link to="/pricing"><Button size="lg" variant="secondary">View Pricing</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
