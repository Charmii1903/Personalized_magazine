'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Heart, Sparkles, Users, Award } from 'lucide-react'
import { useTrackVisitor } from '@/hooks/use-track-visitor'

const values = [
  {
    icon: Heart,
    title: 'Authenticity',
    description: 'We believe in preserving genuine memories and emotions, creating magazines that truly reflect your unique story.',
  },
  {
    icon: Sparkles,
    title: 'Craftsmanship',
    description: 'Every magazine is meticulously designed and printed with premium materials to ensure lasting quality and beauty.',
  },
  {
    icon: Users,
    title: 'Connection',
    description: 'We help you strengthen bonds by creating tangible keepsakes that celebrate the people and moments you cherish.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Our commitment to perfection means premium design, perfect printing, and exceptional customer service every time.',
  },
]

const timeline = [
  {
    year: '2019',
    title: 'The Beginning',
    description: 'Founded with a simple vision: to transform digital memories into beautiful, tactile keepsakes that last a lifetime.',
  },
  {
    year: '2020',
    title: 'Growing Community',
    description: 'Expanded our design team and launched custom themes, serving over 1,000 happy customers across India.',
  },
  {
    year: '2021',
    title: 'Premium Collections',
    description: 'Introduced luxury paper options, premium printing techniques, and signature editorial layouts.',
  },
  {
    year: '2023',
    title: 'Memora Today',
    description: 'Now serving 10,000+ customers with personalized magazines for every occasion and milestone.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function AboutPage() {
  useTrackVisitor('/about')

  return (
    <>
      <Navbar />

    
      <section className="section-padding min-h-screen flex items-center justify-center relative overflow-hidden pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="font-display text-5xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Story
          </motion.h1>
          <motion.p
            className="text-lg lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            At Memora, we transform digital memories into beautiful, tactile keepsakes that celebrate life's most precious moments.
          </motion.p>
          <motion.div
            className="h-1 w-24 bg-primary mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </div>
      </section>

      
      <section className="section-padding bg-card">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                We believe that memories deserve more than just digital storage. They deserve to be celebrated, preserved, and shared in a way that touches the heart.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Memora was born from a simple idea: to bridge the gap between the digital and physical worlds by creating stunning, personalized magazines that tell your unique story.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every magazine we create is a labor of love—carefully designed, beautifully printed, and created to be cherished for generations.
              </p>
            </motion.div>

            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-24 h-24 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-2xl font-display font-bold text-foreground">Memories Matter</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Memora
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card-premium p-8 text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-card">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              From a small idea to serving thousands of happy customers
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-primary to-accent -translate-x-1/2"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ originY: 0 }}
            />

            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8 items-start`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Content */}
                  <div className="flex-1 text-right md:text-left">
                    {index % 2 === 0 ? (
                      <div className="pr-8 md:pr-0">
                        <p className="text-primary font-display font-bold text-2xl mb-2">
                          {item.year}
                        </p>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed max-w-sm">
                          {item.description}
                        </p>
                      </div>
                    ) : (
                      <div className="pl-8 md:pl-0 md:text-right">
                        <p className="text-primary font-display font-bold text-2xl mb-2">
                          {item.year}
                        </p>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed max-w-sm md:ml-auto">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Timeline dot */}
                  <motion.div
                    className="relative z-10 shrink-0"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                  >
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background absolute left-1/2 top-6 -translate-x-1/2" />
                  </motion.div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-accent/20 to-primary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Award className="w-24 h-24 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-2xl font-display font-bold text-foreground">Premium Quality</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="order-1 lg:order-2">
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">Why Choose Memora?</h2>

              <div className="space-y-6">
                {[
                  {
                    title: 'Expert Design Team',
                    desc: 'Our talented designers create stunning layouts that make your memories shine.',
                  },
                  {
                    title: 'Premium Materials',
                    desc: 'We use only the finest papers and printing techniques for magazines that last.',
                  },
                  {
                    title: 'Personalized Service',
                    desc: 'Every magazine is customized to match your unique vision and preferences.',
                  },
                  {
                    title: 'Fast Delivery',
                    desc: 'From photos to your hands, we deliver beautiful keepsakes quickly and reliably.',
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Ready to Create Your Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who have transformed their memories into beautiful, lasting keepsakes.
            </p>
            <motion.a
              href="/#contact"
              className="btn-primary inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Magazine
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
