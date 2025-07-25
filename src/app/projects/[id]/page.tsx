import { projectsApi } from '@/lib/supabase'
import { Project } from '@/types/database'
import ProjectDetailClient from './ProjectDetailClient'

// Generate static params for all project IDs from Supabase
export async function generateStaticParams() {
  try {
    // Fetch all projects from Supabase to get their IDs
    const projects = await projectsApi.getAll()
    
    return projects.map((project) => ({
      id: project.id,
    }))
  } catch (error) {
    console.error('Error fetching projects for static generation:', error)
    // Return empty array if we can't fetch projects
    // This will cause dynamic generation at runtime
    return []
  }
}

interface PageProps {
  params: { id: string }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  let project: Project | null = null
  let error: string | null = null

  try {
    // Fetch project data on the server side
    project = await projectsApi.getById(params.id)
    if (!project) {
      error = 'Project not found'
    }
  } catch (err) {
    console.error('Error fetching project:', err)
    error = 'Failed to load project'
  }

  return <ProjectDetailClient project={project} error={error} />
}
