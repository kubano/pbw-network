import React, { useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { 
  ArrowLeft, 
  ExternalLink, 
  Code, 
  Clock, 
  Users, 
  Building,
  CheckCircle,
  Target,
  Lightbulb,
  TrendingUp,
  Cloud,
  Zap
} from 'lucide-react'
import { getProjectBySlug } from '../data/projectsData'

const ProjectDetails = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const project = getProjectBySlug(slug)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Smart back navigation function
  const handleBackNavigation = () => {
    // Check if user came from the /projects page via state or browser history
    if (location.state?.from === '/projects' || 
        (window.history.length > 1 && document.referrer.includes('/projects'))) {
      navigate('/projects')
    } else {
      // Default to home page and scroll to projects section
      navigate('/')
      setTimeout(() => {
        const element = document.querySelector('#projects')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <button
            onClick={() => handleBackNavigation()}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <div className="fixed top-20 left-4 md:left-6 z-40">
        <button
          onClick={() => handleBackNavigation()}
          className="p-3 md:p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
        >
          <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden pt-16 md:pt-0">
        <div className="absolute inset-0">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container-custom mx-auto px-6 md:px-8 text-center">
            <div className="max-w-2xl mt-8 md:mt-0">
              <div className="mb-4">
                <span className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  {project.category.charAt(0).toUpperCase() + project.category.slice(1)} Project
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">
                {project.title}
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mb-6 md:mb-8 leading-relaxed">
                {project.subtitle}
              </p>

              <div className="text-center">
                {project.live && (
                  <a
                    target='_blank'
                    href={project.live}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View Marketing Site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Info Grid */}
      <section className="py-12 md:py-16">
        <div className="container-custom mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 md:p-6 rounded-lg text-center hover:shadow-md transition-shadow duration-200">
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-primary-600 mx-auto mb-2 md:mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm md:text-base">Duration</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">{project.duration}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 md:p-6 rounded-lg text-center hover:shadow-md transition-shadow duration-200">
              <Users className="h-6 w-6 md:h-8 md:w-8 text-primary-600 mx-auto mb-2 md:mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm md:text-base">Team Size</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">{project.teamSize}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 md:p-6 rounded-lg text-center hover:shadow-md transition-shadow duration-200">
              <Building className="h-6 w-6 md:h-8 md:w-8 text-primary-600 mx-auto mb-2 md:mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm md:text-base">Client Type</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">{project.clientType}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 md:p-6 rounded-lg text-center hover:shadow-md transition-shadow duration-200">
              <Cloud className="h-6 w-6 md:h-8 md:w-8 text-primary-600 mx-auto mb-2 md:mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm md:text-base">Platform</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Azure Cloud</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {/* Project Overview */}
              <section>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                  Project Overview
                </h2>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
                  {project.fullDescription.split('\n').map((paragraph) => (
                    <p key={paragraph.substring(0, 50)} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </section>

              {/* Key Features */}
              <section>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center">
                  <Zap className="mr-2 md:mr-3 h-6 w-6 md:h-8 md:w-8 text-primary-600" />
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature) => (
                    <div
                      key={feature.substring(0, 30)}
                      className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Challenges & Solutions */}
              <section className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center">
                    <Target className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 text-red-500" />
                    Challenges
                  </h3>
                  <div className="space-y-3">
                    {project.challenges.map((challenge) => (
                      <div key={challenge.substring(0, 30)} className="p-3 md:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center">
                    <Lightbulb className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
                    Solutions
                  </h3>
                  <div className="space-y-3">
                    {project.solutions.map((solution) => (
                      <div key={solution.substring(0, 30)} className="p-3 md:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Results */}
              <section>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center">
                  <TrendingUp className="mr-2 md:mr-3 h-6 w-6 md:h-8 md:w-8 text-green-500" />
                  Results & Impact
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.results.map((result) => (
                    <div
                      key={result.substring(0, 20)}
                      className="p-4 md:p-6 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg text-white text-center border border-primary-500"
                    >
                      <h4 className="text-xl md:text-2xl font-bold mb-2">{result.split(' ')[0]}</h4>
                      <p className="text-white/90 text-sm md:text-base">{result.split(' ').slice(1).join(' ')}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6 md:space-y-8 mt-8 lg:mt-0">
              {/* Technologies */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 md:p-6 rounded-lg">
                <h3 className="text-lg md:text-xl font-display font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Azure Services */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 md:p-6 rounded-lg">
                <h3 className="text-lg md:text-xl font-display font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  Azure Services
                </h3>
                <div className="space-y-2">
                  {project.azureServices.map((service) => (
                    <div key={service} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300 text-xs md:text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 border border-primary-500 p-4 md:p-6 rounded-lg text-white text-center">
                <h3 className="text-lg md:text-xl font-bold mb-3">Interested in Similar Project?</h3>
                <p className="text-white/90 mb-4 text-sm">
                  Let's discuss how we can build something amazing together with Microsoft Azure.
                </p>
                <button
                  onClick={() => {
                    navigate('/#contact')
                    setTimeout(() => {
                      const element = document.querySelector('#contact')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }, 100)
                  }}
                  className="w-full bg-white text-primary-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm md:text-base"
                >
                  Start Your Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetails
