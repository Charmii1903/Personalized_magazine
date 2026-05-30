'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const pricingTiers = [
  {
    id: 1,
    name: 'Mini Edition',
    price: '₹2,999',
    description: 'Perfect for small collections',
    features: [
      'Up to 30 photos',
      '20 pages',
      '3 theme options',
      'Standard binding',
      '7-10 business days',
      'Basic customization',
    ],
    featured: false,
  },
  {
    id: 2,
    name: 'Premium Edition',
    price: '₹5,999',
    description: 'Most popular choice',
    features: [
      'Up to 100 photos',
      '48 pages',
      'Unlimited themes',
      'Premium binding',
      '5-7 business days',
      'Full customization',
      'Free revisions',
      'Premium paper quality',
    ],
    featured: true,
  },
  {
    id: 3,
    name: 'Luxury Edition',
    price: '₹9,999',
    description: 'The ultimate keepsake',
    features: [
      'Unlimited photos',
      'Up to 100 pages',
      'Bespoke design',
      'Leather binding',
      '3-5 business days (rush)',
      'White-glove service',
      'Unlimited revisions',
      'Luxury paper & finishes',
      'Gift box packaging',
    ],
    featured: false,
  },
]

const PricingCard = ({
  tier,
  index,
}: {
  tier: (typeof pricingTiers)[0]
  index: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={tier.featured ? { scale: 1 } : { scale: 1.02 }}
      className={`relative rounded-2xl transition-all duration-300 ${
        tier.featured
          ? 'ring-2 ring-primary bg-card shadow-2xl'
          : 'bg-card border border-border hover:border-primary'
      }`}
    >
      {/* Featured Badge */}
      {tier.featured && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2"
        >
          <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
            Most Popular
          </div>
        </motion.div>
      )}

      <div className="p-8 lg:p-10">
        {/* Title */}
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
          {tier.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl lg:text-6xl font-display font-bold text-primary">
              {tier.price}
            </span>
            <span className="text-muted-foreground">/ magazine</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Free shipping across India
          </p>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 mb-8 ${
            tier.featured
              ? 'bg-primary text-white hover:opacity-90'
              : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
          }`}
        >
          Get Started
        </motion.button>

        {/* Features List */}
        <div className="space-y-4 pt-8 border-t border-border">
          {tier.features.map((feature, featureIndex) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: featureIndex * 0.05 + index * 0.1,
                duration: 0.4,
              }}
              className="flex items-start gap-3"
            >
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="section-padding bg-linear-to-b from-background to-muted/20">
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect package for your memories. All prices include design, printing, and shipping.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-card rounded-2xl p-8 border border-primary/20"
        >
          <h3 className="text-2xl font-display font-bold text-foreground mb-6">
            Have Questions?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-foreground mb-2">
                Can I add more photos?
              </p>
              <p className="text-sm text-muted-foreground">
                Yes! You can add extra photos for ₹50 per photo. We&apos;ll handle the layout beautifully.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">
                Do you offer rush delivery?
              </p>
              <p className="text-sm text-muted-foreground">
                Absolutely. Contact us for rush options. Additional charges apply.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
