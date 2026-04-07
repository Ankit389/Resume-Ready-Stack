import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { plansAPI } from '../lib/api';
import { formatPrice } from '../lib/utils';

const defaultPlans = [
  { id: 1, name: 'Resume Audit', price: 0, type: 'free', badge: 'Free', description: 'Get started with a professional review', features: ['Free Resume Review', 'ATS Score Check', 'Keyword Analysis', 'Basic Format Check'], cta: 'Get Free Audit' },
  { id: 2, name: 'ATS Optimization', price: 1999, type: 'core', badge: 'Popular', description: 'Professional ATS-optimized resume', features: ['ATS Resume Rewrite', 'Cover Letter', 'Keyword Optimization', 'Format Fix', '2 Revisions'], popular: true, cta: 'Get Started' },
  { id: 3, name: 'Profile Package', price: 2999, type: 'premium', badge: 'Value', description: 'Complete career profile package', features: ['ATS Resume', 'LinkedIn Profile', 'Cover Letter', 'Portfolio Setup', '3 Revisions'], cta: 'Get Package' },
  { id: 4, name: 'Complete Career', price: 4999, type: 'ultimate', badge: 'Best Value', description: 'Ultimate career transformation', features: ['ATS Resume', 'LinkedIn Profile', 'Portfolio Website', 'Cover Letter', 'Interview Prep', 'Job Support', 'Unlimited Revisions'], best: true, cta: 'Transform Career' },
];

const faqs = [
  { q: 'How long does it take?', a: 'Most services take 2-5 business days. We also offer express 24-hour delivery for an additional fee.' },
  { q: 'Do you offer revisions?', a: 'Yes! All plans include revisions. Higher plans include more revisions, and the Ultimate plan has unlimited revisions.' },
  { q: 'What if I\'m not satisfied?', a: 'We offer a 100% satisfaction guarantee. We\'ll keep revising until you\'re happy, or provide a full refund.' },
  { q: 'How do I share my existing resume?', a: 'After payment, you\'ll receive a form to share your current resume, job targets, and career goals.' },
  { q: 'Do you work for all industries?', a: 'Yes! We\'ve worked across IT, Finance, Marketing, Sales, Healthcare, Engineering, and more.' },
];

export default function Pricing() {
  const [plans, setPlans] = useState(defaultPlans);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    plansAPI.getAll().then(res => {
      if (res.data?.data?.length) setPlans(res.data.data);
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#060612] pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="glow-orb w-96 h-96 bg-purple-600 top-0 left-1/3 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-tag mx-auto w-fit mb-4">Transparent Pricing</div>
          <h1 className="text-5xl font-black text-white mb-4">Simple <span className="gradient-text">Plans</span> for Every Stage</h1>
          <p className="text-slate-400 max-w-lg mx-auto">No hidden fees. No subscriptions. Pay once, get hired faster.</p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className={`relative glass rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 ${(plan as any).best ? 'border-purple-500/50 shadow-xl shadow-purple-500/20' : (plan as any).popular ? 'border-pink-500/30' : ''}`}>
                {(plan as any).best && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="glow" className="shadow-lg">⭐ {plan.badge}</Badge>
                  </div>
                )}
                {!(plan as any).best && plan.badge && (
                  <div className="mb-3">
                    <Badge variant={(plan as any).popular ? 'default' : 'secondary'}>{plan.badge}</Badge>
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-5">{plan.description}</p>

                <div className="mb-6">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-black gradient-text">FREE</span>
                  ) : (
                    <div>
                      <span className="text-4xl font-black text-white">₹{plan.price.toLocaleString('en-IN')}</span>
                      <span className="text-slate-400 text-sm ml-1">one-time</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5 mb-8 flex-1">
                  {plan.features?.map((f: string) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>

                <Link to={plan.price === 0 ? '/contact' : `/checkout?plan=${encodeURIComponent(plan.name)}&price=${plan.price}&id=${plan.id}`}>
                  <Button className="w-full" variant={(plan as any).best || (plan as any).popular ? 'glow' : 'outline'}>
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              {['100% Satisfaction Guarantee', 'Secure Payments', 'Unlimited Revisions on Top Plans', '24hr Support'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white text-center mb-10">Feature Comparison</h2>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-slate-400 font-medium text-sm">Feature</th>
                    {plans.map(p => <th key={p.id} className="p-4 text-sm font-semibold text-white">{p.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['ATS Resume', false, true, true, true],
                    ['Cover Letter', false, true, true, true],
                    ['LinkedIn Profile', false, false, true, true],
                    ['Portfolio Website', false, false, false, true],
                    ['Interview Prep', false, false, false, true],
                    ['Job Support', false, false, false, true],
                    ['Revisions', '—', '2', '3', 'Unlimited'],
                  ].map(([feature, ...vals]) => (
                    <tr key={feature as string} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="p-4 text-slate-300 text-sm">{feature}</td>
                      {vals.map((v, i) => (
                        <td key={i} className="p-4 text-center">
                          {v === true ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> :
                           v === false ? <span className="text-slate-600">—</span> :
                           <span className="text-purple-400 font-semibold text-sm">{v}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-white text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-white font-medium">{q}</span>
                  <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${openFaq === i ? 'text-purple-400' : 'text-slate-500'}`} />
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
