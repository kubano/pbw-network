import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home, Search, Compass, AlertTriangle, Briefcase, Users, Mail } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    if (path.startsWith('/#')) {
      // Handle hash links by navigating to home and scrolling
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(path.substring(2))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      navigate(path)
    }
  }

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

  const floatingElements = [
    { Icon: Search, delay: 0, position: 'top-20 left-10', id: 'search' },
    { Icon: Compass, delay: 0.5, position: 'top-40 right-20', id: 'compass' },
    { Icon: AlertTriangle, delay: 1, position: 'bottom-32 left-20', id: 'alert' },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-blue-600/5 to-purple-600/5 dark:from-primary-400/10 dark:via-blue-400/10 dark:to-purple-400/10"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        {floatingElements.map(({ Icon, delay, position, id }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2], 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8,
              delay,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className={`absolute ${position} text-primary-200 dark:text-primary-700`}
          >
            <Icon className="h-12 w-12" />
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
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary-200/20 dark:border-primary-700/20 rounded-full"
        ></motion.div>
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-primary-200/10 dark:border-primary-700/10 rounded-full"
        ></motion.div>
      </div>

      <div className="container-custom relative z-10 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* 404 Number */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-display font-black leading-none">
              <span className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                404
              </span>
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Oops! The page and/or resource you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:shadow-xl inline-flex items-center group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Go Back
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 border-2 border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400 font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:shadow-lg inline-flex items-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </motion.button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { 
                title: 'Our Projects', 
                description: 'Explore our portfolio of innovative solutions',
                path: '/projects',
                Icon: Briefcase,
                id: 'projects'
              },
              { 
                title: 'About Us', 
                description: 'Learn more about our team and expertise',
                path: '/#about',
                Icon: Users,
                id: 'about'
              },
              { 
                title: 'Contact', 
                description: 'Get in touch for your next project',
                path: '/#contact',
                Icon: Mail,
                id: 'contact'
              },
            ].map((link) => (
              <motion.button
                key={link.id}
                onClick={() => handleNavigation(link.path)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-primary-100 dark:border-primary-800 p-6 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-lg text-left"
              >
                <div className="mb-3">
                  <link.Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {link.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {link.description}
                </p>
              </motion.button>
            ))}
          </motion.div>

          {/* Fun Message */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lost in cyberspace? Don't worry, even the best developers get 404 errors!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default NotFound
