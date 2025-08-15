import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Users, AlertCircle } from 'lucide-react'
import useRecaptcha from '../hooks/useRecaptcha'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: '',
    message: ''
  })
  
  const [errors, setErrors] = useState({}) 
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Initialize reCAPTCHA hook
  const { isRecaptchaLoaded, recaptchaError, executeRecaptcha } = useRecaptcha()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    // Remove formatting and check if it's a valid phone number
    const cleanPhone = phone.replace(/[\s\-()]/g, '')
    return cleanPhone.length === 10 && /^\d{10}$/.test(cleanPhone)
  }

  const fieldValidators = {
    name: (value) => {
      const trimmed = value?.trim?.() ?? ''
      if (!trimmed) return 'Name is required'
      if (trimmed.length < 2) return 'Name must be at least 2 characters'
      return ''
    },
    email: (value) => {
      const trimmed = value?.trim?.() ?? ''
      if (!trimmed) return 'Email is required'
      if (!validateEmail(trimmed)) return 'Please enter a valid email address'
      return ''
    },
    phone: (value) => {
      const trimmed = value?.trim?.() ?? ''
      if (trimmed && !validatePhone(trimmed)) return 'Please enter a valid phone number'
      return ''
    },
    interest: (value) => {
      const trimmed = value?.trim?.() ?? ''
      if (!trimmed) return 'Please select a project interest'
      return ''
    },
    message: (value) => {
      const trimmed = value?.trim?.() ?? ''
      if (!trimmed) return 'Project description is required'
      if (trimmed.length < 10) return 'Please provide at least 10 characters'
      return ''
    }
  }

  const validateField = (name, value) => {
    const validator = fieldValidators[name]
    return validator ? validator(value) : ''
  }

  const validateForm = () => {
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/[^\d]/g, '')
    const phoneNumberLength = phoneNumber.length
    
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    let formattedValue = value
    if (name === 'phone') {
      formattedValue = formatPhoneNumber(value)
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    })
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Check for reCAPTCHA errors
    if (recaptchaError) {
      setErrors({
        submit: 'Security verification failed. Please refresh the page and try again.'
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Execute reCAPTCHA before form submission
      const recaptchaToken = await executeRecaptcha('contact_form')
      
      if (!recaptchaToken) {
        throw new Error('Security verification failed. Please try again.')
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken // Include reCAPTCHA token
        })
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }
      
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          interest: '',
          message: ''
        })
        setErrors({})
      }, 5000) // Increased to 5 seconds to let user read the success message
      
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
      
      // Show error to user
      setErrors({
        submit: error.message || 'Failed to send message. Please try again or contact us directly.'
      })
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setErrors(prev => {
          const { submit, ...rest } = prev
          return rest
        })
      }, 5000)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@pbwweb.com',
      description: 'Send us an email and we will respond within 24 hours.'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (863) 354-1971',
      description: 'Available Monday to Friday, 9 AM to 6 PM EST.'
    },
    {
      icon: MapPin,
      title: 'Virtual Meeting',
      details: 'Via Teams or Zoom',
      description: 'Schedule a virtual meeting with our team.'
    }
  ]

  const features = [
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'We respond to all inquiries within 24 hours'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Work directly with senior developers and architects'
    },
    {
      icon: CheckCircle,
      title: 'Proven Process',
      description: 'Structured approach from concept to deployment'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-800/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Let's Build Something </span>
            <span className="gradient-text">Amazing Together</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Get in touch with our team of experts 
            and let's discuss how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg">
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Start Your Project
            </h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Thank You!
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  We have received your message and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                        errors.name 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                      }`}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                        errors.phone 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                      }`}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Interest *
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                      errors.interest 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                    }`}
                  >
                    <option value="">Select a project interest...</option>
                    <option value="Marketing Web site">Marketing Web site</option>
                    <option value="Web Application Development">Web Application Development</option>
                    <option value="Cloud Consulting">Cloud Consulting</option>
                    <option value="Cloud Migration">Cloud Migration</option>
                    <option value="Azure DevOps - GitHub">Azure DevOps - GitHub</option>
                    <option value="Project Management">Project Management</option>
                  </select>
                  {errors.interest && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.interest}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                    }`}
                    placeholder="Tell us about your project goals, requirements, and timeline..."
                  />
                  {errors.message && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.message}
                    </div>
                  )}
                </div>

                {/* Submit Error Display */}
                {errors.submit && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-center text-red-600 dark:text-red-400">
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{errors.submit}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !isRecaptchaLoaded}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
                >
                  {isSubmitting && (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                      Sending...
                    </>
                  )}
                  {!isSubmitting && !isRecaptchaLoaded && (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                      Loading Security...
                    </>
                  )}
                  {!isSubmitting && isRecaptchaLoaded && (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>

                {/* reCAPTCHA Status */}
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center space-y-1">
                  {!isRecaptchaLoaded && (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-3 w-3 border border-gray-400 border-t-transparent" />
                      Loading security verification...
                    </div>
                  )}
                  {isRecaptchaLoaded && (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Protected by reCAPTCHA
                    </div>
                  )}
                  {recaptchaError && (
                    <div className="flex items-center justify-center gap-2 text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      Security verification error
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                We are here to help you bring your vision to life. Whether you have a specific project 
                in mind or just want to explore possibilities, we would love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-1">
                        {info.title}
                      </h4>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                        {info.details}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-display font-bold text-gray-900 dark:text-white">
                Why Choose PBW?
              </h4>
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-200"
                >
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {feature.title}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm ml-2">
                      - {feature.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact