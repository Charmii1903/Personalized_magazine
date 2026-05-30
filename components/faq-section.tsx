'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'How many photos can I upload?',
    answer:
      'Each tier comes with different photo limits. Mini Edition supports up to 30 photos, Premium Edition up to 100, and Luxury Edition is unlimited. Also it depends on number of pages.',
  },
  {
    id: 2,
    question: 'Do you provide printed copies?',
    answer:
      'Yes! All our packages include beautifully printed magazines on premium paper stock. The Luxury Edition features the finest quality paper and finishes available.',
  },
  {
    id: 3,
    question: 'How long does delivery take?',
    answer:
      'Standard delivery takes 7-10 business days for Mini Edition, 5-7 for Premium, and 3-5 for Luxury. We also offer rush delivery options, contact us for details.',
  },
  {
    id: 4,
    question: 'Can I customize themes and layouts?',
    answer:
      'Absolutely! Mini Edition offers 3 pre-designed themes, Premium Edition unlimited themes with customization, and Luxury Edition gets fully bespoke design tailored to your vision.',
  },
  {
    id: 5,
    question: 'Is rush delivery available?',
    answer:
      'Yes! We offer rush delivery for time-sensitive projects. It includes 3-5 day delivery. Contact us at memoriesandall19@gmail.com for rush options on other tiers.',
  },
  {
    id: 6,
    question: 'Can I request revisions?',
    answer:
      'Of course! Premium and Luxury Editions include free revisions. Mini Edition includes three round of revisions. We want you to be completely happy with your magazine.',
  },
]

const FAQItem = ({
  item,
  index,
  isOpen,
  toggle,
}: {
  item: (typeof faqs)[0]
  index: number
  isOpen: boolean
  toggle: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="border-b border-border last:border-0"
    >
      <button suppressHydrationWarning
        onClick={toggle}
        className="w-full py-6 flex items-start justify-between gap-4 hover:text-primary transition-colors text-left"
      >
        <span className="font-display font-bold text-foreground text-lg">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mt-1"
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-muted-foreground leading-relaxed">
          {item.answer}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-padding bg-background">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about creating your magazine
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-premium p-8 lg:p-12"
        >
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                item={faq}
                index={index}
                isOpen={openIndex === index}
                toggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Didn&apos;t find your answer?
          </p>
          <a href="#contact" className="btn-primary inline-block">
            Get in Touch with Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
