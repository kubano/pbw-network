#!/bin/bash

# Test script for Azure Static Web Apps deployment
echo "🧪 Testing PBW Web Architects deployment setup..."

echo ""
echo "📁 Checking project structure..."

# Check main files
files_to_check=(
    "package.json"
    "src/components/Contact.jsx"
    "api/contact/index.js"
    "api/contact/function.json"
    "api/package.json"
    "staticwebapp.config.json"
    ".github/workflows/azure-static-web-apps.yml"
    "DEPLOYMENT.md"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

echo ""
echo "🔧 Testing build process..."

# Test frontend build
if npm run build > /dev/null 2>&1; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
fi

# Check if dist directory was created
if [ -d "dist" ]; then
    echo "✅ Build output directory created"
    echo "   📦 Build files:"
    ls -la dist/
else
    echo "❌ Build output directory not found"
fi

echo ""
echo "📧 Checking API configuration..."

# Check if API dependencies are installed
if [ -f "api/node_modules/@sendgrid/mail/package.json" ]; then
    echo "✅ SendGrid dependency installed"
else
    echo "❌ SendGrid dependency not found - run 'cd api && npm install'"
fi

# Check function configuration
if grep -q "httpTrigger" api/contact/function.json; then
    echo "✅ HTTP trigger configured"
else
    echo "❌ HTTP trigger not properly configured"
fi

echo ""
echo "🔒 Checking environment configuration..."

if [ -f ".env.example" ]; then
    echo "✅ Environment template exists"
    echo "   🔑 Required variables:"
    grep "^[A-Z]" .env.example | cut -d'=' -f1 | sed 's/^/   - /'
else
    echo "❌ Environment template missing"
fi

echo ""
echo "🚀 Deployment checklist:"
echo "   📋 Before deploying, ensure you have:"
echo "   1. SendGrid account and API key"
echo "   2. Azure subscription"
echo "   3. GitHub repository"
echo "   4. Environment variables configured in Azure"
echo ""
echo "   📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "✨ Setup verification complete!"
