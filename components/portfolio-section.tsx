'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const portfolioItems = [
  {
    id: 1,
    title: '24th Anniversary Edition',
    category: 'Anniversary',
    color: 'from-accent/30 to-primary/20',
    image:
      'https://res.cloudinary.com/djjrhbo0g/image/upload/v1780056177/magazine/Anniversary_o2lspw.png',
    video:
      'https://res.cloudinary.com/djjrhbo0g/video/upload/v1780058002/magazine/24thann_w7sxqr.mp4',
  },

  {
    id: 2,
    title: '44th Birthday Edition',
    category: 'Birthday',
    color: 'from-primary/30 to-secondary/20',
    image:
      'https://res.cloudinary.com/djjrhbo0g/image/upload/v1780056174/magazine/Birthdayy_wnapya.png',
    pdf: '/Birthday.pdf',
  },

  {
    id: 3,
    title: '16th Anniversary Edition',
    category: 'Anniversary',
    color: 'from-secondary/30 to-accent/20',
    image:
      'https://res.cloudinary.com/djjrhbo0g/image/upload/v1780056171/magazine/anni_wo3qd0.jpg',
    video:
      'https://res.cloudinary.com/djjrhbo0g/video/upload/v1780058087/magazine/16thann_i6mw6e.mp4',
  },
]

const PortfolioCard = ({
  item,
  index,
}: {
  item: (typeof portfolioItems)[0]
  index: number
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const handleViewDetails = () => {
    setShowModal(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          delay: index * 0.1,
          duration: 0.6,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        suppressHydrationWarning
        className="group relative overflow-hidden rounded-2xl"
      >
        {/* Card Background */}
        <div
          className={`relative w-full aspect-square bg-linear-to-br ${item.color} overflow-hidden`}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.08 : 1,
              rotate: isHovered ? 2 : 0,
            }}
            transition={{ duration: 0.4 }}
            suppressHydrationWarning
            className="w-full h-full flex items-center justify-center"
          >
            {/* Magazine Image */}
            <div className="relative w-[80%] h-[85%] rounded-xl overflow-hidden shadow-2xl bg-white">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            suppressHydrationWarning
            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={
                isHovered
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.8, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              suppressHydrationWarning
              className="text-center text-white"
            >
              <button
                onClick={handleViewDetails}
                suppressHydrationWarning
                className="bg-white text-foreground px-6 py-3 rounded-xl font-medium hover:bg-muted transition-colors"
              >
                View Details
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Card Info */}
        <motion.div
          animate={{
            y: isHovered ? -8 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="p-5 bg-card border-t border-border"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-display font-bold text-foreground">
              {item.title}
            </h3>
          </div>

          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
            {item.category}
          </span>
        </motion.div>
      </motion.div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-999 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="relative bg-white rounded-2xl w-full max-w-5xl p-4 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              suppressHydrationWarning
              className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            {/* Video */}
            {item.video && (
              <video
                controls
                controlsList="nodownload"
                autoPlay
                suppressHydrationWarning
                className="w-full rounded-xl max-h-[80vh]"
              >
                <source
                  src={item.video}
                  type="video/mp4"
                />
              </video>
            )}

            {/* PDF */}
            {item.pdf && (
              <iframe
                src={item.pdf}
                suppressHydrationWarning
                className="w-full h-[80vh] rounded-xl"
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="section-padding bg-linear-to-b from-muted/20 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance-heading">
            Our Recent Creations
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the beautiful magazines we&apos;ve
            created for our clients around the world
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}