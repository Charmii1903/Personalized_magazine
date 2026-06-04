'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
  ArrowUp,
} from 'lucide-react'

import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

export function Footer() {
  const [showStoryPopup, setShowStoryPopup] = useState(false)
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false)
  const [email, setEmail] = useState('')
const [loading, setLoading] = useState(false)
const [successMessage, setSuccessMessage] = useState('')
const [errorMessage, setErrorMessage] = useState('')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: [
      { label: 'About Us', href: '#categories' },
      { label: 'Our Story', href: '#' },
    ],

    Services: [
      { label: 'Magazine Design', href: '#portfolio' },
      { label: 'Printing', href: '#' },
      { label: 'Customization', href: '#' },
      { label: 'Bulk Orders', href: '#contact' },
    ],

    Support: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
      { label: 'Shipping Info', href: '#contact' },
      { label: 'Returns', href: '#contact' },
    ],

    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  }

  const socialLinks = [
    {
      icon: Mail,
      href: 'mailto:memoriesandall19@gmail.com',
      label: 'Email',
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/memoriess_and_all?utm_source=qr&igsh=YzhoYXdudWZxMDdt',
      label: 'Instagram',
    },
  ]

  const handleNewsletterSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault()

  setLoading(true)
  setSuccessMessage('')
  setErrorMessage('')

  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (data.success) {
      setSuccessMessage('Subscribed successfully ✨')
      setEmail('')
    } else {
      setErrorMessage(data.message)
    }
  } catch (error) {
    setErrorMessage('Something went wrong')
  } finally {
    setLoading(false)

    setTimeout(() => {
      setSuccessMessage('')
      setErrorMessage('')
    }, 4000)
  }
}

  return (
    <>
      <footer className="bg-foreground text-background relative">

        {/* Scroll To Top */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          suppressHydrationWarning
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">

          {/* Top Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            suppressHydrationWarning
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12 pb-12 border-b border-background/20"
          >

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
              suppressHydrationWarning
            >
              <h3 className="text-2xl font-display font-bold text-background mb-4">
                Memories & All
              </h3>

              <p className="text-sm text-background/70 leading-relaxed mb-6">
                Turning your precious moments into beautiful,
                tactile keepsakes.
              </p>

              {/* Social Icons */}
<div className="flex items-center gap-4 mt-4">
  {socialLinks.map((social, index) => {
    const Icon = social.icon

    return (
      <motion.a
        key={social.label}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{
          scale: 1.15,
          y: -3,
        }}
        whileTap={{ scale: 0.95 }}
        suppressHydrationWarning
        className="group w-11 h-11 rounded-full border border-background/20 bg-background/10 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 shadow-md"
        aria-label={social.label}
      >
        <Icon className="w-5 h-5 text-background group-hover:text-white transition-colors" />
      </motion.a>
    )
  })}
</div>
            </motion.div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(
              ([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  suppressHydrationWarning
                  transition={{
                    delay: (categoryIndex + 1) * 0.1,
                    duration: 0.6,
                  }}
                >
                  <h4 className="font-display font-bold text-background mb-4">
                    {category}
                  </h4>

                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.label}>

                        {/* OUR STORY BUTTON */}
                        {link.label === 'Our Story' ? (
                          <button
                            onClick={() => setShowStoryPopup(true)}
                            className="text-sm text-background/70 hover:text-background transition-colors"
                          >
                            {link.label}
                          </button>
                        ) : link.label === 'Privacy Policy' ? (

                          /* PRIVACY BUTTON */
                          <button
                            onClick={() => setShowPrivacyPopup(true)}
                            className="text-sm text-background/70 hover:text-background transition-colors"
                          >
                            {link.label}
                          </button>

                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-background/70 hover:text-background transition-colors"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              suppressHydrationWarning
              className="lg:col-span-1"
            >
              <h4 className="font-display font-bold text-background mb-4">
                Newsletter
              </h4>

              <p className="text-sm text-background/70 mb-4">
                Get updates on new designs and special offers.
              </p>

              <form
  onSubmit={handleNewsletterSubmit}
  autoComplete="off"
  className="space-y-3"
>
  <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Your email"
    className="w-full px-3 py-2 rounded-lg bg-background/20 text-background placeholder-background/50 border border-background/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
  />

  <button
    type="submit"
    disabled={loading}
    className="w-full px-3 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
  >
    {loading ? 'Subscribing...' : 'Subscribe'}
  </button>

  {successMessage && (
    <p className="text-green-400 text-xs">
      {successMessage}
    </p>
  )}

  {errorMessage && (
    <p className="text-red-400 text-xs">
      {errorMessage}
    </p>
  )}
</form>
            </motion.div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            suppressHydrationWarning
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/70"
          >
            <p>
              © {currentYear} Memories & All.
              All rights reserved.
              Crafted with
              <span className="text-primary mx-1">♡</span>
              in India.
            </p>

            <div className="flex gap-6">
              <button
                onClick={() => setShowPrivacyPopup(true)}
                className="hover:text-background transition-colors"
              >
                Privacy
              </button>

             

              
            </div>
          </motion.div>
        </div>
      </footer>

      {/* OUR STORY POPUP */}
      {showStoryPopup && (
        <div className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">

            <button
              onClick={() => setShowStoryPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              suppressHydrationWarning
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-4 text-orange-900">
              Our Story
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              What started as a heartfelt surprise for my parents’
              24th anniversary became something much bigger than I
              ever imagined.

              I designed a personalized magazine filled with
              memories, moments, and emotions to make their special
              day unforgettable.

              When I gifted it to them, their reaction was priceless.
              They absolutely loved it.

              They shared it on social media, and soon friends,
              family, and even strangers started reaching out asking
              if I could create something similar for their loved
              ones too.

              That single magazine turned into the very first step
              toward building Memories & All — a space where
              emotions, stories, and memories are transformed into
              beautiful keepsakes people can hold onto forever.
            </p>
          </div>
        </div>
      )}

      {/* PRIVACY POPUP */}
      {showPrivacyPopup && (
        <div className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">

            <button
              onClick={() => setShowPrivacyPopup(false)}
              suppressHydrationWarning
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-4 text-orange-900">
              Privacy Policy
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              Your memories and personal information are safe with
              us. We never share your uploaded photos, stories,
              videos, or personal details with third parties.

              Every order is handled securely and privately with
              care and respect for your personal moments.
            </p>
          </div>
        </div>
      )}
    </>
  )
}


// 'use client'

// import { motion } from 'framer-motion'
// import { useState } from 'react'
// import {
//   Instagram,
//   Twitter,
//   Facebook,
//   Mail,
//   ArrowUp,
// } from 'lucide-react'

// import { FaWhatsapp } from 'react-icons/fa'
// import Link from 'next/link'

// export function Footer() {
//   const [showStoryPopup, setShowStoryPopup] = useState(false)
//   const [showPrivacyPopup, setShowPrivacyPopup] = useState(false)

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   const currentYear = new Date().getFullYear()

//   const footerLinks = {
//     Company: [
//       { label: 'About Us', href: '#about' },
//       { label: 'Our Story', href: '#' },
//     ],

//     Services: [
//       { label: 'Magazine Design', href: '#portfolio' },
//       { label: 'Printing', href: '#' },
//       { label: 'Customization', href: '#' },
//       { label: 'Bulk Orders', href: '#contact' },
//     ],

//     Support: [
//       { label: 'FAQ', href: '#faq' },
//       { label: 'Contact', href: '#contact' },
//       { label: 'Shipping Info', href: '#contact' },
//       { label: 'Returns', href: '#contact' },
//     ],

//     Legal: [
//       { label: 'Privacy Policy', href: '#' },
//       { label: 'Terms of Service', href: '#' },
//       { label: 'Cookie Policy', href: '#' },
//     ],
//   }

//   const socialLinks = [
//     // {
//     //   icon: Instagram,
//     //   href: 'https://instagram.com',
//     //   label: 'Instagram',
//     // },

//     // {
//     //   icon: Twitter,
//     //   href: 'https://twitter.com',
//     //   label: 'Twitter',
//     // },

//     // {
//     //   icon: Facebook,
//     //   href: 'https://facebook.com',
//     //   label: 'Facebook',
//     // },

//     {
//       icon: Mail,
//       href: 'mailto:hello@memora.com',
//       label: 'Email',
//     },

//     {
//       icon: FaWhatsapp,
//       href: 'https://wa.me/919999999999',
//       label: 'WhatsApp',
//     },
//   ]

//   return (
//     <>
//       <footer className="bg-foreground text-background relative">
        
//         {/* Scroll To Top */}
//         <motion.button
//           onClick={scrollToTop}
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true, margin: '-100px' }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
//         >
//           <ArrowUp className="w-6 h-6" />
//         </motion.button>

//         <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">

//           {/* Top Section */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12 pb-12 border-b border-background/20"
//           >

//             {/* Brand */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="lg:col-span-1"
//             >
//               <h3 className="text-2xl font-display font-bold text-background mb-4">
//                 Memories & All
//               </h3>

//               <p className="text-sm text-background/70 leading-relaxed mb-6">
//                 Turning your precious moments into beautiful,
//                 tactile keepsakes.
//               </p>

//               {/* Social Icons */}
//               <div className="flex gap-3">
//                 {socialLinks.map((social, index) => {
//                   const Icon = social.icon

//                   return (
//                     <motion.a
//                       key={social.label}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       initial={{ opacity: 0, y: 10 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: index * 0.1 }}
//                       whileHover={{ scale: 1.2, rotate: 360 }}
//                       className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center hover:bg-primary transition-colors"
//                       aria-label={social.label}
//                     >
//                       <Icon className="w-5 h-5" />
//                     </motion.a>
//                   )
//                 })}
//               </div>
//             </motion.div>

//             {/* Footer Links */}
//             {Object.entries(footerLinks).map(
//               ([category, links], categoryIndex) => (
//                 <motion.div
//                   key={category}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{
//                     delay: (categoryIndex + 1) * 0.1,
//                     duration: 0.6,
//                   }}
//                 >
//                   <h4 className="font-display font-bold text-background mb-4">
//                     {category}
//                   </h4>

//                   <ul className="space-y-2">
//                     {links.map((link) => (
//                       <li key={link.label}>
                        
//                         {/* Our Story Popup */}
//                         {link.label === 'Our Story' ? (
//                           <button
//                             onClick={() => setShowStoryPopup(true)}
//                             className="text-sm text-background/70 hover:text-background transition-colors"
//                           >
//                             {link.label}
//                           </button>
//                         ) : (
//                           <Link
//                             href={link.href}
//                             className="text-sm text-background/70 hover:text-background transition-colors"
//                           >
//                             {link.label}
//                           </Link>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               )
//             )}

//             {/* Newsletter */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.5, duration: 0.6 }}
//               className="lg:col-span-1"
//             >
//               <h4 className="font-display font-bold text-background mb-4">
//                 Newsletter
//               </h4>

//               <p className="text-sm text-background/70 mb-4">
//                 Get updates on new designs and special offers.
//               </p>

//               <form
//                 autoComplete="off"
//                 suppressHydrationWarning
//                 className="space-y-2"
//               >
//                 <input
//                   type="email"
//                   placeholder="Your email"
//                   className="w-full px-3 py-2 rounded-lg bg-background/20 text-background placeholder-background/50 border border-background/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
//                 />

//                 <button
//                   type="submit"
//                   className="w-full px-3 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//             </motion.div>
//           </motion.div>

//           {/* Bottom Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/70"
//           >
//             <p>
//               © {currentYear} Memories & All.
//               All rights reserved.
//               Crafted with
//               <span className="text-primary mx-1">♡</span>
//               in India.
//             </p>

//             <div className="flex gap-6">
              
//               {/* Privacy Popup */}
//               <button
//                 onClick={() => setShowPrivacyPopup(true)}
//                 className="hover:text-background transition-colors"
//               >
//                 Privacy
//               </button>

//               <Link
//                 href="#"
//                 className="hover:text-background transition-colors"
//               >
//                 Terms
//               </Link>

//               <Link
//                 href="#"
//                 className="hover:text-background transition-colors"
//               >
//                 Sitemap
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </footer>

//       {/* Our Story Popup */}
//       {showStoryPopup && (
//         <div className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center px-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            
//             <button
//               onClick={() => setShowStoryPopup(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-black"
//             >
//               ✕
//             </button>

//             <h3 className="text-2xl  font-bold mb-4 text-orange-300">
//               Our Story
//             </h3>

//             <p className="text-muted-foreground leading-relaxed">
//               What started as a heartfelt surprise for my parents’ 24th anniversary became something much bigger than I ever imagined.

//               I designed a personalized magazine filled with memories, moments, and emotions to make their special day unforgettable.
//               When I gifted it to them, their reaction was priceless , they absolutely loved it. They shared it on social media, and soon friends, family,
//                and even strangers started reaching out, asking if I could create something similar for their loved ones too.
//                That single magazine turned into my very first step toward building Memories & All 
//                : a space where emotions, stories, and memories are transformed into beautiful keepsakes people can hold onto forever.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Privacy Popup */}
//       {showPrivacyPopup && (
//         <div className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center px-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            
//             <button
//               onClick={() => setShowPrivacyPopup(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-black"
//             >
//               ✕
//             </button>

//             <h3 className="text-2xl font-bold mb-4 text-foreground">
//               Privacy Policy
//             </h3>

//             <p className="text-muted-foreground leading-relaxed">
//               Your memories and personal information are
//               safe with us. We never share your uploaded
//               photos, stories, or personal details with
//               third parties. Every order is handled securely
//               and privately with care.
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }
