// 'use client'

// import { motion, Variants } from 'framer-motion'
// import { ArrowRight } from 'lucide-react'
// import Image from 'next/image'

// const FloatingPolaroid = ({
//   index,
//   rotation,
//   delay,
//   image,
// }: {
//   index: number
//   rotation: number
//   delay: number
//   image: string
// }) => {
//   const positions = [
//     { top: '10%', left: '5%' },
//     { top: '60%', right: '8%' },
//     { bottom: '10%', left: '12%' },
//   ]

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
//       animate={{ opacity: 1, scale: 1, rotate: rotation }}
//       transition={{ delay, duration: 0.8 }}
//       className="absolute hidden lg:block"
//       style={{ ...positions[index] }}
//     >
//       <motion.div
//         animate={{ y: [-10, 10, -10] }}
//         transition={{ duration: 4, delay, repeat: Infinity }}
//         className="relative"
//       >
//         <div
//           className="w-56 h-72 bg-white rounded-xl shadow-2xl overflow-hidden"
//           style={{
//             transform: `rotate(${rotation}deg)`,
//             transformOrigin: 'center',
//           }}
//         >
//           {/* Image */}
//           <div className="relative w-full h-60 overflow-hidden">
//             <Image
//               src={image}
//               alt="Magazine Preview"
//               fill
//               className="object-cover hover:scale-110 transition-transform duration-700"
//             />
//           </div>

//           {/* Caption */}
//           <div className="p-3 space-y-2">
//             <div className="h-2 bg-muted rounded w-3/4"></div>
//             <div className="h-2 bg-muted rounded w-1/2"></div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }

// const FloatingDecoration = () => {
//   return (
//     <>
//       <motion.div
//         animate={{
//           opacity: [0.3, 0.6, 0.3],
//           scale: [1, 1.1, 1],
//         }}
//         transition={{ duration: 6, repeat: Infinity }}
//         className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
//       />

//       <motion.div
//         animate={{
//           opacity: [0.2, 0.5, 0.2],
//           scale: [1, 1.15, 1],
//         }}
//         transition={{ duration: 8, delay: 1, repeat: Infinity }}
//         className="absolute bottom-0 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
//       />
//     </>
//   )
// }

// export function HeroSection() {
//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   }

//   const itemVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: 'easeOut',
//       },
//     },
//   }

//   return (
//     <section
//       id="home"
//       className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
//     >
//       <FloatingDecoration />

//       {/* Floating Magazine Polaroids */}
//       <FloatingPolaroid
//         index={0}
//         rotation={-8}
//         delay={0.2}
//         image="https://res.cloudinary.com/djjrhbo0g/image/upload/v1780056177/magazine/Anniversary_o2lspw.png"
//       />

//       <FloatingPolaroid
//         index={1}
//         rotation={12}
//         delay={0.4}
//         image="https://res.cloudinary.com/djjrhbo0g/image/upload/v1780056177/magazine/birthday_vsqp0s.jpg"
//       />

//       <FloatingPolaroid
//         index={2}
//         rotation={-5}
//         delay={0.6}
//         image="https://res.cloudinary.com/djjrhbo0g/image/upload/v1780056178/magazine/travel_bstogi.jpg"
//       />

//       {/* Hero Content */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="relative z-10 max-w-4xl mx-auto px-4 text-center"
//       >
//         {/* Main Heading */}
//         <motion.h1
//           variants={itemVariants}
//           className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground mb-6 text-balance-heading"
//         >
//           Turning memories into magazines{' '}
//           <span className="text-primary">
//             you&apos;ll keep forever
//           </span>
//         </motion.h1>

//         {/* Subheading */}
//         <motion.p
//           variants={itemVariants}
//           className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
//         >
//           Custom magazines for birthdays, anniversaries,
//           weddings, travel memories & special occasions.
//           Transform your precious moments into beautiful,
//           tactile keepsakes.
//         </motion.p>

//         {/* CTA Buttons */}
//         <motion.div
//           variants={itemVariants}
//           className="flex flex-col lg:flex-row items-center justify-center gap-4"
//         >
//           <motion.a
//             href="#portfolio"
//             whileHover={{ scale: 1.05, x: 5 }}
//             whileTap={{ scale: 0.95 }}
//             className="btn-primary group inline-flex items-center gap-2"
//           >
//             View Portfolio

//             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//           </motion.a>

//           <motion.a
//             href="#contact"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="btn-outline"
//           >
//             Create Yours
//           </motion.a>
//         </motion.div>
//       </motion.div>
//     </section>
//   )
// }



'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const FloatingPolaroid = ({
  index,
  rotation,
  delay,
  image,
}: {
  index: number
  rotation: number
  delay: number
  image: string
}) => {
  const desktopPositions = [
    { top: '10%', left: '5%' },
    { top: '60%', right: '8%' },
    { bottom: '10%', left: '12%' },
  ]

  const mobilePositions = [
    { top: '8%', left: '-8%' },
    { top: '18%', right: '-10%' },
    { bottom: '12%', left: '-6%' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ delay, duration: 0.8 }}
      className="absolute"
      style={{
        ...(typeof window !== 'undefined' && window.innerWidth < 1024
          ? mobilePositions[index]
          : desktopPositions[index]),
      }}
    >
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, delay, repeat: Infinity }}
        className="relative"
      >
        <div
          className="
            w-24 h-32
            sm:w-28 sm:h-36
            lg:w-56 lg:h-72
            bg-white rounded-xl shadow-2xl overflow-hidden
          "
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
          }}
        >
          {/* Image */}
          <div className="relative w-full h-[75%] lg:h-60 overflow-hidden">
            <Image
              src={image}
              alt="Magazine Preview"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Caption */}
          <div className="p-2 lg:p-3 space-y-1 lg:space-y-2">
            <div className="h-1.5 lg:h-2 bg-muted rounded w-3/4"></div>
            <div className="h-1.5 lg:h-2 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const FloatingDecoration = () => {
  return (
    <>
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="
          absolute top-20 right-20
          w-40 h-40
          lg:w-72 lg:h-72
          bg-accent/10 rounded-full blur-3xl
        "
      />

      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 8, delay: 1, repeat: Infinity }}
        className="
          absolute bottom-0 left-10 lg:left-20
          w-52 h-52
          lg:w-96 lg:h-96
          bg-primary/10 rounded-full blur-3xl
        "
      />
    </>
  )
}

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-20"
    >
      <FloatingDecoration />

      {/* Floating Magazine Polaroids */}
      <FloatingPolaroid
        index={0}
        rotation={-8}
        delay={0.2}
        image="https://res.cloudinary.com/djjrhbo0g/image/upload/v1780056177/magazine/Anniversary_o2lspw.png"
      />

      <FloatingPolaroid
        index={1}
        rotation={12}
        delay={0.4}
        image="https://res.cloudinary.com/djjrhbo0g/image/upload/v1780056177/magazine/birthday_vsqp0s.jpg"
      />

      <FloatingPolaroid
        index={2}
        rotation={-5}
        delay={0.6}
        image="https://res.cloudinary.com/djjrhbo0g/image/upload/v1780056178/magazine/travel_bstogi.jpg"
      />

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          relative z-10
          max-w-4xl mx-auto
          px-6 lg:px-4
          text-center
        "
      >
        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="
            text-4xl
            sm:text-5xl
            lg:text-6xl
            xl:text-7xl
            font-display font-bold sm:text-foreground
            mb-6
            text-balance-heading
            leading-tight
          "
        >
          Turning memories into magazines{' '}
          <span className="text-primary">
            you&apos;ll keep forever
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="
            text-base
            sm:text-lg
            lg:text-xl
            text-muted-foreground
            mb-8
            max-w-2xl
            mx-auto
            leading-relaxed
          "
        >
          Custom magazines for birthdays, anniversaries,
          weddings, travel memories & special occasions.
          Transform your precious moments into beautiful,
          tactile keepsakes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="
            flex flex-col
            sm:flex-row
            items-center justify-center
            gap-4
          "
        >
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary group inline-flex items-center gap-2"
          >
            View Portfolio

            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline"
          >
            Create Yours
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

