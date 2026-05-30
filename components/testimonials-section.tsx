'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Wedding Client',
    content:
      'Memora turned our wedding photos into something truly magical. The quality is impeccable and the design captured our love story perfectly.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Travel Enthusiast',
    content:
      'I was amazed at how our Tokyo trip came to life in print. Every page feels like a window back to those precious moments.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Birthday Client',
    content:
      'My mom was in tears when she opened her birthday magazine. It&apos;s the most thoughtful gift I&apos;ve ever given. Highly recommend!',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Anniversary Gift',
    content:
      'Our 25th anniversary magazine is displayed proudly on our coffee table. It&apos;s a beautiful reminder of our journey together.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Family Project',
    content:
      'Creating a family magazine brought everyone together. The final product is something we&apos;ll treasure for generations.',
    rating: 5,
  },
  {
    id: 6,
    name: 'David Park',
    role: 'Friendship Book',
    content:
      'We made a friendship magazine for our college group. It&apos;s the perfect way to preserve our memories before we all moved away.',
    rating: 5,
  },
]

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0]
  index: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className="group card-premium p-8 border-l-4 border-l-primary"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-foreground mb-6 leading-relaxed text-base">
        &quot;{testimonial.content}&quot;
      </p>

      {/* Author */}
      <div className="pt-6 border-t border-border">
        <h4 className="font-display font-bold text-foreground">
          {testimonial.name}
        </h4>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </div>

      {/* Decorative accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
        className="absolute top-8 right-8 w-12 h-12 text-primary/10 text-4xl"
      >
        &ldquo;
      </motion.div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-background">
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
            Loved by Our Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read what our customers say about their Memora experiences
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-6 card-premium">
            <div className="flex items-center justify-center gap-4">
              <div>
                <p className="text-3xl font-display font-bold text-primary">
                  500+
                </p>
                <p className="text-sm text-muted-foreground">
                  Happy Customers
                </p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <p className="text-3xl font-display font-bold text-primary">
                  4.9/5
                </p>
                <p className="text-sm text-muted-foreground">
                  Average Rating
                </p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <p className="text-3xl font-display font-bold text-primary">
                  120+
                </p>
                <p className="text-sm text-muted-foreground">
                  5-Star Reviews
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
