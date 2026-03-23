// import { useState } from 'react'
// import './ProfessionalServices.css'

// interface Service {
//   id: string
//   name: string
//   icon: string
//   originalPrice: number
//   currentPrice: number
//   description: string
//   detailedDescription: string
//   benefits: string[]
//   features: string[]
//   whyImportant: string
//   process: string[]
//   deliveryTime: string
//   revisions: number
//   color: string
//   badge?: string
//   popular?: boolean
// }

// function ProfessionalServices() {
//   const [selectedCategory, setSelectedCategory] = useState('all')
//   const [expandedService, setExpandedService] = useState<string | null>(null)

//   const services: Service[] = [
//     {
//       id: 'ats-resume',
//       name: 'ATS Resume Writing',
//       icon: '📄',
//       originalPrice: 1000,
//       currentPrice: 899,
//       description: 'Professional ATS-optimized resumes that get you shortlisted',
//       detailedDescription: 'Our ATS-optimized resumes are designed to pass through automated screening systems used by 90% of Fortune 500 companies. We use industry-specific keywords and formatting that ensures your resume gets noticed by recruiters.',
//       benefits: [
//         '90% higher chance of getting shortlisted',
//         'Passes ATS screening easily',
//         'Industry-specific keywords',
//         'Professional formatting',
//         'Increased interview calls'
//       ],
//       features: [
//         'ATS-friendly formatting',
//         'Keyword optimization',
//         'Professional layout design',
//         'Industry-specific content',
//         'PDF & Word formats',
//         'Email support'
//       ],
//       whyImportant: 'In today\'s competitive job market, 75% of resumes are rejected by ATS before they even reach human recruiters. Our ATS-optimized resumes ensure you pass this first critical screening.',
//       process: [
//         'Initial consultation call',
//         'Current resume analysis',
//         'Keyword research for your industry',
//         'Draft resume creation',
//         'ATS testing and optimization',
//         'Final delivery with revisions'
//       ],
//       deliveryTime: '2-3 working days',
//       revisions: 2,
//       color: 'blue',
//       badge: 'MOST POPULAR',
//       popular: true
//     },
//     {
//       id: 'cover-letter',
//       name: 'Cover Letter Writing',
//       icon: '✉️',
//       originalPrice: 499,
//       currentPrice: 399,
//       description: 'Compelling cover letters that make recruiters want to meet you',
//       detailedDescription: 'A well-written cover letter can increase your chances of getting an interview by 40%. Our professional cover letters are tailored to specific job applications and highlight your unique value proposition.',
//       benefits: [
//         '40% higher interview rate',
//         'Personalized for each application',
//         'Shows your personality',
//         'Highlights key achievements',
//         'Professional storytelling'
//       ],
//       features: [
//         'Job-specific customization',
//         'Professional tone and style',
//         'Achievement-focused content',
//         'ATS-optimized formatting',
//         'Word and PDF formats',
//         'Quick delivery'
//       ],
//       whyImportant: 'Cover letters give you the opportunity to tell your story and explain gaps or career changes that resumes can\'t convey. They show initiative and genuine interest in the position.',
//       process: [
//         'Job description analysis',
//         'Your background review',
//         'Key achievements identification',
//         'Draft cover letter creation',
//         'Professional editing',
//         'Final polished version'
//       ],
//       deliveryTime: '1-2 working days',
//       revisions: 1,
//       color: 'purple'
//     },
//     {
//       id: 'job-profile-optimization',
//       name: 'All Job Profile Optimization',
//       icon: '🌐',
//       originalPrice: 2499,
//       currentPrice: 1999,
//       description: 'Complete optimization for LinkedIn, Naukri, Indeed, Internshala & OKRemote',
//       detailedDescription: 'Maximize your visibility across all major job portals with our comprehensive profile optimization service. We optimize your profiles to attract recruiters and increase job opportunities by 300%.',
//       benefits: [
//         '300% more recruiter views',
//         'Higher ranking in job searches',
//         'Professional online presence',
//         'Consistent branding',
//         'More interview opportunities'
//       ],
//       features: [
//         'LinkedIn profile optimization',
//         'Naukri.com profile enhancement',
//         'Indeed profile setup',
//         'Internshala optimization',
//         'OKRemote profile creation',
//         'Profile photo guidance',
//         'Skills endorsement strategy',
//         'Recommendation requests'
//       ],
//       whyImportant: '85% of recruiters use LinkedIn to find candidates. Optimized profiles across multiple platforms increase your visibility and chances of being discovered by recruiters actively looking for talent.',
//       process: [
//         'Current profile audit',
//         'Keyword research for your industry',
//         'Profile content creation',
//         'Professional headline optimization',
//         'Skills and endorsements setup',
//         'Profile completion across all platforms'
//       ],
//       deliveryTime: '3-4 working days',
//       revisions: 2,
//       color: 'green',
//       badge: 'BEST VALUE'
//     },
//     {
//       id: 'portfolio-website',
//       name: 'Portfolio Website',
//       icon: '🎨',
//       originalPrice: 0,
//       currentPrice: 0,
//       description: 'Professional portfolio website to showcase your work',
//       detailedDescription: 'Stand out from the competition with a professional portfolio website. Perfect for creative professionals, freelancers, and anyone wanting to showcase their work and achievements visually.',
//       benefits: [
//         'Professional online presence',
//         'Showcase your best work',
//         'Impress potential employers',
//         'Build personal brand',
//         'Shareable portfolio link'
//       ],
//       features: [
//         'Modern responsive design',
//         'Mobile-friendly layout',
//         'Contact form integration',
//         'Social media links',
//         'Gallery for work samples',
//         'About section',
//         'SEO optimization',
//         'Domain setup guidance'
//       ],
//       whyImportant: 'Having a portfolio website makes you look professional and serious about your career. It\'s 24/7 accessible and shows your work in the best possible light.',
//       process: [
//         'Design consultation',
//         'Content gathering',
//         'Website development',
//         'Mobile optimization',
//         'Testing and review',
//         'Launch and training'
//       ],
//       deliveryTime: '5-7 working days',
//       revisions: 3,
//       color: 'orange'
//     },
//     {
//       id: 'personal-website',
//       name: 'Personal Website',
//       icon: '💻',
//       originalPrice: 0,
//       currentPrice: 0,
//       description: 'Complete personal website with advanced features',
//       detailedDescription: 'Transform your online presence with a professional personal website that includes blog, portfolio, contact forms, and advanced features to establish your authority in your field.',
//       benefits: [
//         'Establish professional authority',
//         'Complete online branding',
//         'Lead generation tool',
//         'Career advancement platform',
//         'Networking hub'
//       ],
//       features: [
//         'Custom design and branding',
//         'Blog functionality',
//         'Portfolio/gallery',
//         'Contact forms',
//         'Social media integration',
//         'SEO optimization',
//         'Analytics setup',
//         'Email newsletter integration',
//         'Mobile responsive',
//         'Fast loading speed'
//       ],
//       whyImportant: 'A personal website is your digital headquarters. It helps you build authority, attract opportunities, and create a professional brand that works for you 24/7.',
//       process: [
//         'Strategy consultation',
//         'Design mockups',
//         'Content planning',
//         'Website development',
//         'Testing and optimization',
//         'Training and handover',
//         'One-on-one consultation meeting'
//       ],
//       deliveryTime: '7-10 working days',
//       revisions: 5,
//       color: 'red',
//       badge: 'PREMIUM'
//     }
//   ]

//   const portfolioPricing = [
//     {
//       type: 'Basic Portfolio',
//       price: 1499,
//       features: [
//         '5-page website',
//         'Responsive design',
//         'Contact form',
//         'Gallery section',
//         'Basic SEO',
//         '1 revision'
//       ]
//     },
//     {
//       type: 'Professional Portfolio',
//       price: 2499,
//       features: [
//         '10-page website',
//         'Advanced design',
//         'Blog functionality',
//         'Portfolio gallery',
//         'Social media integration',
//         'Advanced SEO',
//         'Analytics setup',
//         '3 revisions'
//       ]
//     }
//   ]

//   const personalWebsitePricing = [
//     {
//       type: 'Basic Personal Website',
//       price: 1999,
//       features: [
//         'Custom design',
//         '7-page website',
//         'Blog functionality',
//         'Contact forms',
//         'Social media integration',
//         'Basic SEO',
//         '2 revisions'
//       ]
//     },
//     {
//       type: 'Advanced Personal Website',
//       price: 2999,
//       features: [
//         'Premium custom design',
//         'Unlimited pages',
//         'Advanced blog system',
//         'Newsletter integration',
//         'E-commerce capability',
//         'Advanced SEO & Analytics',
//         'Performance optimization',
//         '5 revisions',
//         'One-on-one consultation meeting',
//         'Priority support'
//       ]
//     }
//   ]

//   const getDiscountPercentage = (original: number, current: number) => {
//     if (original === 0) return 0
//     return Math.round(((original - current) / original) * 100)
//   }

//   const toggleServiceExpansion = (serviceId: string) => {
//     setExpandedService(expandedService === serviceId ? null : serviceId)
//   }

//   return (
//     <section id="services" className="professional-services">
//       <div className="container">
//         <div className="services-header">
//           <div className="services-badge">PROFESSIONAL SERVICES</div>
//           <h2 className="services-title">Transform Your Career with Our Expert Services</h2>
//           <p className="services-subtitle">
//             Industry-leading career services designed to help you land your dream job faster
//           </p>
//         </div>

//         <div className="services-grid">
//           {services.map((service) => (
//             <div
//               key={service.id}
//               className={`service-card ${service.popular ? 'popular' : ''}`}
//             >
//               {service.badge && (
//                 <div className="service-badge-card">{service.badge}</div>
//               )}
              
//               <div className="service-header">
//                 <div className="service-icon">{service.icon}</div>
//                 <h3 className="service-name">{service.name}</h3>
//                 <p className="service-description">{service.description}</p>
//               </div>

//               <div className="service-pricing">
//                 {service.originalPrice > 0 && (
//                   <div className="original-price">₹{service.originalPrice.toLocaleString('en-IN')}</div>
//                 )}
//                 <div className="current-price">
//                   ₹{service.currentPrice.toLocaleString('en-IN')}
//                   {service.originalPrice > 0 && (
//                     <span className="discount-badge">
//                       {getDiscountPercentage(service.originalPrice, service.currentPrice)}% OFF
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="service-content">
//                 <div className="service-benefits">
//                   <h4>Key Benefits:</h4>
//                   <ul className="benefits-list">
//                     {service.benefits.map((benefit, index) => (
//                       <li key={index} className="benefit-item">
//                         <span className="benefit-icon">✓</span>
//                         <span>{benefit}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="why-important">
//                   <h4>Why This Service is Important:</h4>
//                   <p>{service.whyImportant}</p>
//                 </div>

//                 <button
//                   className="expand-button"
//                   onClick={() => toggleServiceExpansion(service.id)}
//                 >
//                   {expandedService === service.id ? 'Show Less' : 'Know More'}
//                   <span className={`expand-icon ${expandedService === service.id ? 'expanded' : ''}`}>▼</span>
//                 </button>

//                 {expandedService === service.id && (
//                   <div className="service-details">
//                     <div className="detailed-description">
//                       <h4>Detailed Description:</h4>
//                       <p>{service.detailedDescription}</p>
//                     </div>

//                     <div className="service-features">
//                       <h4>What's Included:</h4>
//                       <ul className="features-list">
//                         {service.features.map((feature, index) => (
//                           <li key={index} className="feature-item">
//                             <span className="feature-check">✓</span>
//                             <span>{feature}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <div className="service-process">
//                       <h4>Our Process:</h4>
//                       <div className="process-steps">
//                         {service.process.map((step, index) => (
//                           <div key={index} className="process-step">
//                             <div className="step-number">{index + 1}</div>
//                             <div className="step-content">{step}</div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="service-delivery">
//                       <div className="delivery-info">
//                         <span className="delivery-label">Delivery Time:</span>
//                         <span className="delivery-value">{service.deliveryTime}</span>
//                       </div>
//                       <div className="revisions-info">
//                         <span className="revisions-label">Revisions:</span>
//                         <span className="revisions-value">{service.revisions} included</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <button className="service-button">
//                   Get Started - ₹{service.currentPrice.toLocaleString('en-IN')}
//                 </button>
//               </div>

//               {service.popular && (
//                 <div className="popular-ribbon">
//                   <span>POPULAR</span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Portfolio Website Pricing */}
//         <div className="pricing-section">
//           <h3 className="pricing-section-title">Portfolio Website Pricing</h3>
//           <div className="pricing-cards">
//             {portfolioPricing.map((plan, index) => (
//               <div key={index} className="pricing-card">
//                 <h4 className="plan-name">{plan.type}</h4>
//                 <div className="plan-price">₹{plan.price.toLocaleString('en-IN')}</div>
//                 <ul className="plan-features">
//                   {plan.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="plan-feature">
//                       <span className="feature-check">✓</span>
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <button className="plan-button">Choose Plan</button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Personal Website Pricing */}
//         <div className="pricing-section">
//           <h3 className="pricing-section-title">Personal Website Pricing</h3>
//           <div className="pricing-cards">
//             {personalWebsitePricing.map((plan, index) => (
//               <div key={index} className="pricing-card">
//                 <h4 className="plan-name">{plan.type}</h4>
//                 <div className="plan-price">₹{plan.price.toLocaleString('en-IN')}</div>
//                 <ul className="plan-features">
//                   {plan.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="plan-feature">
//                       <span className="feature-check">✓</span>
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <button className="plan-button">Choose Plan</button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="services-footer">
//           <div className="trust-indicators">
//             <div className="trust-item">
//               <span className="trust-icon">🏆</span>
//               <div className="trust-content">
//                 <h4>Expert Professionals</h4>
//                 <p>Industry-certified experts with 10+ years experience</p>
//               </div>
//             </div>
//             <div className="trust-item">
//               <span className="trust-icon">⚡</span>
//               <div className="trust-content">
//                 <h4>Fast Delivery</h4>
//                 <p>Quick turnaround without compromising quality</p>
//               </div>
//             </div>
//             <div className="trust-item">
//               <span className="trust-icon">💯</span>
//               <div className="trust-content">
//                 <h4>Satisfaction Guaranteed</h4>
//                 <p>100% satisfaction or money-back guarantee</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default ProfessionalServices
