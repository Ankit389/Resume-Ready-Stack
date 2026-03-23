import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import About from '../components/About'
import Services from '../components/Services'
import PaymentPlans from '../components/PaymentPlans'
import WhyChooseMe from '../components/WhyChooseMe'
import Proof from '../components/Proof'
import ClientScroll from '../components/ClientScroll'
import Process from '../components/Process'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <PaymentPlans />
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


