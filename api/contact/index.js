const sgMail = require('@sendgrid/mail');

module.exports = async function (context, req) {
    context.log('Contact form submission received');

    // Set CORS headers
    context.res = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    };

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        context.res.status = 200;
        return;
    }

    // Validate request method
    if (req.method !== 'POST') {
        context.res = {
            ...context.res,
            status: 405,
            body: { error: 'Method not allowed. Use POST.' }
        };
        return;
    }

    try {
        // Validate required environment variable
        const sendGridApiKey = process.env.SENDGRID_API_KEY;
        if (!sendGridApiKey) {
            context.log.error('SENDGRID_API_KEY environment variable is not set');
            context.res = {
                ...context.res,
                status: 500,
                body: { error: 'Server configuration error' }
            };
            return;
        }

        // Validate request body
        const { name, email, company, phone, interest, message } = req.body || {};

        if (!name || !email || !interest || !message) {
            context.res = {
                ...context.res,
                status: 400,
                body: { 
                    error: 'Missing required fields',
                    required: ['name', 'email', 'interest', 'message']
                }
            };
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            context.res = {
                ...context.res,
                status: 400,
                body: { error: 'Invalid email format' }
            };
            return;
        }

        // Set SendGrid API key
        sgMail.setApiKey(sendGridApiKey);

        // Prepare email content with improved dark-friendly design
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Contact Form Submission</title>
                <style>
                    @media (prefers-color-scheme: dark) {
                        .email-container { background-color: #1a1a1a !important; }
                        .content-section { background-color: #2d2d2d !important; }
                        .text-primary { color: #ffffff !important; }
                        .text-secondary { color: #cccccc !important; }
                        .border-color { border-color: #444444 !important; }
                    }
                </style>
            </head>
            <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <div class="email-container" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header Section -->
                    <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%); padding: 40px 30px; text-align: center; position: relative;">
                        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.1);"></div>
                        <div style="position: relative; z-index: 1;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">📧 New Contact Request</h1>
                            <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 18px; font-weight: 500;">PBW Web Architects</p>
                            <div style="width: 60px; height: 4px; background: rgba(255, 255, 255, 0.3); margin: 20px auto 0; border-radius: 2px;"></div>
                        </div>
                    </div>
                    
                    <!-- Main Content -->
                    <div class="content-section" style="background-color: #ffffff; padding: 40px 30px;">
                        
                        <!-- Contact Information Card -->
                        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
                            <h2 class="text-primary" style="color: #1e293b; margin: 0 0 25px 0; font-size: 24px; font-weight: 600; display: flex; align-items: center;">
                                <span style="display: inline-block; width: 8px; height: 8px; background: #4f46e5; border-radius: 50%; margin-right: 12px;"></span>
                                Contact Information
                            </h2>
                            
                            <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
                                <tr>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 35%; vertical-align: top;">
                                        <span style="display: inline-block; width: 6px; height: 6px; background: #8b5cf6; border-radius: 50%; margin-right: 8px;"></span>
                                        Full Name:
                                    </td>
                                    <td class="text-primary" style="padding: 15px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 500;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; vertical-align: top;">
                                        <span style="display: inline-block; width: 6px; height: 6px; background: #ec4899; border-radius: 50%; margin-right: 8px;"></span>
                                        Email Address:
                                    </td>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none; font-weight: 500; padding: 8px 16px; background: #eef2ff; border-radius: 6px; display: inline-block; transition: all 0.3s ease;">${email}</a>
                                    </td>
                                </tr>
                                ${company ? `
                                <tr>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; vertical-align: top;">
                                        <span style="display: inline-block; width: 6px; height: 6px; background: #06b6d4; border-radius: 50%; margin-right: 8px;"></span>
                                        Company:
                                    </td>
                                    <td class="text-primary" style="padding: 15px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 500;">${company}</td>
                                </tr>
                                ` : ''}
                                ${phone ? `
                                <tr>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; vertical-align: top;">
                                        <span style="display: inline-block; width: 6px; height: 6px; background: #10b981; border-radius: 50%; margin-right: 8px;"></span>
                                        Phone Number:
                                    </td>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <a href="tel:${phone}" style="color: #059669; text-decoration: none; font-weight: 500; padding: 8px 16px; background: #ecfdf5; border-radius: 6px; display: inline-block;">${phone}</a>
                                    </td>
                                </tr>
                                ` : ''}
                                <tr>
                                    <td style="padding: 15px 0; font-weight: 600; color: #475569; vertical-align: top;">
                                        <span style="display: inline-block; width: 6px; height: 6px; background: #f59e0b; border-radius: 50%; margin-right: 8px;"></span>
                                        Project Type:
                                    </td>
                                    <td style="padding: 15px 0;">
                                        <span style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">${interest}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <!-- Message Section -->
                        <div style="background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px;">
                            <h3 class="text-primary" style="color: #1e293b; margin: 0 0 20px 0; font-size: 22px; font-weight: 600; display: flex; align-items: center;">
                                <span style="display: inline-block; width: 8px; height: 8px; background: #4f46e5; border-radius: 50%; margin-right: 12px;"></span>
                                Project Details & Requirements
                            </h3>
                            <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 25px; border-radius: 10px; border-left: 5px solid #4f46e5; position: relative;">
                                <div style="position: absolute; top: 20px; right: 20px; width: 40px; height: 40px; background: rgba(79, 70, 229, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <span style="font-size: 18px;">💭</span>
                                </div>
                                <p class="text-primary" style="color: #1e293b; line-height: 1.8; margin: 0; font-size: 16px; white-space: pre-wrap; font-weight: 400; padding-right: 60px;">${message}</p>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div style="text-align: center; margin: 40px 0 30px 0;">
                            <a href="mailto:${email}?subject=Re: Your inquiry about ${interest}" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 0 10px; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3); transition: all 0.3s ease;">
                                📧 Reply to ${name}
                            </a>
                            ${phone ? `
                            <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 0 10px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); transition: all 0.3s ease;">
                                📞 Call Now
                            </a>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 25px 30px; text-align: center;">
                        <div style="border-top: 1px solid #475569; padding-top: 20px;">
                            <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.6;">
                                <strong style="color: #e2e8f0;">📅 Submitted:</strong> ${new Date().toLocaleString('en-US', { 
                                    timeZone: 'America/New_York',
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    timeZoneName: 'short'
                                })}<br>
                                <span style="color: #64748b;">This email was automatically generated from the PBW Web Architects contact form.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        const textContent = `
New Contact Form Submission - PBW Web Architects

Contact Details:
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${phone ? `Phone: ${phone}` : ''}
Project Interest: ${interest}

Project Description:
${message}

Submitted on: ${new Date().toLocaleString('en-US', { 
    timeZone: 'America/New_York',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
})}
        `;

        // Email configuration
        const emailConfig = {
            to: process.env.CONTACT_EMAIL || 'support@pbwweb.com',
            from: {
                email: process.env.FROM_EMAIL || 'noreply@pbwweb.com',
                name: 'PBW Web Architects Contact Form'
            },
            replyTo: {
                email: email,
                name: name
            },
            subject: `New Contact Form Submission from ${name} - ${interest}`,
            text: textContent,
            html: htmlContent,
            // Add tracking and categories for SendGrid analytics
            trackingSettings: {
                clickTracking: {
                    enable: false
                },
                openTracking: {
                    enable: true
                }
            },
            categories: ['contact-form', 'website']
        };

        // Send email
        context.log(`Sending email to ${emailConfig.to}`);
        await sgMail.send(emailConfig);

        // Send auto-reply to user with improved design
        const autoReplyConfig = {
            to: {
                email: email,
                name: name
            },
            from: {
                email: process.env.FROM_EMAIL || 'noreply@pbwweb.com',
                name: 'PBW Web Architects'
            },
            subject: 'Thank you for contacting PBW Web Architects! 🚀',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Thank You - PBW Web Architects</title>
                    <style>
                        @media (prefers-color-scheme: dark) {
                            .email-container { background-color: #1a1a1a !important; }
                            .content-section { background-color: #2d2d2d !important; }
                            .text-primary { color: #ffffff !important; }
                            .text-secondary { color: #cccccc !important; }
                            .border-color { border-color: #444444 !important; }
                        }
                    </style>
                </head>
                <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    <div class="email-container" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);">
                        
                        <!-- Header Section -->
                        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%); padding: 40px 30px; text-align: center; position: relative;">
                            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.1);"></div>
                            <div style="position: relative; z-index: 1;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">🙏 Thank You!</h1>
                                <p style="color: #d1fae5; margin: 8px 0 0 0; font-size: 18px; font-weight: 500;">Your message has been received</p>
                                <div style="width: 60px; height: 4px; background: rgba(255, 255, 255, 0.3); margin: 20px auto 0; border-radius: 2px;"></div>
                            </div>
                        </div>
                        
                        <!-- Main Content -->
                        <div class="content-section" style="background-color: #ffffff; padding: 40px 30px;">
                            
                            <!-- Personal Greeting -->
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h2 class="text-primary" style="color: #1e293b; margin: 0 0 15px 0; font-size: 28px; font-weight: 600;">Hi ${name}! 👋</h2>
                                <p class="text-secondary" style="color: #64748b; font-size: 18px; margin: 0;">We're excited to learn about your project!</p>
                            </div>

                            <!-- Thank You Message -->
                            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1px solid #bbf7d0; border-radius: 12px; padding: 30px; margin-bottom: 30px; text-align: center;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 24px;">✅</div>
                                <p class="text-primary" style="color: #1e293b; line-height: 1.6; margin: 0; font-size: 16px;">
                                    Thank you for reaching out to <strong>PBW Web Architects</strong>! We've received your inquiry about 
                                    <span style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 4px 12px; border-radius: 16px; font-weight: 600;">${interest}</span> 
                                    and appreciate your interest in working with us.
                                </p>
                            </div>

                            <!-- What Happens Next -->
                            <div style="background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
                                <h3 class="text-primary" style="color: #1e293b; margin: 0 0 25px 0; font-size: 22px; font-weight: 600; text-align: center;">
                                    🚀 What happens next?
                                </h3>
                                
                                <div style="display: flex; flex-direction: column; gap: 20px;">
                                    <div style="display: flex; align-items: flex-start; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #4f46e5;">
                                        <div style="width: 30px; height: 30px; background: #4f46e5; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</div>
                                        <div>
                                            <strong class="text-primary" style="color: #1e293b;">Project Review</strong>
                                            <p class="text-secondary" style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Our senior architects will carefully review your project requirements and technical scope.</p>
                                        </div>
                                    </div>
                                    
                                    <div style="display: flex; align-items: flex-start; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #7c3aed;">
                                        <div style="width: 30px; height: 30px; background: #7c3aed; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</div>
                                        <div>
                                            <strong class="text-primary" style="color: #1e293b;">Discovery Call</strong>
                                            <p class="text-secondary" style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">We'll schedule a call to dive deeper into your vision, goals, and technical requirements.</p>
                                        </div>
                                    </div>
                                    
                                    <div style="display: flex; align-items: flex-start; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #10b981;">
                                        <div style="width: 30px; height: 30px; background: #10b981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</div>
                                        <div>
                                            <strong class="text-primary" style="color: #1e293b;">Detailed Proposal</strong>
                                            <p class="text-secondary" style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">You'll receive a comprehensive proposal with timeline, pricing, and technical approach within 48-72 hours.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Response Time -->
                            <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 1px solid #93c5fd; border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 30px;">
                                <div style="font-size: 48px; margin-bottom: 15px;">⏰</div>
                                <h4 class="text-primary" style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">Expected Response Time</h4>
                                <p class="text-secondary" style="color: #64748b; margin: 0; font-size: 16px;">
                                    <strong style="color: #2563eb;">Within 24 hours</strong> - We'll personally reach out to discuss your project
                                </p>
                            </div>

                            <!-- Contact Information -->
                            <div style="background: linear-gradient(135deg, #fef7ff 0%, #fae8ff 100%); border: 1px solid #e879f9; border-radius: 12px; padding: 25px; text-align: center;">
                                <h4 class="text-primary" style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Need to reach us immediately?</h4>
                                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                                    <a href="tel:+18633541971" style="display: inline-flex; align-items: center; background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); color: #ffffff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);">
                                        📞 +1 (863) 354-1971
                                    </a>
                                    <a href="mailto:support@pbwweb.com" style="display: inline-flex; align-items: center; background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); color: #ffffff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);">
                                        📧 support@pbwweb.com
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px; text-align: center;">
                            <p style="color: #94a3b8; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                                Best regards,<br>
                                <span style="color: #e2e8f0; font-size: 20px;">The PBW Web Architects Team</span>
                            </p>
                            <div style="border-top: 1px solid #475569; padding-top: 20px; margin-top: 20px;">
                                <p style="color: #64748b; margin: 0; font-size: 14px;">
                                    🏢 Building digital excellence since 2020<br>
                                    <span style="color: #94a3b8;">This is an automated response. Please do not reply to this email.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `Hi ${name},

Thank you for reaching out to PBW Web Architects! We've received your inquiry about ${interest} and appreciate your interest in working with us.

Our team will review your project details and get back to you within 24 hours. In the meantime, feel free to explore our portfolio and learn more about our services.

What happens next?
- We'll review your project requirements
- A senior architect will assess the technical scope  
- We'll schedule a discovery call to discuss your needs
- You'll receive a detailed proposal within 48-72 hours

If you have any urgent questions, don't hesitate to call us at +1 (863) 354-1971.

Best regards,
The PBW Web Architects Team`,
            categories: ['auto-reply', 'contact-form']
        };

        await sgMail.send(autoReplyConfig);

        context.log('Emails sent successfully');

        // Success response
        context.res = {
            ...context.res,
            status: 200,
            body: { 
                success: true,
                message: 'Contact form submitted successfully. We\'ll get back to you within 24 hours!' 
            }
        };

    } catch (error) {
        context.log.error('Error processing contact form:', error);
        
        // Check if it's a SendGrid specific error
        if (error.response?.body) {
            context.log.error('SendGrid error details:', error.response.body);
        }

        context.res = {
            ...context.res,
            status: 500,
            body: { 
                error: 'Failed to send message. Please try again later or contact us directly.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }
        };
    }
};
