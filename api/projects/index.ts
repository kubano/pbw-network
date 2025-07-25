// Azure Function for fetching projects from Supabase
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('Projects API request received')

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 200,
      headers: corsHeaders,
    }
    return
  }

  if (req.method !== 'GET') {
    context.res = {
      status: 405,
      headers: corsHeaders,
      body: { error: 'Method not allowed' }
    }
    return
  }

  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      context.res = {
        status: 500,
        headers: corsHeaders,
        body: { error: 'Supabase configuration missing' }
      }
      return
    }

    // Get query parameters
    const featured = req.query.featured === 'true'
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined

    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter by featured if requested
    if (featured) {
      query = query.eq('featured', true)
    }

    // Apply limit if specified
    if (limit && limit > 0) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      context.log.error('Error fetching projects from Supabase:', error)
      context.res = {
        status: 500,
        headers: corsHeaders,
        body: { error: 'Failed to fetch projects' }
      }
      return
    }

    context.log(`Successfully fetched ${data?.length || 0} projects`)
    
    context.res = {
      status: 200,
      headers: corsHeaders,
      body: {
        success: true,
        projects: data || [],
        count: data?.length || 0
      }
    }

  } catch (error) {
    context.log.error('Error in projects API:', error)
    
    context.res = {
      status: 500,
      headers: corsHeaders,
      body: {
        error: 'Internal server error',
        success: false
      }
    }
  }
}

export default httpTrigger
