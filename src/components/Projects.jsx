import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, ArrowRight, Code } from 'lucide-react'
import { getFeaturedProjects } from '../data/projectsData'

const Projects = () => {
  const [filter, setFilter] = useState('all')

  const projects = getFeaturedProjects()

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Azure Web Apps' },
    { id: 'mobile', name: '.NET MAUI' },
    { id: 'cloud', name: 'Azure DevOps' },
    { id: 'ai', name: 'Azure AI/ML' },
    { id: 'iot', name: 'Azure IoT' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
    <section id="projects" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Featured </span>
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-7xl mx-auto leading-relaxed mb-8">
              Explore our portfolio of Microsoft Azure-powered solutions that have helped businesses 
              transform their digital presence and achieve scalable, secure, and reliable cloud infrastructure.
            </p>
          </div>

          

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target='_blank'
                          className="p-2 bg-white/90 rounded-lg text-gray-800 hover:bg-white transition-colors duration-200"
                          title="View Code"
                        >
                          <Code className="h-5 w-5" />
                        </a>
                      )}
                      {project.live && (
                        <a
                        href={project.live}
                        target='_blank'
                        className="p-2 bg-white/90 rounded-lg text-gray-800 hover:bg-white transition-colors duration-200"
                        title="Example Website"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                      )}
                    </div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                 <div className="mb-5">
                     <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {project.description}
                  </p>
                 </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <Link to={`/projects/${project.slug}`} state={{ from: '/' }}>
                    <div className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 group/link">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Link to="/projects">
              <button className="inline-flex items-center px-8 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 font-semibold rounded-lg hover:bg-primary-600 hover:text-white dark:hover:bg-primary-400 dark:hover:text-gray-900 transition-all duration-200">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let's discuss how we can leverage Microsoft Azure and .NET technologies to bring your vision to life with enterprise-grade scalability and security.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
