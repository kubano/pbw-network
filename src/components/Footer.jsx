import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageSquare, ArrowUp, ExternalLink, Globe } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Web Development', href: '#' },
      { name: 'Mobile Apps', href: '#' },
      { name: 'Cloud Solutions', href: '#' },
      { name: 'AI/ML Development', href: '#' },
      { name: 'DevOps & Infrastructure', href: '#' },
      { name: 'Consulting', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Support Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Newsletter', href: '#' },
      { name: 'Downloads', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'GitHub', icon: ExternalLink, href: '#', color: 'hover:text-gray-900 dark:hover:text-white' },
    { name: 'LinkedIn', icon: Globe, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: MessageSquare, href: '#', color: 'hover:text-blue-400' }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 text-sm">
                  © {currentYear} PBW Web Architects. All rights reserved.
                </p>
              </motion.div>

              {/* Space */}
              <motion.div className="flex items-center gap-4"></motion.div>

              {/* Back to Top */}
              <motion.button
                variants={itemVariants}
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors duration-300"
                aria-label="Back to top"
              >
                <ArrowUp className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
