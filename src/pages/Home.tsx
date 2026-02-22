import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Pricing from '../components/Pricing'
import WhyChooseMe from '../components/WhyChooseMe'
import Proof from '../components/Proof'
import ClientScroll from '../components/ClientScroll'
import Process from '../components/Process'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="home">
      <Hero />
      <About />
      <Services />
      <Pricing />
      <WhyChooseMe />
      <Proof />
      <ClientScroll />
      <Process />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home


