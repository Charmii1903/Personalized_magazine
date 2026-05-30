'use client'

import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { CategoriesSection } from '@/components/categories-section'
import { HowItWorks } from '@/components/how-it-works'
import { PortfolioSection } from '@/components/portfolio-section'
// import { TestimonialsSection } from '@/components/testimonials-section'
import { FAQSection } from '@/components/faq-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { useTrackVisitor } from '@/hooks/use-track-visitor'
import { Analytics } from "@vercel/analytics/next"
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function Home() {
  useTrackVisitor('/')

  return (
    <main className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <HowItWorks />
      <PortfolioSection />
      <FAQSection />
      <ContactSection />
      <Analytics />
      <GoogleAnalytics />
      <Footer />
    </main>
  )
}
