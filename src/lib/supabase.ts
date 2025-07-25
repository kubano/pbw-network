import { createClient } from '@supabase/supabase-js'
import { Project } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Projects API
export const projectsApi = {
  async getAll(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase direct connection failed, trying API endpoint:', error)
        return await this.getAllFromAPI()
      }

      return data || []
    } catch (error) {
      console.warn('Error in direct Supabase call, trying API endpoint:', error)
      return await this.getAllFromAPI()
    }
  },

  async getAllFromAPI(): Promise<Project[]> {
    try {
      const response = await fetch('/api/projects')
      if (!response.ok) {
        throw new Error(`API response not ok: ${response.status}`)
      }
      const result = await response.json()
      return result.projects || []
    } catch (error) {
      console.error('Error fetching from API endpoint:', error)
      return []
    }
  },

  async getFeatured(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) {
        console.warn('Supabase direct connection failed, trying API endpoint:', error)
        return await this.getFeaturedFromAPI()
      }

      return data || []
    } catch (error) {
      console.warn('Error in direct Supabase call, trying API endpoint:', error)
      return await this.getFeaturedFromAPI()
    }
  },

  async getFeaturedFromAPI(): Promise<Project[]> {
    try {
      const response = await fetch('/api/projects?featured=true&limit=6')
      if (!response.ok) {
        throw new Error(`API response not ok: ${response.status}`)
      }
      const result = await response.json()
      return result.projects || []
    } catch (error) {
      console.error('Error fetching featured from API endpoint:', error)
      return []
    }
  },

  async getById(id: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching project by id:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getById project:', error)
      return null
    }
  }
}
