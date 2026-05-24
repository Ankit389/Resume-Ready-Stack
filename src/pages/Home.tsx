import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, Users, Award, TrendingUp, Briefcase, FileText, Globe, MessageSquare, Zap } from 'lucide-react';
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

const templates = [
  {
    id: 1,
    name: 'Classic Professional',
    desc: 'Classically structured resume template for a robust career history.',
    category: 'Simple',
    image: '/images/templates/professional.png',
  },
  {
    id: 2,
    name: 'Modern Creative',
    desc: 'Contemporary design with bold typography and clear hierarchy.',
    category: 'Modern',
    image: '/images/templates/modern.png',
  },
  {
    id: 3,
    name: 'Prime ATS',
    desc: 'Professional, streamlined resume template optimized for maximum ATS compatibility.',
    category: 'ATS',
    image: '/images/templates/ats.png',
  },
  {
    id: 4,
    name: 'Executive Leader',
    desc: 'Premium layout for senior roles focusing on impact and leadership.',
    category: 'Executive',
    image: '/images/templates/executive.png',
  },
];

const templateCategories = ['All templates', 'Simple', 'Modern', 'ATS', 'Executive'];

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
  const [activeCategory, setActiveCategory] = useState('All templates');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  useEffect(() => { const t = setTimeout(() => {}, 60); return () => clearTimeout(t); }, []);
  
  const filteredTemplates = activeCategory === 'All templates' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 40, paddingBottom: 60 }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at top, rgba(108,99,255,0.16), transparent 25%), radial-gradient(circle at bottom right, rgba(0,201,167,0.12), transparent 30%)',
          }}
        />
        <div className="container-page relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-tag mb-5 inline-flex justify-center">
              <Star className="w-3.5 h-3.5" />
              #1 Career Profile Specialist in India
            </div>
            <h1 className="heading-xl mb-6">
              Land Your <span className="gradient-text">Dream Job</span>
              <br />with an ATS-Ready Resume
            </h1>
            <p className="body-lg max-w-2xl mx-auto text-slate-300 mb-10">
              Professional resume writing, LinkedIn optimization, and career coaching designed to get you shortlisted faster.
              500+ professionals placed in top companies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button asChild size="lg" variant="glow" className="w-full sm:w-auto">
                <Link to="/pricing">Get Started Today <ArrowRight className="w-5 h-5 ml-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="glass rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-center shadow-[0_20px_50px_-35px_rgba(15,23,42,0.8)] transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/20">
                <div className="flex items-center justify-center mx-auto mb-4 h-12 w-12 rounded-2xl bg-slate-800 text-purple-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-extrabold text-white">{value}</div>
                <div className="mt-2 text-sm text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" style={{ background: 'rgba(15,23,42,0.5)' }}>
        <div className="container-page">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="section-tag mb-4 inline-flex">Our Services</div>
            <h2 className="heading-lg mb-4 max-w-xl mx-auto">
              Everything You Need to <span className="gradient-text whitespace-nowrap">Get Hired</span>
            </h2>
            <p className="body-lg text-slate-400">
              From resume to interview — we provide a polished career package that helps you stand out.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map(({ icon: Icon, title, desc, accent }) => (
              <div key={title} className="group rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:shadow-purple-500/20">
                <div style={{ width: '56px', height: '56px', marginBottom: '24px' }} className="flex items-center justify-center rounded-2xl bg-slate-900/90 text-white shadow-lg">
                  <Icon className="h-6 w-6" style={{ color: accent }} />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-7 text-slate-400">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link to="/services">View All Services <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="section bg-slate-950/50" id="templates">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="heading-lg mb-4">
              ATS <span className="gradient-text">resume templates</span>
            </h2>
            <p className="body-lg text-slate-400">
              Enhance your job search with our ATS resume templates. Impress human and robot recruiters with an effective design. Beat the algorithm, and showcase attention to detail.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {templateCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25 border-transparent'
                    : 'bg-slate-900/50 text-slate-400 border border-white/5 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Template Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTemplates.map(({ id, name, desc, image }) => (
              <div key={id} className="group relative">
                {/* Image Card */}
                <div className="relative rounded-2xl overflow-hidden bg-white aspect-[1/1.414] shadow-lg mb-4 border border-white/5 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                  <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 px-6">
                    <Button asChild size="lg" variant="glow" className="w-full">
                      <Link to="/pricing">Create my resume</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full bg-slate-900/80 hover:bg-slate-800 text-white border-white/20" onClick={() => setPreviewImage(image)}>
                      Preview template
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-slate-400 mb-6">Not sure which template suits you? Let our experts guide you.</p>
            <Button asChild variant="secondary" className="inline-flex">
              <Link to="/contact">Get Free Template Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="section-tag mb-4 inline-flex">Why Choose Us</div>
              <h2 className="heading-lg mb-5">
                The <span className="gradient-text">Results</span> Speak for Themselves
              </h2>
              <p className="body-lg text-slate-400 mb-8 max-w-xl">
                We craft compelling career narratives that both ATS systems and hiring managers respond to — so you get more interviews and offers.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {reasons.map(item => (
                  <div key={item} className="flex items-start gap-3 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                    <CheckCircle className="mt-1 h-5 w-5 text-teal-400 flex-shrink-0" />
                    <p className="text-sm text-slate-300 leading-6">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild variant="outline">
                  <Link to="/about">Learn More About Us <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {whyStats.map(({ value, label, sub }) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-slate-950/80 p-7 text-center shadow-[0_18px_50px_-35px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1 hover:border-teal-400/30">
                  <div className="gradient-text text-3xl font-bold">{value}</div>
                  <div className="mt-3 text-sm font-semibold text-white">{label}</div>
                  <div className="mt-1 text-xs text-slate-400">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'rgba(15,23,42,0.5)' }}>
        <div className="container-page">
          <div className="text-center mb-14">
            <div className="section-tag mb-4 inline-flex">Testimonials</div>
            <h2 className="heading-lg">What Clients <span className="gradient-text">Say</span></h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map(({ name, role, text, rating }) => (
              <Card key={name} className="rounded-3xl border border-white/10 bg-slate-950/90 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.8)] transition hover:-translate-y-1 hover:shadow-purple-500/20">
                <CardContent className="p-6">
                  <div className="mb-5 flex gap-1">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-300" />
                    ))}
                  </div>
                  <p className="mb-6 text-sm leading-7 text-slate-300">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)' }}>
                      {name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{name}</div>
                      <div className="text-xs text-slate-400">{role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-narrow">
          <div className="relative overflow-hidden rounded-3xl border border-purple-400/20 bg-slate-950/90 p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)]">
            <div className="absolute -top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="relative z-10 text-center">
              <Badge variant="glow" className="mx-auto mb-5 inline-flex">
                <Zap className="h-3.5 w-3.5" /> Limited Slots Available
              </Badge>
              <h2 className="heading-lg mb-4">Ready to Transform Your Career?</h2>
              <p className="body-lg mx-auto mb-8 max-w-xl text-slate-400">
                Book your free resume audit today and take the first step toward your dream job.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mt-6">
                <Button asChild size="lg" variant="glow" className="w-full sm:w-auto">
                  <Link to="/pricing">Get Started <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Link to="/contact">Book Free Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-8" onClick={() => setPreviewImage(null)}>
          <div 
            className="relative w-full max-w-5xl max-h-full flex flex-col bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-900">
              <h3 className="text-lg font-bold text-white">Template Preview</h3>
              <button 
                onClick={() => setPreviewImage(null)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-slate-300 transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950 flex justify-center">
              <img src={previewImage} alt="Template Preview" className="max-w-full h-auto rounded-xl shadow-[0_0_50px_rgba(108,99,255,0.15)]" />
            </div>
            
            {/* Footer */}
            <div className="p-5 border-t border-white/5 bg-slate-900 flex justify-end gap-4">
              <Button variant="outline" onClick={() => setPreviewImage(null)} className="hidden sm:inline-flex border-white/10 hover:bg-white/5">
                Close Preview
              </Button>
              <Button asChild size="lg" variant="glow" className="px-8 shadow-purple-500/25">
                <Link to={`/pricing?template=${encodeURIComponent(templates.find(t => t.image === previewImage)?.name || '')}`}>
                  Select This Template
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
