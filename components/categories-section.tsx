'use client'

import { motion } from 'framer-motion'
import { Heart, Calendar, MapPin, Gift, Users, Home } from 'lucide-react'

const categories = [
  {
    id: 1,
    title: 'Birthday Magazines',
    description: 'Celebrate special birthdays with personalized photo-filled keepsakes',
    icon: Calendar,
    color: 'from-primary/20 to-primary/5',
    accent: 'text-primary',
  },
  {
    id: 2,
    title: 'Anniversary Editions',
    description: 'Commemorate your love story with elegant anniversary albums',
    icon: Heart,
    color: 'from-accent/20 to-accent/5',
    accent: 'text-accent',
  },
  {
    id: 3,
    title: 'Travel Diaries',
    description: 'Capture your adventures in beautifully designed travel journals',
    icon: MapPin,
    color: 'from-secondary/20 to-secondary/5',
    accent: 'text-secondary',
  },
  {
    id: 4,
    title: 'Wedding Stories',
    description: 'Preserve your wedding day magic in a luxurious coffee table magazine',
    icon: Gift,
    color: 'from-primary/20 to-accent/10',
    accent: 'text-primary',
  },
  {
    id: 5,
    title: 'Friendship Memory Books',
    description: 'Honor your bonds with friends in a timeless keepsake',
    icon: Users,
    color: 'from-secondary/20 to-primary/5',
    accent: 'text-secondary',
  },
  {
    id: 6,
    title: 'Family Editions',
    description: 'Tell your family&apos;s unique story across beautifully curated pages',
    icon: Home,
    color: 'from-accent/10 to-secondary/10',
    accent: 'text-accent',
  },
]

const CategoryCard = ({ category, index }: { category: (typeof categories)[0]; index: number }) => {
  const IconComponent = category.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="card-premium overflow-hidden">
        {/* Icon Background */}
        <div className={`h-48 bg-linear-to-br ${category.color} flex items-center justify-center relative overflow-hidden`}>
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <IconComponent className={`w-24 h-24 ${category.accent} opacity-20`} />
          </motion.div>
          <IconComponent className={`w-16 h-16 ${category.accent} relative z-10`} />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {category.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {category.description}
          </p>

          {/* Hover CTA */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-sm font-medium text-primary hover:text-accent transition-colors flex items-center gap-2"
          >
            Explore →
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export function CategoriesSection() {
  return (
    <section id="categories" className="section-padding bg-linear-to-b from-background to-muted/20">
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
            Magazines for Every Occasion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether it&apos;s a celebration, adventure, or cherished moment—we have the perfect magazine style for you
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
