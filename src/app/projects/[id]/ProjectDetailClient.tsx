'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag, ExternalLink, Github, Clock } from 'lucide-react'
import { Project } from '@/types/database'

interface ProjectDetailClientProps {
  project: Project | null
  error: string | null
}

export default function ProjectDetailClient({ project, error }: ProjectDetailClientProps) {
  const router = useRouter()

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Project Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {error || 'The project you\'re looking for doesn\'t exist.'}
            </p>
            <button
              onClick={() => router.push('/projects')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.push('/projects')}
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Projects
            </button>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src={project.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'}
                alt={project.title}
                className="w-full h-80 lg:h-96 object-cover"
              />
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                    Featured Project
                  </span>
                </div>
              )}
            </div>

            {/* Project Actions */}
            <div className="flex flex-wrap gap-4">
              {project.project_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                  View Live Project
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  View Source Code
                </a>
              )}
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title and Meta */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                {project.updated_at !== project.created_at && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Project Overview
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Technologies & Tools
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-lg"
                  >
                    <Tag className="h-4 w-4" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {project.technologies.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {project.featured ? '★' : '○'}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {project.featured ? 'Featured' : 'Standard'}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-6 bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-primary-900/30 dark:to-indigo-900/30 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                About This Project
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                This project showcases our expertise in modern web development and demonstrates 
                our commitment to delivering high-quality, scalable solutions that meet our 
                clients' unique requirements.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Interested in a Similar Project?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Let's discuss how we can create a custom solution that meets your specific 
            business needs and technical requirements.
          </p>
          <button
            onClick={() => router.push('/contact')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-lg font-medium"
          >
            Get Started Today
          </button>
        </motion.div>
      </div>
    </div>
  )
}
