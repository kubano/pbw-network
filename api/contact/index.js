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

        // Prepare email content
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
                    <p style="color: #f0f0f0; margin: 10px 0 0 0;">PBW Web Architects</p>
                </div>
                
                <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 30%;">Name:</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">
                                <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                            </td>
                        </tr>
                        ${company ? `
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Company:</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${company}</td>
                        </tr>
                        ` : ''}
                        ${phone ? `
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone:</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">
                                <a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a>
                            </td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Project Interest:</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${interest}</td>
                        </tr>
                    </table>

                    <h3 style="color: #333; margin: 30px 0 15px 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Project Description</h3>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                        <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>

                    <div style="margin-top: 30px; padding: 20px; background: #f0f4ff; border-radius: 8px; text-align: center;">
                        <p style="color: #555; margin: 0; font-size: 14px;">
                            This email was sent from the PBW Web Architects contact form.<br>
                            <strong>Submitted on:</strong> ${new Date().toLocaleString('en-US', { 
                                timeZone: 'America/New_York',
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                                timeZoneName: 'short'
                            })}
                        </p>
                    </div>
                </div>
            </div>
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

        // Send auto-reply to user
        const autoReplyConfig = {
            to: {
                email: email,
                name: name
            },
            from: {
                email: process.env.FROM_EMAIL || 'noreply@pbwweb.com',
                name: 'PBW Web Architects'
            },
            subject: 'Thank you for contacting PBW Web Architects',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
                        <p style="color: #f0f0f0; margin: 10px 0 0 0;">We've received your message</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">Hi ${name},</p>
                        
                        <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                            Thank you for reaching out to PBW Web Architects! We've received your inquiry about 
                            <strong>${interest}</strong> and appreciate your interest in working with us.
                        </p>
                        
                        <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                            Our team will review your project details and get back to you within 24 hours. 
                            In the meantime, feel free to explore our portfolio and learn more about our services.
                        </p>
                        
                        <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #333; margin: 0 0 15px 0;">What happens next?</h3>
                            <ul style="color: #555; margin: 0; padding-left: 20px;">
                                <li style="margin-bottom: 8px;">We'll review your project requirements</li>
                                <li style="margin-bottom: 8px;">A senior architect will assess the technical scope</li>
                                <li style="margin-bottom: 8px;">We'll schedule a discovery call to discuss your needs</li>
                                <li>You'll receive a detailed proposal within 48-72 hours</li>
                            </ul>
                        </div>
                        
                        <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                            If you have any urgent questions, don't hesitate to call us at 
                            <a href="tel:+18633541971" style="color: #667eea; text-decoration: none;">+1 (863) 354-1971</a>.
                        </p>
                        
                        <p style="color: #333; line-height: 1.6; margin-bottom: 0;">
                            Best regards,<br>
                            <strong>The PBW Web Architects Team</strong>
                        </p>
                    </div>
                </div>
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
