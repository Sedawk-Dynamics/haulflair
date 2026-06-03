import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { TrustBar } from '@/components/trust-bar'
import { About } from '@/components/about'
import { Services } from '@/components/services'
import { WhyUs } from '@/components/why-us'
import { MissionVision } from '@/components/mission-vision'
import { Values } from '@/components/values'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <WhyUs />
      <MissionVision />
      <Values />
      <Contact />
      <Footer />
    </main>
  )
}
