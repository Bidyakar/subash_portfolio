import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Awards from './components/Awards'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Subash S Sapkota',
    jobTitle: 'Youth Leader & Marketing Professional',
    url: 'https://subashssapkota.com.np',
    description: 'Youth Leader and Marketing Professional focused on building communities and driving social change.',
    knowsAbout: [
      'Marketing Strategy',
      'Community Leadership',
      'Youth Empowerment',
      'Public Speaking',
      'Event Management',
      'Social Work',
      'Team Building',
      'Rotary Club of Matribhumi Baluwatar',
      'Sayathari Media Pvt. Ltd.',
      'Map Entrepreneurs Pvt. Ltd.',
      'Youthful Voice',
      'SSeries'

    ],
    sameAs: [
      'https://www.linkedin.com/in/subashssapkota/',
      'https://www.instagram.com/subashssapkota/',
    ]
  }

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Awards />
      <Contact />
      <Footer />
    </main>
  )
}