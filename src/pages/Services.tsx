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
  { id: 1, name: 'ATS Resume Writing',           price: 1999, category: 'resume',    description: 'Keyword-optimized resumes that pass ATS filters and impress hiring managers.',    features: ['ATS Keyword Optimization', 'Professional Formatting', 'Tailored to Job Role', 'Unlimited Revisions'],       duration: '3-5 days', popular: false, rating: 4.9, reviews: 145 },
  { id: 2, name: 'LinkedIn Profile Optimization', price: 1499, category: 'linkedin',  description: 'Boost your LinkedIn presence and get noticed by recruiters 10x more.',            features: ['Keyword-Rich Headline', 'Compelling Summary', 'Skills & Endorsements', 'Profile Photo Tips'],               duration: '2-3 days', popular: true,  rating: 4.8, reviews: 98  },
  { id: 3, name: 'Cover Letter Writing',          price: 799,  category: 'cover',     description: 'Compelling cover letters that tell your story and open doors.',                  features: ['Tailored to Each Job', 'ATS-Friendly Format', 'Storytelling Approach', 'Key Achievements'],                   duration: '1-2 days', popular: false, rating: 4.7, reviews: 67  },
  { id: 4, name: 'Complete Career Package',       price: 3999, category: 'package',   description: 'Everything you need to transform your career profile completely.',               features: ['ATS Resume', 'LinkedIn Optimization', 'Cover Letter', 'Interview Prep Guide', 'Job Application Strategy'], duration: '5-7 days', popular: true,  rating: 5.0, reviews: 203 },
  { id: 5, name: 'Interview Preparation',         price: 2499, category: 'interview', description: 'Mock interviews and coaching to confidently land your dream job.',               features: ['Mock Interview Sessions', 'Common Q&A Practice', 'Body Language Tips', 'Salary Negotiation'],                 duration: '4-6 days', popular: false, rating: 4.9, reviews: 89  },
  { id: 6, name: 'Job Search Strategy',           price: 1299, category: 'strategy',  description: 'Strategic job search plan tailored to your career goals.',                     features: ['Target Company Research', 'Application Tracking', 'Networking Strategy', 'Personal Branding'],                 duration: '2-3 days', popular: false, rating: 4.6, reviews: 54  },
];

const CARD: React.CSSProperties = {
  background: '#1E293B',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
};

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
    <div style={{ background: '#0F172A', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: 72, paddingBottom: 48, overflow: 'hidden' }}>
        <div className="glow-orb" style={{ width: 360, height: 360, background: '#6C63FF', top: -60, left: '30%', opacity: 0.08 }} />
        <div className="container-page" style={{ textAlign: 'center' }}>
          <div className="section-tag" style={{ marginBottom: 14, display: 'inline-flex' }}>Our Services</div>
          <h1 className="heading-xl" style={{ marginBottom: 14 }}>
            Professional Career <span className="gradient-text">Services</span>
          </h1>
          <p className="body-lg" style={{ maxWidth: 460, margin: '0 auto 36px' }}>
            From resume to job offer — we provide everything to accelerate your career journey.
          </p>
          <div style={{ maxWidth: 440, margin: '0 auto', position: 'relative' }}>
            <Search style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#64748B' }} />
            <Input
              placeholder="Search services..."
              style={{ paddingLeft: 44 }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section style={{ paddingBottom: 32 }}>
        <div className="container-page">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {categories.map(cat => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 20px', borderRadius: 99, fontSize: '0.875rem', fontWeight: 500,
                    cursor: 'pointer', transition: 'all 0.2s',
                    background: active ? 'linear-gradient(135deg, #6C63FF, #00C9A7)' : '#1E293B',
                    color: active ? '#fff' : '#94A3B8',
                    border: active ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: active ? '0 4px 16px rgba(108,99,255,0.3)' : 'none',
                    transform: active ? 'translateY(-1px)' : 'none',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ paddingBottom: 96 }}>
        <div className="container-page">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748B' }}>
              No services found. Try a different search.
            </div>
          ) : (
            <div className="services-grid">
              {filtered.map(service => {
                const Icon = iconMap[service.category] || FileText;
                return (
                  <div
                    key={service.id}
                    style={{ ...CARD, padding: 24, display: 'flex', flexDirection: 'column', transition: 'transform 0.25s, border-color 0.25s' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.35)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,201,167,0.2))',
                        border: '1px solid rgba(108,99,255,0.25)',
                      }}>
                        <Icon style={{ width: 22, height: 22, color: '#6C63FF' }} />
                      </div>
                      {service.popular && <Badge variant="glow">Popular</Badge>}
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>{service.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: 16, flexGrow: 1 }}>{service.description}</p>

                    <ul style={{ listStyle: 'none', marginBottom: 16 }}>
                      {service.features?.slice(0, 3).map((f: string) => (
                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                          <CheckCircle style={{ width: 14, height: 14, color: '#00C9A7', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, fontSize: '0.78rem', color: '#64748B' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Star style={{ width: 12, height: 12, fill: '#fbbf24', color: '#fbbf24' }} />
                        {service.rating}
                      </span>
                      <span>({service.reviews} reviews)</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
                        <Clock style={{ width: 12, height: 12 }} />
                        {service.duration}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                      <span className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 900 }}>
                        ₹{service.price.toLocaleString('en-IN')}
                      </span>
                      <Link to={`/services/${service.id}`}>
                        <Button size="sm">Details <ArrowRight style={{ width: 13, height: 13 }} /></Button>
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
