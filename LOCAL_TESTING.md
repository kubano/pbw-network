# Local Testing Guide

## Quick Start for Local Development

### 1. Install Azure Functions Core Tools
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

### 2. Set Up Environment Variables
```bash
# Copy the environment template
cp .env.example .env.local

# Edit .env.local with your SendGrid API key
# SENDGRID_API_KEY=your_actual_api_key_here
```

### 3. Start Development Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
# Runs on http://localhost:3000 (or 3001 if 3000 is busy)
```

**Terminal 2 - API:**
```bash
cd api
npx func start
# Runs on http://localhost:7071
```

### 4. Test Contact Form
1. Open http://localhost:3000 in your browser
2. Scroll to the Contact section
3. Fill out the form with valid data
4. Submit and check:
   - Console for any errors
   - Your email for the contact form submission
   - The test email address for the auto-reply

### 5. API Testing (Optional)
Test the API directly with curl:
```bash
curl -X POST http://localhost:7071/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "phone": "+1234567890",
    "interest": "web-application",
    "message": "This is a test message from the API."
  }'
```

### Troubleshooting
- **CORS errors**: Make sure both servers are running
- **SendGrid errors**: Check your API key and sender verification
- **Function not found**: Verify the API is running on port 7071
- **Build errors**: Make sure all dependencies are installed

### Production Deployment
Once local testing works, follow the DEPLOYMENT.md guide for Azure deployment.
