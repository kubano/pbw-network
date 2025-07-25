// Azure Function for handling contact form submissions with SendGrid integration
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import sgMail from '@sendgrid/mail'
import { createClient } from '@supabase/supabase-js'

interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  project_type?: string
}

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('Contact form submission received')

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  if (req.method !== 'POST') {
    context.res = {
      status: 405,
      headers: corsHeaders,
      body: { error: 'Method not allowed' }
    }
    return
  }

  try {
    const formData: ContactFormData = req.body

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      context.res = {
        status: 400,
        headers: corsHeaders,
        body: { error: 'Missing required fields: name, email, and message are required' }
      }
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      context.res = {
        status: 400,
        headers: corsHeaders,
        body: { error: 'Invalid email format' }
      }
      return
    }

    // Log the submission (in production, you'd save to database or send email)
    context.log('Contact form data:', {
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Not provided',
      project_type: formData.project_type || 'Not specified',
      message: formData.message.substring(0, 100) + '...', // Log only first 100 chars for privacy
      timestamp: new Date().toISOString()
    })

    // Save to Supabase database
    let submissionId = `sub_${Date.now()}`
    if (supabaseUrl && supabaseServiceKey) {
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              company: formData.company || null,
              message: formData.message,
              project_type: formData.project_type || null,
              status: 'pending'
            }
          ])
          .select()
          .single()

        if (error) {
          context.log.error('Error saving to Supabase:', error)
        } else {
          context.log('Contact submission saved to Supabase:', data.id)
          submissionId = data.id
        }
      } catch (dbError) {
        context.log.error('Database error:', dbError)
        // Don't fail the entire request if database save fails
      }
    } else {
      context.log.warn('Supabase not configured, skipping database save')
    }

    // Send notification email using SendGrid
    if (process.env.SENDGRID_API_KEY) {
      try {
        // Email to PBW NETWORK team
        const notificationEmail = {
          to: process.env.NOTIFICATION_EMAIL || 'support@pbwweb.com',
          from: process.env.FROM_EMAIL || 'noreply@pbwweb.com',
          subject: `New Contact Form Submission from ${formData.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">New Contact Form Submission</h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1e40af;">Contact Information</h3>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
                <p><strong>Project Type:</strong> ${formData.project_type || 'Not specified'}</p>
                <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #1e40af;">Message</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
                <p style="margin: 0; color: #047857;">
                  <strong>Next Steps:</strong> Reply to this email or contact ${formData.name} directly at ${formData.email}
                </p>
              </div>
            </div>
          `,
          text: `
New Contact Form Submission

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.company || 'Not provided'}
- Project Type: ${formData.project_type || 'Not specified'}
- Submission Time: ${new Date().toLocaleString()}

Message:
${formData.message}

Reply to this email or contact ${formData.name} directly at ${formData.email}
          `
        }

        // Auto-response email to the user
        const autoResponseEmail = {
          to: formData.email,
          from: process.env.FROM_EMAIL || 'noreply@pbwweb.com',
          subject: 'Thank you for contacting PBW NETWORK',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; font-size: 28px;">PBW NETWORK</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Professional Web Solutions</p>
              </div>
              
              <div style="padding: 30px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                <h2 style="color: #2563eb; margin-top: 0;">Thank you for reaching out!</h2>
                
                <p>Dear ${formData.name},</p>
                
                <p>We have received your message and appreciate you taking the time to contact PBW NETWORK. Our team of experienced professionals will review your inquiry and respond within 24-48 hours.</p>
                
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #1e40af;">Your Submission Details</h3>
                  <p><strong>Project Type:</strong> ${formData.project_type || 'General Inquiry'}</p>
                  <p><strong>Company:</strong> ${formData.company || 'Not specified'}</p>
                  <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                </div>
                
                <p>In the meantime, feel free to explore our portfolio at <a href="https://pbw.network" style="color: #2563eb;">pbw.network</a> to see examples of our work in enterprise web solutions, utility management systems, and government-compliant applications.</p>
                
                <div style="margin-top: 30px; padding: 20px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
                  <p style="margin: 0; color: #047857;">
                    <strong>Need immediate assistance?</strong><br>
                    Email us directly at <a href="mailto:support@pbwweb.com" style="color: #047857;">support@pbwweb.com</a>
                  </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  <p style="color: #6b7280; margin: 0;">
                    Best regards,<br>
                    <strong>The PBW NETWORK Team</strong><br>
                    <span style="font-size: 14px;">30+ Years of Combined IT Experience</span>
                  </p>
                </div>
              </div>
            </div>
          `,
          text: `
Thank you for contacting PBW NETWORK!

Dear ${formData.name},

We have received your message and appreciate you taking the time to contact PBW NETWORK. Our team of experienced professionals will review your inquiry and respond within 24-48 hours.

Your Submission Details:
- Project Type: ${formData.project_type || 'General Inquiry'}
- Company: ${formData.company || 'Not specified'}
- Submitted: ${new Date().toLocaleString()}

In the meantime, feel free to explore our portfolio at https://pbw.network to see examples of our work.

Need immediate assistance? Email us directly at support@pbwweb.com

Best regards,
The PBW NETWORK Team
30+ Years of Combined IT Experience
          `
        }

        // Send both emails
        await Promise.all([
          sgMail.send(notificationEmail),
          sgMail.send(autoResponseEmail)
        ])

        context.log('Emails sent successfully via SendGrid')
      } catch (emailError) {
        context.log.error('Error sending emails via SendGrid:', emailError)
        // Don't fail the entire request if email fails
      }
    } else {
      context.log.warn('SendGrid API key not configured, skipping email notifications')
    }

    context.res = {
      status: 200,
      headers: corsHeaders,
      body: {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        submissionId: submissionId
      }
    }

  } catch (error) {
    context.log.error('Error processing contact form:', error)
    
    context.res = {
      status: 500,
      headers: corsHeaders,
      body: {
        error: 'Internal server error. Please try again later.',
        success: false
      }
    }
  }
}

export default httpTrigger
