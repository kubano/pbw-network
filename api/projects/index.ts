// Azure Function for fetching projects from Supabase
import { HttpRequest, HttpResponseInit, InvocationContext, app } from "@azure/functions"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function projectsHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.info('Projects API request received')

  // CORS headers with security headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'"
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return {
      status: 200,
      headers: corsHeaders,
    }
  }

  if (request.method !== 'GET') {
    return {
      status: 405,
      headers: corsHeaders,
      jsonBody: { error: 'Method not allowed' }
    }
  }

  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return {
        status: 500,
        headers: corsHeaders,
        jsonBody: { error: 'Supabase configuration missing' }
      }
    }

    // Get query parameters
    const url = new URL(request.url)
    const featured = url.searchParams.get('featured') === 'true'
    const limitParam = url.searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam) : undefined

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
      context.error('Error fetching projects from Supabase:', error)
      return {
        status: 500,
        headers: corsHeaders,
        jsonBody: { error: 'Failed to fetch projects' }
      }
    }

    context.info(`Successfully fetched ${data?.length || 0} projects`)
    
    return {
      status: 200,
      headers: corsHeaders,
      jsonBody: {
        success: true,
        projects: data || [],
        count: data?.length || 0
      }
    }

  } catch (error) {
    context.error('Error in projects API:', error)
    
    return {
      status: 500,
      headers: corsHeaders,
      jsonBody: {
        error: 'Internal server error',
        success: false
      }
    }
  }
}

app.http('projects', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: projectsHandler
})
