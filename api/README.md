# PBW NETWORK API - Azure Functions

This directory contains Azure Functions for handling backend operations, including contact form submissions with SendGrid email integration.

## Setup

### Prerequisites
- Node.js 18+ 
- Azure Functions Core Tools
- SendGrid account and API key

### Installation

1. Install dependencies:
```bash
cd api
npm install
```

2. Configure environment variables:
```bash
cp .env.example local.settings.json
```

3. Update `local.settings.json` with your actual values:
```json
{
  "Values": {
    "SENDGRID_API_KEY": "your-actual-sendgrid-api-key",
    "FROM_EMAIL": "your-from-email@yourdomain.com",
    "NOTIFICATION_EMAIL": "your-notification-email@yourdomain.com"
  }
}
```

### SendGrid Setup

1. Create a SendGrid account at https://sendgrid.com
2. Generate an API key with Mail Send permissions
3. Verify your sender email address/domain
4. Add the API key to your environment variables

### Development

Start the local development server:
```bash
npm run start
```

The function will be available at: `http://localhost:7071/api/contact`

### Deployment

For Azure deployment, configure these environment variables in your Azure Function App:
- `SENDGRID_API_KEY`
- `FROM_EMAIL` 
- `NOTIFICATION_EMAIL`

## Functions

### Contact Form Handler (`/api/contact`)

Handles contact form submissions and sends emails via SendGrid.

**Method**: POST

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "company": "Acme Corp",
  "message": "I'm interested in your services",
  "project_type": "Enterprise Web Application"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "submissionId": "sub_1640995200000"
}
```

## Email Templates

The function sends two emails:

1. **Notification Email**: Sent to PBW NETWORK team with submission details
2. **Auto-Response Email**: Sent to the user confirming receipt

Both emails use professional HTML templates with PBW NETWORK branding.

## Security

- CORS is configured to allow requests from your domain
- Input validation for required fields and email format
- Error handling with appropriate status codes
- Environment variables for sensitive configuration
