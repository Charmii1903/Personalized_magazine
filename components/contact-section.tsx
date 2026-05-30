// 'use client'

// import { motion } from 'framer-motion'
// import { useState } from 'react'
// import { Send, Mail, Phone, MapPin, AlertCircle, CheckCircle } from 'lucide-react'

// export function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     occasion: '',
//     theme: '',
//     deadline: '',
//     whatsapp: '',
//     notes: '',
//   })
//   const [submitted, setSubmitted] = useState(false)
//   const [error, setError] = useState('')
//   const [isLoading, setIsLoading] = useState(false)

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//     setError('')
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError('')

//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })

//       if (!response.ok) {
//         const data = await response.json()
//         throw new Error(data.error || 'Failed to submit inquiry')
//       }

//       setSubmitted(true)
//       setFormData({
//         name: '',
//         email: '',
//         occasion: '',
//         theme: '',
//         deadline: '',
//         whatsapp: '',
//         notes: '',
//       })
//       setTimeout(() => setSubmitted(false), 5000)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to submit inquiry')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 },
//     },
//   }

//   return (
//     <section id="contact" className="section-padding bg-linear-to-b from-background to-muted/20">
//       <div className="max-w-6xl mx-auto px-4 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance-heading">
//             Ready to Create Your Magazine?
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Let&apos;s start your project today. Fill out the form or contact us directly.
//           </p>
//         </motion.div>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid lg:grid-cols-3 gap-8"
//         >
//           {/* Contact Info */}
//           <motion.div variants={itemVariants} className="lg:col-span-1">
//             <div className="space-y-8">
//               {/* Email */}
//               <div className="card-premium p-6">
//                 <div className="flex items-start gap-4">
//                   <div className="w-10 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
//                     <Mail className="w-8 h-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-display font-bold text-foreground mb-1">
//                       Email
//                     </h3>
//                     <a
//                       href="mailto:hello@memora.com"
//                       className="text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       memoriesandall19@gmail.com
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* WhatsApp */}
//               <div className="card-premium p-6">
//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
//                     <Phone className="w-6 h-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-display font-bold text-foreground mb-1">
//                       WhatsApp
//                     </h3>
//                     <a
//                       href="https://wa.me/qr/2A343D7ELZZXJ1"
//                       className="text-muted-foreground hover:text-primary transition-colors"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                         suppressHydrationWarning
//                     >
//                       +91 8735868566
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* Address */}
//               {/* <div className="card-premium p-6">
//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
//                     <MapPin className="w-6 h-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-display font-bold text-foreground mb-1">
//                       Location
//                     </h3>
//                     <p className="text-muted-foreground text-sm">
//                       Gandhinagar, India
//                     </p>
//                   </div>
//                 </div>
//               </div> */}
//             </div>
//           </motion.div>

//           {/* Form */}
//           <motion.div
//             variants={itemVariants}
//             className="lg:col-span-2 card-premium p-8 lg:p-10"
//           >
//             <form autoComplete="off"
//               suppressHydrationWarning
//               onSubmit={handleSubmit} className="space-y-6">
//               {error && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive"
//                 >
//                   <AlertCircle size={20} />
//                   <span>{error}</span>
//                 </motion.div>
//               )}

//               {submitted && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary"
//                     suppressHydrationWarning
//                 >
//                   <CheckCircle size={20} />
//                   <span>Thank you! We&apos;ll be in touch soon.</span>
//                 </motion.div>
//               )}

//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   autoComplete="off"
//   suppressHydrationWarning
//                   required
//                   className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
//                   placeholder="Sarah Johnson"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="off"
//   suppressHydrationWarning
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
//                   placeholder="sarah@example.com"
//                 />
//               </div>

//               {/* Occasion */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Occasion Type
//                 </label>
//                 <select
//                   name="occasion"
//                   value={formData.occasion}
//                   onChange={handleChange}
//                   autoComplete="off"
//   suppressHydrationWarning
//                   required
//                   className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
//                 >
//                   <option value="">Select an occasion</option>
//                   <option value="birthday">Birthday</option>
//                   <option value="anniversary">Anniversary</option>
//                   <option value="wedding">Wedding</option>
//                   <option value="travel">Travel</option>
//                   <option value="friendship">Friendship</option>
//                   <option value="family">Family</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               {/* Theme Preference */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Theme Preference
//                 </label>
//                 <select
//                   name="theme"
//                   value={formData.theme}
//                   onChange={handleChange}
//                   suppressHydrationWarning
                  
//                   className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
//                 >
//                   <option value="">Select a theme</option>
//                   <option value="minimalist">Minimalist</option>
//                   <option value="vintage">Vintage</option>
//                   <option value="modern">Modern</option>
//                   <option value="romantic">Romantic</option>
//                   <option value="bohemian">Bohemian</option>
//                   <option value="unsure">Unsure - Let you decide</option>
//                 </select>
//               </div>

//               {/* Deadline */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Needed By
//                 </label>
//                 <input
//                   suppressHydrationWarning
//                   type="date"
//                   name="deadline"
//                   value={formData.deadline}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
//                 />
//               </div>

//               {/* WhatsApp Number */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   WhatsApp Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="whatsapp"
//                   value={formData.whatsapp}
//                   onChange={handleChange}
//                   required
//                     suppressHydrationWarning
//                   className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
//                   placeholder="+91 98765 43210"
//                 />
//               </div>

//               {/* Notes */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Additional Notes
//                 </label>
//                 <textarea
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleChange}
//                   rows={4}
//                     suppressHydrationWarning
//                   className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
//                   placeholder="Tell us about your project, vision, or any special requirements..."
//                 ></textarea>
//               </div>

//               {/* Submit Button */}
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 disabled={isLoading}
//                   suppressHydrationWarning
//                 className="w-full btn-primary flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 {isLoading ? 'Submitting...' : submitted ? 'Message Sent!' : 'Send Inquiry'}
//               </motion.button>
//             </form>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }


'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Send,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occasion: '',
    theme: '',
    deadline: '',
    whatsapp: '',
    notes: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify({
            access_key:
              process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,

            subject: `New Inquiry from ${formData.name}`,

            from_name: 'Memories & All Website',

            to_email:
              process.env.NEXT_PUBLIC_RECEIVER_EMAIL,

            ...formData,
          }),
        }
      )

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)

        setFormData({
          name: '',
          email: '',
          occasion: '',
          theme: '',
          deadline: '',
          whatsapp: '',
          notes: '',
        })

        setTimeout(() => {
          setSubmitted(false)
        }, 5000)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Failed to send inquiry.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section
      id="contact"
      className="section-padding bg-linear-to-b from-background to-muted/20"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          suppressHydrationWarning
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance-heading">
            Ready to Create Your Magazine?
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let&apos;s start your project today.
            Fill out the form or contact us directly.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          suppressHydrationWarning
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <div className="space-y-8">
              {/* Email */}
              <div className="card-premium p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-foreground mb-1">
                      Email
                    </h3>

                    <a
                      href="mailto:memoriesandall19@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      suppressHydrationWarning
                    >
                      memoriesandall19@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="card-premium p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-foreground mb-1">
                      WhatsApp
                    </h3>

                    <a
                      href="https://wa.me/918735868566"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      suppressHydrationWarning
                    >
                      +91 8735868566
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 card-premium p-8 lg:p-10"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  suppressHydrationWarning
                  className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive"
                >
                  <AlertCircle size={20} />

                  <span>{error}</span>
                </motion.div>
              )}

              {/* Success */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  suppressHydrationWarning
                  className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary"
                >
                  <CheckCircle size={20} />

                  <span>
                    Thank you! We&apos;ll be in touch soon.
                  </span>
                </motion.div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Sarah Johnson"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="sarah@example.com"
                />
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Occasion Type
                </label>

                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                >
                  <option value="">
                    Select an occasion
                  </option>

                  <option value="birthday">
                    Birthday
                  </option>

                  <option value="anniversary">
                    Anniversary
                  </option>

                  <option value="wedding">
                    Wedding
                  </option>

                  <option value="travel">
                    Travel
                  </option>

                  <option value="friendship">
                    Friendship
                  </option>

                  <option value="family">
                    Family
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              {/* Theme Preference */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Theme Preference
                </label>

                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  suppressHydrationWarning
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                >
                  <option value="">
                    Select a theme
                  </option>

                  <option value="minimalist">
                    Minimalist
                  </option>

                  <option value="vintage">
                    Vintage
                  </option>

                  <option value="modern">
                    Modern
                  </option>

                  <option value="romantic">
                    Romantic
                  </option>

                  <option value="bohemian">
                    Bohemian
                  </option>

                  <option value="unsure">
                    Unsure - Let you decide
                  </option>
                </select>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Needed By
                </label>

                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  WhatsApp Number
                </label>

                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Notes
                </label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  suppressHydrationWarning
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  placeholder="Tell us about your project, vision, or any special requirements..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                suppressHydrationWarning
                className="w-full btn-primary flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

                {isLoading
                  ? 'Submitting...'
                  : submitted
                  ? 'Message Sent!'
                  : 'Send Inquiry'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}