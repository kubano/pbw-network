#!/bin/bash

# PBW Network Deployment Script
# This script helps deploy the PBW Network site to Azure Static Web Apps

set -e

echo "🚀 PBW Network Deployment Script"
echo "================================="

# Check if we're in the right directory
if [ ! -f "src/package.json" ]; then
    echo "❌ Error: Please run this script from the root of the pbw-network repository"
    exit 1
fi

# Function to install dependencies
install_deps() {
    echo "📦 Installing dependencies..."
    cd src
    npm install
    cd ..
    
    echo "📦 Installing API dependencies..."
    cd api
    npm install
    cd ..
}

# Function to build the project
build_project() {
    echo "🔨 Building the project..."
    cd src
    npm run build
    cd ..
}

# Function to run locally
run_local() {
    echo "🏃‍♂️ Starting local development server..."
    cd src
    npm run dev &
    DEV_PID=$!
    
    echo "🔧 Starting Azure Functions locally..."
    cd ../api
    npm start &
    API_PID=$!
    
    echo "✅ Local servers started!"
    echo "   Frontend: http://localhost:3000"
    echo "   API: http://localhost:7071"
    echo "   Press Ctrl+C to stop"
    
    # Wait for Ctrl+C
    trap "echo 'Stopping servers...'; kill $DEV_PID $API_PID 2>/dev/null; exit" INT
    wait
}

# Function to deploy to Azure
deploy_azure() {
    echo "☁️  Deploying to Azure Static Web Apps..."
    
    # Check if Azure CLI is installed
    if ! command -v az &> /dev/null; then
        echo "❌ Azure CLI is not installed. Please install it first:"
        echo "   https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
        exit 1
    fi
    
    # Check if logged in to Azure
    if ! az account show &> /dev/null; then
        echo "🔐 Please log in to Azure:"
        az login
    fi
    
    echo "📦 Building project for production..."
    build_project
    
    echo "🚀 Deployment will be handled by GitHub Actions"
    echo "   Push your changes to the main branch to trigger deployment"
}

# Function to setup Supabase
setup_supabase() {
    echo "🗄️  Setting up Supabase database..."
    echo "Please run the SQL script in supabase/setup.sql in your Supabase dashboard"
    echo "Then update your .env.local file with your Supabase credentials"
}

# Main menu
echo "What would you like to do?"
echo "1. Install dependencies"
echo "2. Build project"
echo "3. Run locally"
echo "4. Deploy to Azure"
echo "5. Setup Supabase"
echo "6. Exit"

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        install_deps
        ;;
    2)
        build_project
        ;;
    3)
        run_local
        ;;
    4)
        deploy_azure
        ;;
    5)
        setup_supabase
        ;;
    6)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please try again."
        exit 1
        ;;
esac

echo "✅ Done!"
