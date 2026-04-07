import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Star, Users, ArrowRight, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { servicesAPI } from '../lib/api';
import { formatPrice } from '../lib/utils';

const processSteps = [
  { step: 1, title: 'Submit Your Info', desc: 'Share your current resume, job target, and career goals.' },
  { step: 2, title: 'Expert Review', desc: 'We analyze your profile and begin crafting your optimized document.' },
  { step: 3, title: 'First Draft', desc: 'Receive your professionally written document within the stated timeline.' },
  { step: 4, title: 'Revisions', desc: 'We refine based on your feedback until you\'re completely satisfied.' },
  { step: 5, title: 'Final Delivery', desc: 'Get your polished documents ready to send to employers.' },
];

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const res = await servicesAPI.getById(Number(id));
        setService(res.data.data);
      } catch {
        setService(null);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const BOX = { background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px' };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0F172A' }}>
      <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#6C63FF', borderTopColor: 'transparent' }} />
    </div>
  );

  if (!service) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#0F172A' }}>
      <p className="text-lg" style={{ color: '#94A3B8' }}>Service not found</p>
      <Link to="/services"><Button variant="outline"><ArrowLeft className="w-4 h-4" /> Back to Services</Button></Link>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: '#0F172A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 mb-8 text-sm transition-colors hover:opacity-80"
          style={{ color: '#94A3B8' }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8" style={BOX}>
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)', boxShadow: '0 0 20px rgba(108,99,255,0.3)' }}
                >
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  {service.popular && <Badge variant="teal" className="mb-2">Most Popular</Badge>}
                  <h1 className="text-3xl font-black text-white">{service.name}</h1>
                  <div className="flex items-center gap-3 mt-2 text-sm" style={{ color: '#94A3B8' }}>
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {service.duration || '3-5 days'}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 100+ clients</span>
                  </div>
                </div>
              </div>
              <p className="leading-relaxed" style={{ color: '#94A3B8' }}>{service.description}</p>
            </div>

            <div className="p-8" style={BOX}>
              <h2 className="text-xl font-bold text-white mb-5">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.features?.map((f: string) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#00C9A7' }} />
                    <span className="text-sm" style={{ color: '#E2E8F0' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8" style={BOX}>
              <h2 className="text-xl font-bold text-white mb-6">Our Process</h2>
              <div className="space-y-4">
                {processSteps.map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)' }}
                    >
                      {step}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{title}</div>
                      <div className="text-sm mt-0.5" style={{ color: '#94A3B8' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="p-6 sticky top-24" style={BOX}>
              <div className="text-center mb-6">
                <div className="text-4xl font-black gradient-text mb-1">{formatPrice(service.price)}</div>
                <div className="text-sm" style={{ color: '#94A3B8' }}>One-time payment</div>
              </div>

              <div className="space-y-3 mb-6">
                {service.features?.slice(0, 4).map((f: string) => (
                  <div key={f} className="flex items-center gap-2 text-sm" style={{ color: '#E2E8F0' }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#00C9A7' }} /> {f}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Link to={`/checkout?service=${service.id}&plan=${encodeURIComponent(service.name)}&price=${service.price}`} className="block">
                  <Button className="w-full" size="lg" variant="glow">Get This Service <ArrowRight className="w-4 h-4" /></Button>
                </Link>
                <Link to="/contact" className="block">
                  <Button className="w-full" size="lg" variant="secondary">Ask a Question</Button>
                </Link>
              </div>

              <div className="mt-5 pt-5 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center justify-center gap-1.5 text-sm" style={{ color: '#94A3B8' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#00C9A7' }} /> 100% Satisfaction Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
