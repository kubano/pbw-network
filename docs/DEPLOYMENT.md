# PBW Web Architects - Azure Static Web Apps Deployment

This React application is configured for deployment to Azure Static Web Apps with SendGrid email integration for the contact form.

## 🚀 Deployment Setup

### Prerequisites

1. **Azure Account** with an active subscription
2. **SendGrid Account** for email functionality
3. **GitHub Repository** for CI/CD
4. **Node.js 18+** for local development

### Step 1: SendGrid Setup

1. **Create SendGrid Account**
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Verify your email and complete setup

2. **Get API Key**
   - Go to Settings → API Keys
   - Create a new API key with "Full Access" permissions
   - Copy the API key (you'll need it for Azure configuration)

3. **Verify Sender Identity**
   - Go to Settings → Sender Authentication
   - Verify a single sender email address (e.g., noreply@pbwweb.com)
   - Or set up domain authentication for your domain

### Step 2: Azure Static Web Apps Setup

1. **Create Azure Static Web App**
   ```bash
   # Using Azure CLI
   az staticwebapp create \
     --name pbw-web-architects \
     --resource-group your-resource-group \
     --source https://github.com/your-username/pbw-network-react \
     --location "East US 2" \
     --branch main \
     --app-location "/" \
     --api-location "api" \
     --output-location "dist"
   ```

2. **Configure Environment Variables**
   - In Azure Portal, go to your Static Web App
   - Navigate to Configuration → Environment Variables
   - Add the following variables:
     ```
     SENDGRID_API_KEY=your_sendgrid_api_key
     CONTACT_EMAIL=support@pbwweb.com
     FROM_EMAIL=noreply@pbwweb.com
     NODE_ENV=production
     ```
   - **Important**: Wait 2-3 minutes after saving for changes to take effect

3. **Get Deployment Token**
   - In Azure Portal, go to your Static Web App
   - Navigate to Overview → Manage deployment token
   - Copy the deployment token for GitHub Actions

### Step 3: GitHub Repository Setup

1. **Add Secrets to GitHub**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add new repository secret:
     ```
     AZURE_STATIC_WEB_APPS_API_TOKEN=your_deployment_token
     ```

2. **Workflow Configuration**
   - The workflow file is already configured in `.github/workflows/azure-static-web-apps.yml`
   - It will automatically deploy on push to main/master branch

### Step 4: Custom Domain (Optional)

1. **Add Custom Domain**
   - In Azure Portal, go to your Static Web App
   - Navigate to Custom domains
   - Add your domain (e.g., www.pbwweb.com)
   - Follow DNS configuration instructions

## 🏗️ Local Development

### Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/pbw-network-react.git
   cd pbw-network-react
   ```

2. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install API dependencies
   cd api
   npm install
   cd ..
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Edit .env.local with your SendGrid API key
   ```

4. **Start Development**
   ```bash
   # Start frontend (from root directory)
   npm run dev
   
   # In another terminal, start Azure Functions (API)
   cd api
   npx func start
   ```

### Testing Contact Form Locally

1. **Install Azure Functions Core Tools**
   ```bash
   npm install -g azure-functions-core-tools@4 --unsafe-perm true
   ```

2. **Start Both Services**
   ```bash
   # Terminal 1: Frontend (http://localhost:3000)
   npm run dev
   
   # Terminal 2: API (http://localhost:7071)
   cd api
   func start
   ```

3. **Configure API URL**
   - For local development, update the fetch URL in Contact.jsx if needed
   - Production uses relative path `/api/contact`

## 📁 Project Structure

```
pbw-network-react/
├── api/                          # Azure Functions API
│   ├── contact/
│   │   ├── function.json        # Function configuration
│   │   └── index.js             # Contact form handler
│   ├── host.json               # Functions runtime config
│   ├── package.json            # API dependencies
│   ├── .funcignore             # Azure Functions deployment exclusions
│   └── .gitignore              # Git exclusions for API
├── src/                         # React application
│   ├── components/
│   │   └── Contact.jsx         # Contact form component
│   └── ...
├── .github/workflows/
│   └── azure-static-web-apps.yml # Deployment workflow
├── staticwebapp.config.json     # Azure SWA configuration
├── .swatignore                  # SWA CLI deployment exclusions
├── .env.example                 # Environment template
└── package.json                # Frontend dependencies
```

## 🔧 Configuration Files

### `staticwebapp.config.json`
- Routes configuration for Azure Static Web Apps
- API routing and fallback handling
- Security headers and MIME types

### `api/host.json`
- Azure Functions runtime configuration
- Logging and extension bundle settings

### `.github/workflows/azure-static-web-apps.yml`
- GitHub Actions workflow for CI/CD
- Automatic deployment on code changes

## 📧 Email Features

### Contact Form Email
- Professional HTML email template
- Includes all form data in organized format
- Reply-to set to customer email
- SendGrid analytics tracking

### Auto-Reply Email
- Branded thank you message
- Sets customer expectations
- Includes next steps information
- Professional formatting

## 🔒 Security Features

- **CORS Protection**: Proper CORS headers configured
- **Input Validation**: Server-side validation for all form fields
- **Email Validation**: Robust email format checking
- **Rate Limiting**: Inherent Azure Functions protection
- **Security Headers**: CSP, X-Frame-Options, etc.

## 📊 Monitoring

### Azure Application Insights
- Automatic logging for all API calls
- Error tracking and debugging
- Performance monitoring

### SendGrid Analytics
- Email delivery tracking
- Open and click tracking (optional)
- Bounce and spam reporting

## 🚨 Troubleshooting

### Common Issues

1. **Deployment Size Limit Exceeded**
   - Error: "The size of the function content was too large. The limit for this Static Web App is 104857600 bytes"
   - **Solution**: Ensure `.funcignore` and `.swatignore` files exclude `node_modules/`
   - **Files to check**:
     ```
     api/.funcignore         # Excludes files from Azure Functions deployment
     .swatignore            # Excludes files from SWA CLI deployment
     api/.gitignore         # Git exclusions for API directory
     ```

2. **API Not Working**
   - Check environment variables in Azure Portal
   - Verify SendGrid API key permissions
   - Check Azure Functions logs in Application Insights

3. **Emails Not Sending**
   - Verify SendGrid sender authentication
   - Check API key permissions (needs Mail Send)
   - Review SendGrid activity logs

4. **Build Failures**
   - Check Node.js version (requires 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

5. **CSS/Asset Loading Issues**
   - Error: "MIME type ('text/html') is not a supported stylesheet MIME type"
   - **Solution**: Check `staticwebapp.config.json` routing configuration
   - Ensure assets are excluded from HTML fallback routes

### Debugging

```bash
# Check Azure Functions logs locally
func start --verbose

# Test API endpoint directly
curl -X POST http://localhost:7071/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","interest":"testing","message":"Test message"}'
```

## 📞 Support

For deployment issues or questions:
- Email: support@pbwweb.com
- Phone: +1 (863) 354-1971

## 🔄 Updates

To update the application:
1. Make changes to your code
2. Commit and push to main branch
3. GitHub Actions will automatically deploy
4. Monitor deployment in Azure Portal
