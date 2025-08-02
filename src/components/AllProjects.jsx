import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Clock, Users, Building } from 'lucide-react'
import { getAllProjects } from '../data/projectsData'

const AllProjects = () => {
  const navigate = useNavigate()
  const allProjects = getAllProjects()

  // Sort projects with featured first
  const sortedProjects = [...allProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <div className="fixed top-20 left-4 md:left-6 z-40">
        <button
          onClick={() => {
            navigate('/')
            window.scrollTo(0, 0)
          }}
          className="p-3 md:p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
        >
          <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
         
        
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative pt-24 pb-16 md:pt-28 md:pb-20">
          <div className="container mx-auto px-6 md:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 md:mb-6">
                All Projects
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Explore our complete portfolio of Azure Cloud solutions and web development projects
              </p>
              
              {/* Stats */}
              <div className="flex justify-center items-center gap-8 md:gap-12 text-white/80 text-sm md:text-base">
                <div className="text-center">
                  <div className="font-bold text-xl md:text-2xl text-white">{getAllProjects().length}+</div>
                  <div>Projects</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="font-bold text-xl md:text-2xl text-white">{getAllProjects().filter(p => p.category.indexOf('Cloud') !== -1).length}+</div>
                  <div>Azure Solutions</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="font-bold text-xl md:text-2xl text-white">{getAllProjects().filter(p => p.featured).length}</div>
                  <div>Featured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
         
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sortedProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-3 py-1 rounded-full text-xs font-medium">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Project Meta */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Users className="h-3 w-3" />
                      <span>{project.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Building className="h-3 w-3" />
                      <span>{project.clientType}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-gray-500 dark:text-gray-400 text-xs px-2 py-1">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/projects/${project.slug}`, { state: { from: '/projects' } })}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      View Details
                    </button>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-gray-300 dark:border-gray-600 hover:border-primary-600 dark:hover:border-primary-400 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors duration-200"
                        title="View Live Site"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 border border-primary-500 p-8 md:p-12 rounded-lg text-white max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                Let's discuss how we can bring your vision to life with Microsoft Azure and modern web technologies.
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
                className="bg-white text-primary-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AllProjects
