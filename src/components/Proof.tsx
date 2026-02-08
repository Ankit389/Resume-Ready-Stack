import './Proof.css'

function Proof() {
  const stats = [
    {
      value: '50+',
      label: 'Resumes Created',
      description: 'Professional resumes crafted for diverse industries and career levels'
    },
    {
      value: 'IT & Non-IT',
      label: 'Industry Coverage',
      description: 'Experience working with clients from technology, finance, healthcare, marketing, and more'
    },
    {
      value: 'Freshers & Professionals',
      label: 'Experience Level',
      description: 'Successfully helped both entry-level candidates and experienced professionals'
    },
    {
      value: 'Profile Optimization',
      label: 'Shortlisting Success',
      description: 'Clients report improved shortlisting rates after resume and profile optimization'
    }
  ]

  const experiencePoints = [
    {
      title: 'Diverse Client Base',
      description: 'Worked with professionals across IT sectors (Software Development, Data Science, Cloud Computing) and Non-IT sectors (Finance, Marketing, Healthcare, Education, Sales)',
      icon: '🌐'
    },
    {
      title: 'Career Stage Expertise',
      description: 'Successfully created resumes for fresh graduates entering the job market and experienced professionals seeking career advancement or transitions',
      icon: '📈'
    },
    {
      title: 'ATS-Optimized Results',
      description: 'All resumes are crafted with ATS compatibility in mind, ensuring they pass through automated screening systems effectively',
      icon: '✅'
    },
    {
      title: 'Shortlisting Improvement',
      description: 'Clients have experienced improved shortlisting rates after profile optimization, leading to more interview opportunities',
      icon: '🎯'
    }
  ]

  return (
    <section id="proof" className="proof">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Proof & Results</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Honest numbers and experience-based results that speak to my expertise
          </p>
        </div>
        
        <div className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="experience-section">
          <h3 className="experience-title">Experience & Expertise</h3>
          <div className="experience-grid">
            {experiencePoints.map((point, index) => (
              <div key={index} className="experience-card">
                <div className="experience-icon">{point.icon}</div>
                <h4 className="experience-point-title">{point.title}</h4>
                <p className="experience-point-description">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Proof


