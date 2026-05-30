'use client'

import { motion } from 'framer-motion'
import { Upload, Palette, Sparkles, Package } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Share Your Memories',
    description: 'Upload your favorite photos and tell us your story. Add captions, dates, and special notes to each memory.',
    icon: Upload,
  },
  {
    id: 2,
    title: 'Choose Your Aesthetic',
    description: 'Pick from our curated themes, color palettes, and layouts. Customize every detail to match your vision.',
    icon: Palette,
  },
  {
    id: 3,
    title: 'We Design Your Magazine',
    description: 'Our design team crafts a beautiful, professional layout. We send you a preview for revisions.',
    icon: Sparkles,
  },
  {
    id: 4,
    title: 'Receive Your Keepsake',
    description: 'Beautifully printed and delivered to your door in premium quality. Your memories, forever.',
    icon: Package,
  },
]

const TimelineStep = ({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0]
  index: number
  isLast: boolean
}) => {
  const IconComponent = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="relative"
    >
      {/* Mobile Timeline */}
      <div className="lg:hidden">
        <div className="flex gap-4 mb-8">
          <div className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg mb-4"
            >
              <IconComponent className="w-8 h-8" />
            </motion.div>
            {!isLast && (
              <div className="w-1 h-12 bg-linear-to-b from-primary to-accent opacity-50" />
            )}
          </div>
          <div className="pt-2">
            <h3 className="text-lg font-display font-bold text-foreground mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        </div>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden lg:block">
        <div className={`flex items-start gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
          {/* Content */}
          <div className="flex-1">
            <motion.div
              whileHover={{ x: index % 2 === 1 ? 10 : -10 }}
              className="p-6 card-premium"
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          </div>

          {/* Icon & Connector */}
          <div className="shrink-0 flex flex-col items-center pt-2">
            <motion.div
              whileHover={{ scale: 1.15, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white shadow-xl mb-4 z-10 relative"
            >
              <IconComponent className="w-10 h-10" />
            </motion.div>

            {!isLast && (
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
                className="w-1 h-24 bg-linear-to-b from-primary via-accent to-primary origin-top"
              />
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />
        </div>
      </div>
    </motion.div>
  )
}

export function HowItWorks() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance-heading">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From your favorite photos to your hands in just a few simple steps
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12 lg:space-y-16">
          {steps.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <a href="#contact" className="btn-primary inline-block">
            Start Creating Now
          </a>
        </motion.div>
      </div>
    </section>
  )
}
