import './Process.css'

function Process() {
  const steps = [
    {
      number: '01',
      title: 'Understanding Your Profile & Job Role',
      description: 'I start by understanding your background, skills, experience, and the specific job roles you\'re targeting. This helps me tailor your resume to match what employers are looking for.'
    },
    {
      number: '02',
      title: 'ATS Keyword & Content Optimization',
      description: 'I analyze job descriptions and optimize your resume with relevant keywords that pass through Applicant Tracking Systems. Your content is refined to highlight your most relevant achievements and skills.'
    },
    {
      number: '03',
      title: 'Structuring & Formatting Improvement',
      description: 'I restructure your resume for better readability and ATS compatibility. The formatting is improved to make your resume visually appealing while ensuring it\'s easily scannable by both systems and recruiters.'
    },
    {
      number: '04',
      title: 'Final Delivery with Revision Support',
      description: 'You receive your professionally crafted resume. I provide revision support to ensure you\'re completely satisfied with the final result before you start applying to jobs.'
    }
  ]

  return (
    <section id="process" className="process">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            A simple, straightforward process to get you a resume that stands out
          </p>
        </div>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process


