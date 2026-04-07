import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, HelpCircle, ChevronDown, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { plansAPI } from '../lib/api';

const defaultPlans = [
  {
    id: 1, name: 'Resume Audit', price: 0, badge: 'Free',
    description: 'Get started with a professional review',
    features: ['Free Resume Review', 'ATS Score Check', 'Keyword Analysis', 'Basic Format Check'],
    cta: 'Get Free Audit', popular: false, best: false,
  },
  {
    id: 2, name: 'ATS Optimization', price: 1999, badge: 'Popular',
    description: 'Professional ATS-optimized resume',
    features: ['ATS Resume Rewrite', 'Cover Letter', 'Keyword Optimization', 'Format Fix', '2 Revisions'],
    cta: 'Get Started', popular: true, best: false,
  },
  {
    id: 3, name: 'Profile Package', price: 2999, badge: 'Value',
    description: 'Complete career profile package',
    features: ['ATS Resume', 'LinkedIn Profile', 'Cover Letter', 'Portfolio Setup', '3 Revisions'],
    cta: 'Get Package', popular: false, best: false,
  },
  {
    id: 4, name: 'Complete Career', price: 4999, badge: 'Best Value',
    description: 'Ultimate career transformation',
    features: ['ATS Resume', 'LinkedIn Profile', 'Portfolio Website', 'Cover Letter', 'Interview Prep', 'Job Support', 'Unlimited Revisions'],
    cta: 'Transform Career', popular: false, best: true,
  },
];

const faqs = [
  { q: 'How long does it take?',               a: 'Most services take 2–5 business days. We also offer express 24-hour delivery for an additional fee.' },
  { q: 'Do you offer revisions?',              a: 'Yes! All plans include revisions. Higher plans include more revisions, and the Ultimate plan has unlimited revisions.' },
  { q: "What if I'm not satisfied?",           a: "We offer a 100% satisfaction guarantee. We'll keep revising until you're happy, or provide a full refund." },
  { q: 'How do I share my existing resume?',   a: "After payment, you'll receive a form to share your current resume, job targets, and career goals." },
  { q: 'Do you work for all industries?',      a: "Yes! We've worked across IT, Finance, Marketing, Sales, Healthcare, Engineering, and more." },
];

const tableRows: [string, ...(boolean | string)[]][] = [
  ['ATS Resume',       false, true,  true,  true],
  ['Cover Letter',     false, true,  true,  true],
  ['LinkedIn Profile', false, false, true,  true],
  ['Portfolio Website',false, false, false, true],
  ['Interview Prep',   false, false, false, true],
  ['Job Support',      false, false, false, true],
  ['Revisions',        '—',   '2',   '3',   '∞'],
];

const guarantees = ['100% Satisfaction Guarantee', 'Secure Payments', 'Unlimited Revisions on Top Plans', '24hr Support'];

export default function Pricing() {
  const [plans, setPlans]     = useState(defaultPlans);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    plansAPI.getAll().then(r => { if (r.data?.data?.length) setPlans(r.data.data); }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#0F172A' }}>

      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="glow-orb w-96 h-96 bg-[#6C63FF] -top-20 left-1/3" style={{ opacity: 0.08 }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-tag mx-auto w-fit mb-4">Transparent Pricing</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Simple <span className="gradient-text">Plans</span> for Every Stage
          </h1>
          <p style={{ color: '#94A3B8' }} className="max-w-lg mx-auto text-lg">
            No hidden fees. No subscriptions. Pay once, get hired faster.
          </p>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map(plan => (
              <div
                key={plan.id}
                className="relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: plan.best ? 'linear-gradient(145deg, #1f2b45, #1a2540)' : '#1E293B',
                  border: plan.best
                    ? '1.5px solid rgba(108,99,255,0.55)'
                    : plan.popular
                    ? '1px solid rgba(0,201,167,0.35)'
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: plan.best ? '0 0 40px rgba(108,99,255,0.18)' : 'none',
                }}
              >
                {/* Best Value ribbon */}
                {plan.best && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className="inline-flex items-center gap-1 text-white text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #6C63FF, #00C9A7)' }}
                    >
                      <Zap className="w-3 h-3" /> Best Value
                    </span>
                  </div>
                )}

                {/* Badge */}
                <div className="mb-4 mt-2">
                  {plan.best
                    ? <Badge variant="glow">{plan.badge}</Badge>
                    : plan.popular
                    ? <Badge variant="teal">{plan.badge}</Badge>
                    : <Badge variant="secondary">{plan.badge}</Badge>}
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm mb-5" style={{ color: '#94A3B8' }}>{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-black gradient-text">FREE</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">₹{plan.price.toLocaleString('en-IN')}</span>
                      <span className="text-sm" style={{ color: '#64748B' }}>one-time</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features?.map((f: string) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#00C9A7' }} />
                      <span className="text-sm" style={{ color: '#E2E8F0' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.price === 0
                    ? '/contact'
                    : `/checkout?plan=${encodeURIComponent(plan.name)}&price=${plan.price}&id=${plan.id}`}
                >
                  <Button
                    className="w-full"
                    variant={plan.best || plan.popular ? 'glow' : 'outline'}
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Guarantees */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {guarantees.map(item => (
              <div key={item} className="flex items-center gap-2 text-sm" style={{ color: '#94A3B8' }}>
                <Check className="w-4 h-4" style={{ color: '#00C9A7' }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            Feature <span className="gradient-text">Comparison</span>
          </h2>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px]">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th className="text-left p-4 text-sm font-medium w-40" style={{ color: '#64748B' }}>Feature</th>
                    {plans.map(p => (
                      <th key={p.id} className="p-4 text-sm font-semibold text-center text-white">{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map(([feature, ...vals]) => (
                    <tr key={feature as string} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                      className="transition-colors hover:bg-white/[0.02]">
                      <td className="p-4 text-sm" style={{ color: '#94A3B8' }}>{feature}</td>
                      {vals.map((v, i) => (
                        <td key={i} className="p-4 text-center">
                          {v === true  ? <Check className="w-4 h-4 mx-auto" style={{ color: '#00C9A7' }} /> :
                           v === false ? <span style={{ color: '#334155' }}>—</span> :
                           <span className="text-sm font-bold gradient-text">{v}</span>}
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

      {/* ── FAQ ── */}
      <section className="py-16 pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white font-medium text-sm">{q}</span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    style={{ color: openFaq === i ? '#6C63FF' : '#64748B' }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFaq === i ? '200px' : '0' }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
