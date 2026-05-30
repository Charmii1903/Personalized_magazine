'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'About', href: '#categories' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleMobileNavigation = (href: string) => {
    setIsMobileMenuOpen(false)

    setTimeout(() => {
      const targetId = href.replace('#', '')
      const element = document.getElementById(targetId)

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 100)
  }

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'navbar-blur' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-20 py-2 relative flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors z-50"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>

          {/* Logo */}
          <Link
            href="#home"
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="https://res.cloudinary.com/djjrhbo0g/image/upload/v1780056178/magazine/logo_wcvsue.png"
                alt="Memories & All Logo"
                width={250}
                height={100}
                priority
                className="object-contain hover:scale-105 transition-transform duration-300 sm:ml-20 w-130px sm:w-150px lg:w-180px h-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10 ml-20">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-base lg:text-[17px] tracking-wide font-medium text-foreground hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </motion.a>
            ))}

            {/* Desktop CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Order Now
            </motion.a>
          </div>

          {/* Empty div for mobile spacing */}
          <div className="w-10 lg:hidden" />
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-background pt-24"
          >
            <div className="flex flex-col px-6 py-8 space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleMobileNavigation(item.href)}
                  className="text-left text-lg font-medium tracking-wide text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => handleMobileNavigation('#contact')}
                className="mt-6 w-full px-6 py-3 rounded-full bg-primary text-white text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}