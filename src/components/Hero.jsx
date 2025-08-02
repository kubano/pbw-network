import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  const floatingIcons = [
    { Icon: Sparkles, delay: 0, position: 'top-20 left-10' },
    { Icon: Zap, delay: 0.5, position: 'top-40 right-20' },
    { Icon: Globe, delay: 1, position: 'bottom-32 left-20' },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Technology Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/80 to-blue-900/90 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-primary-900/95"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
      </div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        {floatingIcons.map(({ Icon, delay, position }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3], 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 4,
              delay,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className={`absolute ${position} text-primary-300 dark:text-primary-600`}
          >
            <Icon className="h-8 w-8" />
          </motion.div>
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary-200/30 dark:border-primary-700/30 rounded-full"
        ></motion.div>
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-primary-200/20 dark:border-primary-700/20 rounded-full"
        ></motion.div>
      </div>

      <div className="container-custom relative z-10 mt-12 px-4 md:px-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 md:mb-8"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Available for new projects
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-4 md:mb-6 px-2"
          >
            <span className="block text-white">Building the</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Future of Web Applications</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4"
          >
            We craft exceptional enterprise solutions through Cloud Technologies, 
            Azure cloud services, and modern DevOps practices that scale with your business.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 transform hover:shadow-2xl inline-flex items-center group w-full sm:w-auto justify-center"
            >
              View Our Work
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg w-full sm:w-auto text-center"
            >
              Start a Project
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20 p-4 md:p-8 mb-8 md:mb-12"
          >
            {[
              { number: '58+', label: 'Projects Delivered' },
              { number: '42+', label: 'Happy Clients' },
              { number: '25+', label: 'Years Experience Combined' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-xl"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-200 font-medium text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
