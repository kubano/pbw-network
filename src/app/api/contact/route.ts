import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  project_type?: string
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Save to Supabase database
    // 2. Send notification email via Azure Communication Services
    // 3. Log to Application Insights

    // For now, we'll simulate a successful submission
    console.log('Contact form submission:', {
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Not provided',
      project_type: formData.project_type || 'Not specified',
      message: formData.message.substring(0, 100) + '...',
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      submissionId: `sub_${Date.now()}`
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
