'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star, Award, Users } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  const stats = [
    { label: 'Projects Delivered', value: '100+', icon: Award },
    { label: 'Satisfied Clients', value: '50+', icon: Users },
    { label: 'Combined Experience', value: '30+', icon: Star },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden sm:mb-8">
      {/* Static Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/bg.jpg"
          alt="PBW Team Background"
          fill
          priority
          className="object-cover pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="mt-8 pt-8 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg"
              style={{ transform: 'none' }}
            >
              <span className="block">Building the</span>
              <span className="block text-gradient text-white">Future of Web Applications</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-8xl mx-auto text-xl md:text-1xl text-white leading-relaxed drop-shadow"
            >
              PBW Web Architects, LLC is a Team of highly skilled professionals, with more than 30 years 
              of experience combined in the Information Technology Industry and Software Development, 
              helping Businesses to achieve their goal of having reliable, cost effective, scalable, 
              easy to maintain, and functional computer systems and web based software applications.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-3xl mx-auto text-lg md:text-xl text-white leading-relaxed mt-4 drop-shadow"
            >
              We are committed to develop long term business relationships with our customers 
              providing exceptional Customer Support and Services, leading your Organization 
              to a successful Digital Transformation.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#projects"
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              View Our Work
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#contact"
              className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Start a Project
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="glass-morphism rounded-xl p-6 text-center"
              >
                <stat.icon className="h-8 w-8 text-primary-100 mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow">
                  {stat.value}
                </div>
                <div className="text-white font-medium drop-shadow">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* No scroll indicator, animation removed */}
    </section>
  )
}
