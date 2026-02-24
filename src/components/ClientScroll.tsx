import './ClientScroll.css'

interface Client {
  name: string
  company: string
}

function ClientScroll() {
  const clients: Client[] = [
    { name: 'Gaurav Seni', company: 'Accenture' },
    { name: 'Om Shankar Shukla', company: 'Medianv' },
    { name: 'Avya sadh', company: 'Infosys' },
    { name: 'Kalawati Pankaj', company: 'McCain' },
    { name: 'Manish', company: 'Bosch' }
  ]

  // Duplicate the array for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients]

  return (
    <section className="client-scroll-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Clients Successfully Shortlisted</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="marquee-container">
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {duplicatedClients.map((client, index) => (
                <div key={index} className="client-item">
                  <span className="client-name">{client.name}</span>
                  <span className="client-divider">•</span>
                  <span className="client-company">{client.company}</span>
                </div>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="marquee-content" aria-hidden="true">
              {duplicatedClients.map((client, index) => (
                <div key={`duplicate-${index}`} className="client-item">
                  <span className="client-name">{client.name}</span>
                  <span className="client-divider">•</span>
                  <span className="client-company">{client.company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="client-disclaimer">
          Client names displayed with consent. Full resume and personal details are kept confidential.
        </p>
      </div>
    </section>
  )
}

export default ClientScroll









