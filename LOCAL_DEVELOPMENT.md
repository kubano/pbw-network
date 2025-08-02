# Local Development Setup

This document explains how to run the PBW Web Architects application locally for development and testing.

## Prerequisites

### Required Software
- **Node.js 18+** (recommended: use a version manager like fnm, nvm, or volta)
- **Azure Functions Core Tools v4** (for API development)
- **Git** (for version control)

### Installation Commands

#### Node.js Version Manager (fnm - recommended for macOS)
```bash
# Install fnm
curl -fsSL https://fnm.vercel.app/install | bash

# Install and use Node.js 18
fnm install 18
fnm use 18
```

#### Azure Functions Core Tools
```bash
# Using npm (global installation)
npm install -g azure-functions-core-tools@4

# Or using Homebrew (macOS)
brew install azure-functions-core-tools@4
```

## Environment Setup

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd pbw-network
npm install
cd api && npm install && cd ..
```

### 2. Configure Environment Variables
The API requires a SendGrid API key for email functionality. The key is already configured in `api/local.settings.json` for local development.

**For production deployment**, you'll need to set these environment variables in Azure Portal:
- `SENDGRID_API_KEY` - Your SendGrid API key
- `CONTACT_EMAIL` - Email address to receive contact form submissions
- `FROM_EMAIL` - Email address to send from

## Running the Development Environment

### Option 1: Automated Script (Recommended)

#### macOS/Linux
```bash
# Quick start (if dependencies are already installed)
./start-local.sh

# Start with dependency installation
./start-local.sh --install

# Or using npm
npm run start:local
npm run start:local:install
```

#### Windows
```cmd
REM Quick start
start-local.bat

REM Start with dependency installation  
start-local.bat --install
```

### Option 2: Manual Start

#### Terminal 1 - API Server
```bash
cd api
fnm use 18  # or ensure Node.js 18+ is active
func host start --cors "*"
```

#### Terminal 2 - Frontend Server
```bash
npm run dev
```

## Development URLs

Once both servers are running:

- **Frontend**: http://localhost:3001/
- **API Base**: http://localhost:7071/api
- **Contact Endpoint**: http://localhost:7071/api/contact

## Testing the Contact Form

1. Open http://localhost:3001/ in your browser
2. Navigate to the contact form
3. Fill out the form with test data:
   - Name: Test User
   - Email: your-email@example.com  
   - Company: Test Company (optional)
   - Phone: +1 (555) 123-4567 (optional)
   - Project Interest: Select any option
   - Message: Enter a test message

4. Submit the form
5. Check the terminal running the API for logs
6. Check your email for the notification and auto-reply

## Project Structure

```
pbw-network/
├── src/                          # Frontend React application
│   ├── components/              # React components
│   ├── data/                    # Static data files
│   └── ...
├── api/                         # Azure Functions backend
│   ├── contact/                 # Contact form handler function
│   │   ├── function.json       # Function configuration
│   │   └── index.js            # Function implementation
│   ├── host.json               # Azure Functions host config
│   ├── local.settings.json     # Local environment variables
│   └── package.json            # API dependencies
├── public/                      # Static assets
├── start-local.sh              # Development script (macOS/Linux)
├── start-local.bat             # Development script (Windows)
└── package.json                # Frontend dependencies
```

## Development Features

### Email System
- **Notification Email**: Sent to `support@pbwweb.com` with form details
- **Auto-Reply Email**: Sent to the form submitter with a thank you message
- **Professional Templates**: HTML emails with dark mode support and responsive design

### Hot Reloading
- **Frontend**: Vite provides instant hot reloading for React components
- **API**: Azure Functions require restart for changes (automatic with file watchers)

### CORS Configuration
- API is configured with CORS enabled for local development
- Frontend can make requests to the local API without issues

## Troubleshooting

### Common Issues

#### "Incompatible Node.js version" Error
- Ensure you're using Node.js 18+ for the API
- Use `fnm use 18` or your version manager to switch

#### Port Already in Use
- The scripts automatically clean up existing processes
- Manual cleanup: `lsof -ti:3001 | xargs kill -9` (frontend) or `lsof -ti:7071 | xargs kill -9` (API)

#### SendGrid Email Errors
- Check that `SENDGRID_API_KEY` is set in `api/local.settings.json`
- Verify the API key is valid and has send permissions
- Check SendGrid dashboard for quota limits

#### Azure Functions Not Starting
- Verify Azure Functions Core Tools v4 is installed: `func --version`
- Ensure you're in the `api` directory when running `func host start`
- Check that `host.json` and `local.settings.json` exist

### Debug Mode

For detailed logging, you can run the API with verbose output:
```bash
cd api
func host start --cors "*" --verbose
```

## Production Deployment

This local setup mimics the production environment:
- Frontend builds to static files deployed via Azure Static Web Apps
- API runs as Azure Functions with the same configuration
- Environment variables are configured in Azure Portal

For deployment instructions, see `DEPLOYMENT.md`.

## Support

If you encounter issues:
1. Check this README for troubleshooting steps
2. Review terminal output for error messages
3. Ensure all prerequisites are correctly installed
4. Verify environment variables are properly configured
