import { Link } from 'react-router-dom';
import { Award, CheckCircle, Heart, Target, Users, ArrowRight, Globe, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const milestones = [
  { year: '2019', title: 'Started Career Coaching', desc: 'Began helping freshers with resume writing while working in HR.' },
  { year: '2020', title: 'First 100 Clients', desc: 'Reached 100 satisfied clients during the pandemic job market surge.' },
  { year: '2022', title: 'Purnima Career Studio', desc: 'Launched dedicated studio offering full career profile services.' },
  { year: '2024', title: '500+ Placements', desc: 'Helped over 500 professionals land jobs at top companies.' },
];

const values = [
  { icon: Heart, title: 'Client First', desc: 'Every decision we make is centered around your career success.' },
  { icon: Target, title: 'Results Driven', desc: 'We measure our success by your interview calls and job offers.' },
  { icon: Award, title: 'Quality Work', desc: 'No templates. Every resume is handcrafted for your unique story.' },
  { icon: Users, title: 'Long-term Relationship', desc: 'We support you beyond the resume, for your entire career journey.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#060612] pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="glow-orb w-96 h-96 bg-purple-600 top-0 right-0 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="section-tag mb-4">About Us</div>
              <h1 className="text-5xl font-black text-white mb-6">
                Meet <span className="gradient-text">Purnima Rani</span> — Your Career Growth Partner
              </h1>
              <p className="text-slate-400 leading-relaxed mb-6">
                With 5+ years of experience in HR and career consulting, I specialize in crafting ATS-optimized resumes and LinkedIn profiles that get professionals noticed by top employers across India.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                I've helped freshers, mid-level professionals, and senior executives find their dream jobs. My approach is deeply personal — I take time to understand your unique strengths and translate them into compelling career narratives.
              </p>
              <div className="flex gap-4">
                <Link to="/contact"><Button size="lg">Work With Me <ArrowRight className="w-4 h-4" /></Button></Link>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline"><Globe className="w-4 h-4" /> LinkedIn</Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="glass rounded-3xl overflow-hidden aspect-[4/5] flex items-center justify-center">
                <img src="/purnima-rani.png" alt="Purnima Rani" className="w-full h-full object-cover object-top" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<div class="flex flex-col items-center justify-center gap-4 p-12"><div class="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-5xl font-bold">P</div><p class="text-white text-xl font-bold">Purnima Rani</p><p class="text-slate-400 text-center">Career Profile Specialist<br/>HR & Resume Expert</p></div>`;
                }} />
              </div>
              <div className="absolute -bottom-4 -right-4 glass rounded-2xl p-4 shadow-2xl">
                <div className="text-2xl font-black gradient-text">500+</div>
                <div className="text-xs text-slate-400">Happy Clients</div>
              </div>
              <div className="absolute -top-4 -left-4 glass rounded-2xl p-4 shadow-2xl">
                <div className="text-2xl font-black text-emerald-400">94%</div>
                <div className="text-xs text-slate-400">Interview Rate</div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="text-center hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
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
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-pink-500" />
            <div className="space-y-8">
              {milestones.map(({ year, title, desc }, i) => (
                <div key={year} className="relative flex gap-8 pl-20 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="absolute left-4 top-3 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/40 border-2 border-[#060612]">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="glass rounded-2xl p-5 flex-1">
                    <div className="text-purple-400 text-sm font-bold mb-1">{year}</div>
                    <div className="text-white font-bold mb-1">{title}</div>
                    <div className="text-slate-400 text-sm">{desc}</div>
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
            {[
              { skill: 'ATS Resume Optimization', level: 98 },
              { skill: 'LinkedIn Profile Building', level: 95 },
              { skill: 'Cover Letter Writing', level: 90 },
              { skill: 'Interview Coaching', level: 88 },
              { skill: 'Job Search Strategy', level: 92 },
              { skill: 'Personal Branding', level: 87 },
            ].map(({ skill, level }) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{skill}</span>
                  <span className="text-purple-400">{level}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000" style={{ width: `${level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-10">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Work Together?</h2>
            <p className="text-slate-400 mb-8">Let's craft a career profile that opens doors to your dream opportunities.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><Button size="lg" variant="glow">Get In Touch <Mail className="w-4 h-4" /></Button></Link>
              <Link to="/pricing"><Button size="lg" variant="secondary">View Pricing</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
