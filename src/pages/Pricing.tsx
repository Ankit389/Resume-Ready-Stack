import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ChevronDown, Zap } from 'lucide-react';
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
  { q: 'How long does it take?',              a: 'Most services take 2–5 business days. Express 24-hour delivery also available for an additional fee.' },
  { q: 'Do you offer revisions?',             a: 'Yes! All plans include revisions. The Ultimate plan has unlimited revisions.' },
  { q: "What if I'm not satisfied?",          a: "We offer a 100% satisfaction guarantee — unlimited revisions until you're happy, or a full refund." },
  { q: 'How do I share my existing resume?',  a: "After payment, you'll receive a form to share your current resume, job targets, and career goals." },
  { q: 'Do you work for all industries?',     a: "Yes! IT, Finance, Marketing, Sales, Healthcare, Engineering and more — we've covered them all." },
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

const guarantees = [
  '100% Satisfaction Guarantee',
  'Secure Payments',
  'Unlimited Revisions on Top Plans',
  '24hr Support',
];

const CARD: React.CSSProperties = {
  background: '#1E293B',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
};

export default function Pricing() {
  const [plans, setPlans]     = useState(defaultPlans);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    plansAPI.getAll().then(r => {
      if (r.data?.data?.length) setPlans(r.data.data);
    }).catch(() => {});
  }, []);

  return (
    <div style={{ background: '#0F172A', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section
        className="relative"
        style={{ paddingTop: '72px', paddingBottom: '48px', overflow: 'hidden' }}
      >
        <div className="glow-orb" style={{ width: 380, height: 380, background: '#6C63FF', top: -80, left: '30%', opacity: 0.08 }} />
        <div className="container-page" style={{ textAlign: 'center' }}>
          <div className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>
            Transparent Pricing
          </div>
          <h1 className="heading-xl" style={{ marginBottom: 16 }}>
            Simple <span className="gradient-text">Plans</span> for Every Stage
          </h1>
          <p className="body-lg" style={{ maxWidth: 520, margin: '0 auto' }}>
            No hidden fees. No subscriptions. Pay once, get hired faster.
          </p>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section style={{ paddingBottom: 64 }}>
        <div className="container-page">
          <div className="pricing-grid">
            {plans.map(plan => (
              <div
                key={plan.id}
                style={{
                  ...CARD,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '24px',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  ...(plan.best ? {
                    border: '1.5px solid rgba(108,99,255,0.55)',
                    boxShadow: '0 0 40px rgba(108,99,255,0.15)',
                    background: 'linear-gradient(160deg, #1f2b45, #1a2540)',
                  } : plan.popular ? {
                    border: '1px solid rgba(0,201,167,0.35)',
                  } : {}),
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                {/* Best Value ribbon */}
                {plan.best && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      background: 'linear-gradient(135deg, #6C63FF, #00C9A7)',
                      color: '#fff', fontSize: '0.72rem', fontWeight: 700,
                      padding: '4px 12px', borderRadius: 99,
                      whiteSpace: 'nowrap',
                    }}>
                      <Zap style={{ width: 11, height: 11 }} /> Best Value
                    </span>
                  </div>
                )}

                {/* Badge */}
                <div style={{ marginBottom: 12, marginTop: plan.best ? 8 : 0 }}>
                  {plan.best
                    ? <Badge variant="glow">{plan.badge}</Badge>
                    : plan.popular
                    ? <Badge variant="teal">{plan.badge}</Badge>
                    : <Badge variant="secondary">{plan.badge}</Badge>}
                </div>

                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>{plan.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: 20, lineHeight: 1.5 }}>{plan.description}</p>

                {/* Price */}
                <div style={{ marginBottom: 20 }}>
                  {plan.price === 0
                    ? <span className="gradient-text" style={{ fontSize: '2.2rem', fontWeight: 900 }}>FREE</span>
                    : <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>
                          ₹{plan.price.toLocaleString('en-IN')}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>one-time</span>
                      </div>
                  }
                </div>

                {/* Features */}
                <ul style={{ listStyle: 'none', flexGrow: 1, marginBottom: 24 }}>
                  {plan.features?.map((f: string) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                      <Check style={{ width: 16, height: 16, color: '#00C9A7', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: '0.875rem', color: '#E2E8F0' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.price === 0
                    ? '/contact'
                    : `/checkout?plan=${encodeURIComponent(plan.name)}&price=${plan.price}&id=${plan.id}`}
                  style={{ display: 'block' }}
                >
                  <Button
                    className="w-full"
                    variant={plan.best || plan.popular ? 'glow' : 'outline'}
                  >
                    {plan.cta} <ArrowRight style={{ width: 15, height: 15 }} />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Guarantees */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '16px 32px', marginTop: 40,
          }}>
            {guarantees.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8', fontSize: '0.875rem' }}>
                <Check style={{ width: 16, height: 16, color: '#00C9A7', flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-page">
          <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: 40 }}>
            Feature <span className="gradient-text">Comparison</span>
          </h2>
          <div style={{ ...CARD, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: 540, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '0.8rem', color: '#64748B', fontWeight: 500, width: '30%' }}>
                      Feature
                    </th>
                    {plans.map(p => (
                      <th key={p.id} style={{ padding: '14px 12px', fontSize: '0.82rem', fontWeight: 600, color: '#E2E8F0', textAlign: 'center' }}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map(([feature, ...vals]) => (
                    <tr
                      key={feature as string}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <td style={{ padding: '12px 20px', fontSize: '0.875rem', color: '#94A3B8' }}>{feature}</td>
                      {vals.map((v, i) => (
                        <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                          {v === true
                            ? <Check style={{ width: 16, height: 16, color: '#00C9A7', margin: '0 auto' }} />
                            : v === false
                            ? <span style={{ color: '#334155' }}>—</span>
                            : <span className="gradient-text" style={{ fontSize: '0.85rem', fontWeight: 700 }}>{v}</span>}
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
      <section style={{ paddingTop: 64, paddingBottom: 96 }}>
        <div className="container-narrow">
          <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: 40 }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map(({ q, a }, i) => (
              <div key={i} style={{ ...CARD, overflow: 'hidden' }}>
                <button
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', padding: '18px 20px',
                    textAlign: 'left', cursor: 'pointer', gap: 16,
                    background: 'transparent', border: 'none',
                  }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span style={{ color: '#E2E8F0', fontWeight: 500, fontSize: '0.9rem' }}>{q}</span>
                  <ChevronDown
                    style={{
                      width: 16, height: 16, flexShrink: 0,
                      color: openFaq === i ? '#6C63FF' : '#64748B',
                      transform: openFaq === i ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>
                <div style={{
                  maxHeight: openFaq === i ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  <p style={{ padding: '0 20px 18px', fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.7 }}>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
