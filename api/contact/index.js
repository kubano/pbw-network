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
        const { name, email, company, phone, interest, message, recaptchaToken } = req.body || {};

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

        // Validate reCAPTCHA token
        if (!recaptchaToken) {
            context.res = {
                ...context.res,
                status: 400,
                body: { error: 'Security verification failed. Please try again.' }
            };
            return;
        }

        // Verify reCAPTCHA token with Google
        const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (!recaptchaSecretKey) {
            context.log.error('RECAPTCHA_SECRET_KEY environment variable is not set');
            context.res = {
                ...context.res,
                status: 500,
                body: { error: 'Server configuration error' }
            };
            return;
        }

        try {
            const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    secret: recaptchaSecretKey,
                    response: recaptchaToken,
                    remoteip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || ''
                })
            });

            const recaptchaResult = await recaptchaResponse.json();
            
            if (!recaptchaResult.success) {
                context.log.warn('reCAPTCHA verification failed:', recaptchaResult['error-codes']);
                context.res = {
                    ...context.res,
                    status: 400,
                    body: { error: 'Security verification failed. Please try again.' }
                };
                return;
            }

            // Check reCAPTCHA score (for v3, score should be > 0.5)
            if (recaptchaResult.score && recaptchaResult.score < 0.5) {
                context.log.warn(`reCAPTCHA score too low: ${recaptchaResult.score}`);
                context.res = {
                    ...context.res,
                    status: 400,
                    body: { error: 'Security verification failed. Please try again.' }
                };
                return;
            }

            context.log(`reCAPTCHA verification successful. Score: ${recaptchaResult.score || 'N/A'}`);
        } catch (recaptchaError) {
            context.log.error('Error verifying reCAPTCHA:', recaptchaError);
            context.res = {
                ...context.res,
                status: 500,
                body: { error: 'Security verification failed. Please try again.' }
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

        // Prepare email content with clean, professional design
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Contact Form Submission</title>
            </head>
            <body style="margin: 0; padding: 20px; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
                    
                    <!-- Header Section -->
                    <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #4f46e5;">
                        <h1 style="color: #1e293b; margin: 0; font-size: 28px; font-weight: 700;">New Contact Request</h1>
                        <p style="color: #64748b; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">PBW Web Architects</p>
                    </div>
                    
                    <!-- Main Content -->
                    <div style="padding: 32px 24px;">
                        
                        <!-- Contact Information -->
                        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Contact Information</h2>
                            
                            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #374151; width: 30%; vertical-align: top;">
                                        Full Name:
                                    </td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 500;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #374151; vertical-align: top;">
                                        Email Address:
                                    </td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                        <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">${email}</a>
                                    </td>
                                </tr>
                                ${company ? `
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #374151; vertical-align: top;">
                                        Company:
                                    </td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 500;">${company}</td>
                                </tr>
                                ` : ''}
                                ${phone ? `
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #374151; vertical-align: top;">
                                        Phone Number:
                                    </td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                        <a href="tel:${phone}" style="color: #059669; text-decoration: none; font-weight: 500;">${phone}</a>
                                    </td>
                                </tr>
                                ` : ''}
                                <tr>
                                    <td style="padding: 12px 0; font-weight: 600; color: #374151; vertical-align: top;">
                                        Project Type:
                                    </td>
                                    <td style="padding: 12px 0;">
                                        <span style="background-color: #4f46e5; color: #ffffff; padding: 6px 12px; border-radius: 4px; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">${interest}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <!-- Message Section -->
                        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
                            <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Project Details</h3>
                            <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; border-left: 4px solid #4f46e5;">
                                <p style="color: #1e293b; line-height: 1.6; margin: 0; font-size: 15px; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div style="text-align: center; margin: 32px 0 24px 0;">
                            <a href="mailto:${email}?subject=Re: Your inquiry about ${interest}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 0 8px;">
                                Reply to ${name}
                            </a>
                            ${phone ? `
                            <a href="tel:${phone}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 0 8px;">
                                Call Now
                            </a>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background-color: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                        <p style="color: #6b7280; margin: 0; font-size: 13px; line-height: 1.5;">
                            <strong style="color: #374151;">Submitted:</strong> ${new Date().toLocaleString('en-US', { 
                                timeZone: 'America/New_York',
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                                timeZoneName: 'short'
                            })}<br>
                            This email was automatically generated from the PBW Web Architects contact form.
                        </p>
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
                </head>
                <body style="margin: 0; padding: 20px; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
                        
                        <!-- Header Section -->
                        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #10b981;">
                            <h1 style="color: #1e293b; margin: 0; font-size: 28px; font-weight: 700;">Thank You!</h1>
                            <p style="color: #059669; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">Your message has been received</p>
                        </div>
                        
                        <!-- Main Content -->
                        <div style="padding: 32px 24px;">
                            
                            <!-- Personal Greeting -->
                            <div style="text-align: center; margin-bottom: 24px;">
                                <h2 style="color: #1e293b; margin: 0 0 12px 0; font-size: 24px; font-weight: 600;">Hi ${name}!</h2>
                                <p style="color: #6b7280; font-size: 16px; margin: 0;">We're excited to learn about your project!</p>
                            </div>

                            <!-- Thank You Message -->
                            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px; margin-bottom: 24px; text-align: center;">
                                <p style="color: #1e293b; line-height: 1.6; margin: 0; font-size: 15px;">
                                    Thank you for reaching out to <strong>PBW Web Architects</strong>! We've received your inquiry about 
                                    <span style="background-color: #10b981; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-weight: 600;">${interest}</span> 
                                    and appreciate your interest in working with us.
                                </p>
                            </div>

                            <!-- What Happens Next -->
                            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                                <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; text-align: center;">
                                    What happens next?
                                </h3>
                                
                                <div style="margin-bottom: 16px; padding: 16px; background-color: #ffffff; border-radius: 6px; border-left: 4px solid #4f46e5;">
                                    <div style="display: flex; align-items: flex-start;">
                                        <div style="width: 24px; height: 24px; background-color: #4f46e5; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0; font-size: 12px;">1</div>
                                        <div>
                                            <strong style="color: #1e293b; font-size: 14px;">Project Review</strong>
                                            <p style="color: #6b7280; margin: 4px 0 0 0; font-size: 13px;">Our senior architects will carefully review your project requirements and technical scope.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="margin-bottom: 16px; padding: 16px; background-color: #ffffff; border-radius: 6px; border-left: 4px solid #7c3aed;">
                                    <div style="display: flex; align-items: flex-start;">
                                        <div style="width: 24px; height: 24px; background-color: #7c3aed; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0; font-size: 12px;">2</div>
                                        <div>
                                            <strong style="color: #1e293b; font-size: 14px;">Discovery Call</strong>
                                            <p style="color: #6b7280; margin: 4px 0 0 0; font-size: 13px;">We'll schedule a call to dive deeper into your vision, goals, and technical requirements.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="padding: 16px; background-color: #ffffff; border-radius: 6px; border-left: 4px solid #10b981;">
                                    <div style="display: flex; align-items: flex-start;">
                                        <div style="width: 24px; height: 24px; background-color: #10b981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0; font-size: 12px;">3</div>
                                        <div>
                                            <strong style="color: #1e293b; font-size: 14px;">Detailed Proposal</strong>
                                            <p style="color: #6b7280; margin: 4px 0 0 0; font-size: 13px;">You'll receive a comprehensive proposal with timeline, pricing, and technical approach within 48-72 hours.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Response Time -->
                            <div style="background-color: #eff6ff; border: 1px solid #93c5fd; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
                                <h4 style="color: #1e293b; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Expected Response Time</h4>
                                <p style="color: #6b7280; margin: 0; font-size: 14px;">
                                    <strong style="color: #2563eb;">Within 24 hours</strong> - We'll personally reach out to discuss your project
                                </p>
                            </div>

                            <!-- Contact Information -->
                            <div style="background-color: #fef7ff; border: 1px solid #e879f9; border-radius: 8px; padding: 20px; text-align: center;">
                                <h4 style="color: #1e293b; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Need to reach us immediately?</h4>
                                <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                                    <a href="tel:+18633541971" style="display: inline-block; background-color: #a855f7; color: #ffffff; padding: 10px 16px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; margin-right: 12px;">
                                        +1 (863) 354-1971
                                    </a>
                                    <a href="mailto:support@pbwweb.com" style="display: inline-block; background-color: #ec4899; color: #ffffff; padding: 10px 16px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                                        support@pbwweb.com
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div style="background-color: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="color: #6b7280; margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">
                                Best regards,<br>
                                <span style="color: #374151;">The PBW Web Architects Team</span>
                            </p>
                            <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                                Building digital excellence since 2020<br>
                                This is an automated response. Please do not reply to this email.
                            </p>
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
