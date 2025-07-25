'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Mail, Moon, Sun } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // On mount, set initial dark mode state from <html> class
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
  }, [])

  // Toggle dark mode by adding/removing 'dark' class on <html>
  const toggleDarkMode = () => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement
      if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        setIsDark(false)
      } else {
        html.classList.add('dark')
        setIsDark(true)
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' }, 
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center space-x-3">
              <Image
                src="/pbw-logo-built-nav.png"
                alt="PBW Network Logo"
                width={140}
                height={40}
                priority
                style={{ height: 'auto', width: 'auto', maxWidth: 140, maxHeight: 40 }}
              />
              <span
                className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-900 dark:text-white'
                    : 'text-white'
                }`}
                style={!isScrolled ? { textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0px 1px #fff' } : {}}
              >
                PBW Web Architects
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isScrolled
                      ? 'text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                      : 'text-white dark:text-white hover:text-primary-200 dark:hover:text-primary-400'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links + Dark Mode Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`transition-colors duration-200 focus:outline-none ${
                isScrolled
                  ? 'text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                  : 'text-white dark:text-white hover:text-primary-200 dark:hover:text-primary-400'
              }`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a
              href="https://github.com/pbwweb"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                  : 'text-white dark:text-white hover:text-primary-200 dark:hover:text-primary-400'
              }`}
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/15185478/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                  : 'text-white dark:text-white hover:text-primary-200 dark:hover:text-primary-400'
              }`}
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:support@pbwweb.com"
              className={`transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                  : 'text-white dark:text-white hover:text-primary-200 dark:hover:text-primary-400'
              }`}
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg mt-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <a
                  href="https://github.com/pbwweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/15185478/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:support@pbwweb.com"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
