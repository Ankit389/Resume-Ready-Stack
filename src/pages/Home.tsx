import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, Users, Award, TrendingUp, Briefcase, FileText, Globe, MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

const stats = [
  { icon: Users, value: '500+', label: 'Clients Served' },
  { icon: TrendingUp, value: '94%', label: 'Interview Rate' },
  { icon: Award, value: '5+', label: 'Years Experience' },
  { icon: Star, value: '4.9/5', label: 'Client Rating' },
];

const services = [
  { icon: FileText, title: 'ATS Resume Writing', desc: 'Keyword-optimized resumes that pass ATS filters and impress hiring managers.', color: 'from-purple-500 to-violet-600' },
  { icon: Globe, title: 'LinkedIn Optimization', desc: 'Profile makeovers that attract recruiters and boost your visibility 10x.', color: 'from-blue-500 to-cyan-600' },
  { icon: MessageSquare, title: 'Cover Letter Writing', desc: 'Compelling cover letters tailored to each job opportunity.', color: 'from-pink-500 to-rose-600' },
  { icon: Briefcase, title: 'Career Coaching', desc: 'End-to-end support from job search strategy to offer negotiation.', color: 'from-amber-500 to-orange-600' },
];

const testimonials = [
  { name: 'Rahul Sharma', role: 'Software Engineer @ Google', text: 'Got 3 interview calls within a week of updating my resume. Absolutely worth it!', rating: 5 },
  { name: 'Priya Mehta', role: 'Marketing Manager @ Zomato', text: 'My LinkedIn messages tripled after the profile optimization. Amazing work!', rating: 5 },
  { name: 'Arjun Patel', role: 'Data Analyst @ Flipkart', text: 'Landed my dream job in 3 weeks with Purnima\'s help. 10/10 recommend!', rating: 5 },
];

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#060612]">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 grid-bg" />
        <div className="glow-orb w-96 h-96 bg-purple-600 top-20 left-1/4 opacity-20" />
        <div className="glow-orb w-80 h-80 bg-pink-600 bottom-20 right-1/4 opacity-15" />

        <div className={`relative z-10 max-w-5xl mx-auto px-4 text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-tag mb-6">
            <Star className="w-3 h-3" /> #1 Career Profile Specialist in India
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Land Your{' '}
            <span className="gradient-text">Dream Job</span>
            <br />with an ATS-Ready Resume
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional resume writing, LinkedIn optimization & career coaching that gets you shortlisted. 500+ professionals placed in top companies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/pricing">
              <Button size="xl" variant="glow" className="w-full sm:w-auto">
                Get Started Today <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="xl" variant="secondary" className="w-full sm:w-auto">
                Explore Services
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="glass rounded-2xl p-4 text-center">
                <Icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-500" />
        </div>
      </section>

      {/* Services */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-tag mx-auto w-fit mb-4">Our Services</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Get Hired</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">From resume to interview — we've got your career covered.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {services.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300 group cursor-pointer" onClick={() => {}}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services"><Button variant="outline">View All Services <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative">
        <div className="glow-orb w-72 h-72 bg-purple-600 top-0 right-0 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-tag mb-4">Why Choose Us</div>
              <h2 className="text-4xl font-black text-white mb-6">The <span className="gradient-text">Results</span> Speak for Themselves</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">We don't just write resumes — we craft career narratives that resonate with ATS systems and human recruiters alike.</p>
              <div className="space-y-4">
                {['ATS Score above 90% guaranteed', '24-hour turnaround on most services', 'Unlimited revisions until you\'re satisfied', 'Direct WhatsApp support from expert', 'Industry-specific keyword optimization'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/about"><Button variant="outline">Learn More About Us <ArrowRight className="w-4 h-4" /></Button></Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '94%', label: 'Get Interviews', sub: 'within 2 weeks', color: 'purple' },
                { value: '3x', label: 'More Callbacks', sub: 'than average resumes', color: 'pink' },
                { value: '500+', label: 'Happy Clients', sub: 'across all industries', color: 'blue' },
                { value: '5★', label: 'Average Rating', sub: 'from verified clients', color: 'amber' },
              ].map(({ value, label, sub, color }) => (
                <div key={label} className="glass rounded-2xl p-6 text-center">
                  <div className={`text-3xl font-black gradient-text mb-1`}>{value}</div>
                  <div className="text-white font-semibold text-sm">{label}</div>
                  <div className="text-slate-500 text-xs mt-1">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-tag mx-auto w-fit mb-4">Testimonials</div>
            <h2 className="text-4xl font-black text-white">What Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating }) => (
              <Card key={name} className="hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{name}</div>
                      <div className="text-slate-400 text-xs">{role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="glass rounded-3xl p-12 relative overflow-hidden">
            <div className="glow-orb w-64 h-64 bg-purple-600 top-0 left-1/2 -translate-x-1/2 opacity-20" />
            <div className="relative z-10">
              <Badge variant="glow" className="mb-4">Limited Slots Available</Badge>
              <h2 className="text-4xl font-black text-white mb-4">Ready to Transform Your Career?</h2>
              <p className="text-slate-400 mb-8">Book your free resume audit today and take the first step toward your dream job.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/pricing"><Button size="lg" variant="glow">Get Started <ArrowRight className="w-4 h-4" /></Button></Link>
                <Link to="/contact"><Button size="lg" variant="secondary">Book Free Consultation</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
