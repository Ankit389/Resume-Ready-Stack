import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, FileText, Globe, MessageSquare, Briefcase, Target, Map, Star, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { servicesAPI } from '../lib/api';

const iconMap: Record<string, any> = {
  resume: FileText, linkedin: Globe, cover: MessageSquare,
  package: Briefcase, interview: Target, strategy: Map,
};

const categories = ['All', 'Resume', 'LinkedIn', 'Cover Letter', 'Package', 'Interview', 'Strategy'];

const defaultServices = [
  { id: 1, name: 'ATS Resume Writing',          price: 1999, category: 'resume',    icon: '📄', description: 'Keyword-optimized resumes that pass ATS filters and impress hiring managers.',    features: ['ATS Keyword Optimization', 'Professional Formatting', 'Tailored to Job Role', 'Unlimited Revisions'],       duration: '3-5 days', popular: false, rating: 4.9, reviews: 145 },
  { id: 2, name: 'LinkedIn Profile Optimization',price: 1499, category: 'linkedin',  icon: '💼', description: 'Boost your LinkedIn presence and get noticed by recruiters 10x more.',            features: ['Keyword-Rich Headline', 'Compelling Summary', 'Skills & Endorsements', 'Profile Photo Tips'],               duration: '2-3 days', popular: true,  rating: 4.8, reviews: 98  },
  { id: 3, name: 'Cover Letter Writing',         price: 799,  category: 'cover',     icon: '✉️', description: 'Compelling cover letters that tell your story and open doors.',                  features: ['Tailored to Each Job', 'ATS-Friendly Format', 'Storytelling Approach', 'Key Achievements'],                   duration: '1-2 days', popular: false, rating: 4.7, reviews: 67  },
  { id: 4, name: 'Complete Career Package',      price: 3999, category: 'package',   icon: '🚀', description: 'Everything you need to transform your career profile completely.',               features: ['ATS Resume', 'LinkedIn Optimization', 'Cover Letter', 'Interview Prep Guide', 'Job Application Strategy'], duration: '5-7 days', popular: true,  rating: 5.0, reviews: 203 },
  { id: 5, name: 'Interview Preparation',        price: 2499, category: 'interview', icon: '🎯', description: 'Mock interviews and coaching to confidently land your dream job.',               features: ['Mock Interview Sessions', 'Common Q&A Practice', 'Body Language Tips', 'Salary Negotiation'],                 duration: '4-6 days', popular: false, rating: 4.9, reviews: 89  },
  { id: 6, name: 'Job Search Strategy',          price: 1299, category: 'strategy',  icon: '🗺️', description: 'Strategic job search plan tailored to your career goals.',                     features: ['Target Company Research', 'Application Tracking', 'Networking Strategy', 'Personal Branding'],                 duration: '2-3 days', popular: false, rating: 4.6, reviews: 54  },
];

export default function Services() {
  const [services, setServices]         = useState(defaultServices);
  const [filtered, setFiltered]         = useState(defaultServices);
  const [search, setSearch]             = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    servicesAPI.getAll().then(res => {
      if (res.data?.data?.length) {
        const merged = res.data.data.map((s: any) => ({ ...s, rating: s.rating || 4.8, reviews: s.reviews || 80 }));
        setServices(merged); setFiltered(merged);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    let result = services;
    if (activeCategory !== 'All') result = result.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());
    if (search) result = result.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));
    setFiltered(result);
  }, [search, activeCategory, services]);

  return (
    <div className="min-h-screen" style={{ background: '#0F172A' }}>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="glow-orb w-80 h-80 bg-[#6C63FF] top-0 left-1/3" style={{ opacity: 0.08 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-tag mx-auto w-fit mb-4">Our Services</div>
          <h1 className="text-5xl font-black text-white mb-4">
            Professional Career <span className="gradient-text">Services</span>
          </h1>
          <p className="max-w-xl mx-auto mb-10" style={{ color: '#94A3B8' }}>
            From resume to job offer — we provide everything to accelerate your career journey.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748B' }} />
            <Input
              placeholder="Search services..."
              className="pl-12 h-12 text-base"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background:   activeCategory === cat ? 'linear-gradient(135deg, #6C63FF, #00C9A7)' : '#1E293B',
                  color:        activeCategory === cat ? '#fff'      : '#94A3B8',
                  border:       activeCategory === cat ? 'none'      : '1px solid rgba(255,255,255,0.08)',
                  boxShadow:    activeCategory === cat ? '0 4px 16px rgba(108,99,255,0.3)' : 'none',
                  transform:    activeCategory === cat ? 'translateY(-1px)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20" style={{ color: '#64748B' }}>No services found. Try a different search.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(service => {
                const Icon = iconMap[service.category] || FileText;
                return (
                  <div
                    key={service.id}
                    className="rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 group"
                    style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(108,99,255,0.35)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.25), rgba(0,201,167,0.25))', border: '1px solid rgba(108,99,255,0.3)' }}
                      >
                        <Icon className="w-6 h-6" style={{ color: '#6C63FF' }} />
                      </div>
                      {service.popular && <Badge variant="glow">Popular</Badge>}
                    </div>

                    <h3 className="text-white font-bold text-lg mb-2">{service.name}</h3>
                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#94A3B8' }}>{service.description}</p>

                    <div className="space-y-1.5 mb-5">
                      {service.features?.slice(0, 3).map((f: string) => (
                        <div key={f} className="flex items-center gap-2 text-xs" style={{ color: '#94A3B8' }}>
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#00C9A7' }} />
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mb-5 text-xs" style={{ color: '#64748B' }}>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {service.rating}
                      </span>
                      <span>({service.reviews} reviews)</span>
                      <span className="flex items-center gap-1 ml-auto">
                        <Clock className="w-3 h-3" /> {service.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                      <span className="text-2xl font-black gradient-text">₹{service.price.toLocaleString('en-IN')}</span>
                      <Link to={`/services/${service.id}`}>
                        <Button size="sm">Details <ArrowRight className="w-3 h-3" /></Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
