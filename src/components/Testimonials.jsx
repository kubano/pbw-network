import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Kevin Resendes',
      position: 'Field Services Operations Manager',
      company: 'Precision Meter Repair INC.', 
      content: 'The Data Acquisition Portal has been a game-changer for our business. At Precision Meter Repair INC, managing service orders and ensuring accurate data capture used to be a challenge. With DAP, our field technicians can complete their tasks efficiently, and the validated data gives us confidence in every decision we make. The Customer Portal has been an added bonus, providing real-time insights that have improved our operations significantly. I can’t imagine going back to the old way of doing things.',
      rating: 5,
      project: 'Data Acquisition Portal (D.A.P.) Field Services Module'
    },
    {
      id: 2,
      name: 'Jason Larson',
      position: 'Shop Operations Manager',
      company: 'Precision Meter Repair INC.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      content: 'At Precision Meter Repair INC., we have consistently prioritized the accuracy and speed of our meter testing services. However, until the implementation of the Data Acquisition Portal (DAP), managing and tracking our data was a significant challenge. The DAP has revolutionized our operations, particularly through the Meter Test Data Acquisition feature. This feature simplifies the collection, validation, and analysis of meter test results, ensuring seamless integration with our equipment. The automation capabilities of DAP have significantly reduced our processing time and enhanced the reliability of our data. Furthermore, the DAP has streamlined our meter repair management processes within the shop. Our team now has easy access to, updates, and tracking of meter test and batch management from a centralized platform. This real-time tracking has improved communication and coordination, resulting in faster turnaround times and reduced errors. The combination of these features has not only enhanced our workflow but has also provided us with a competitive advantage in the industry. ',
      rating: 5,
      project: 'Data Acquisition Portal (D.A.P.) Shop Services Module'
    },
    {
      id: 3,
      name: 'Valerie Brown',
      position: 'Chief Operations Officer',
      company: 'Lakeland Housing Authority',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      content: 'The Audit Portal has transformed the way we handle our HUD audits. Gone are the days of managing stacks of paperwork and scheduling in-person visits for every audit cycle. Now, all our financials and supporting documents are securely centralized, giving auditors remote access to everything they need. This not only saves us valuable time and resources but has also made the entire audit process smoother, more transparent, and far less stressful for our staff. We highly recommend Audit Portal to any Public Housing Authority seeking a modern solution for audit management.',
      rating: 5,
      project: 'PHA Audit Portal'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Founder',
      company: 'GreenTech Solutions',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      content: 'PBW\'s IoT platform revolutionized our smart city project. The real-time monitoring capabilities and intuitive dashboard have made managing our infrastructure incredibly efficient. Their technical expertise is world-class.',
      rating: 5,
      project: 'Smart City IoT Platform'
    },
    {
      id: 5,
      name: 'Lisa Park',
      position: 'VP of Technology',
      company: 'RetailMax',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      content: 'The AI-powered analytics dashboard from PBW has transformed how we make business decisions. The predictive insights have helped us optimize inventory, improve customer satisfaction, and increase revenue by 25%.',
      rating: 5,
      project: 'AI Analytics Dashboard'
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
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

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-gray-900 dark:text-white">What Our </span>
              <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about 
              working with PBW Web Architects and the results we've delivered together.
            </p>
          </motion.div>

          {/* Testimonial Slider */}
          <motion.div variants={itemVariants} className="relative">
            <div className="glass dark:glass-dark rounded-3xl p-8 md:p-12 max-w-8xl mx-auto">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Quote Icon */}
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Quote className="h-8 w-8 text-white" />
                </div>

                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Client Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {testimonials[currentIndex].position}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-300"
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-300"
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary-600 scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
