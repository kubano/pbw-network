#!/bin/bash

# PBW Web Architects - Local Development Server
# This script starts both the frontend (Vite) and backend (Azure Functions) servers

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}$1${NC}"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a port is in use
port_in_use() {
    lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1
}

# Function to kill processes on specific ports
cleanup_ports() {
    print_status "Cleaning up existing processes..."
    
    if port_in_use 3001; then
        print_warning "Port 3001 is in use, killing existing process..."
        lsof -ti:3001 | xargs kill -9 2>/dev/null || true
    fi
    
    if port_in_use 7071; then
        print_warning "Port 7071 is in use, killing existing process..."
        lsof -ti:7071 | xargs kill -9 2>/dev/null || true
    fi
    
    sleep 2
}

# Function to setup Node.js environment
setup_node_environment() {
    print_header "\n🔧 Setting up Node.js Environment"
    
    # Check if fnm is installed
    if command_exists fnm; then
        print_status "Using fnm to manage Node.js versions..."
        export FNM_PATH="/opt/homebrew/opt/fnm/bin"
        eval "$(fnm env)"
        
        # Install Node.js 18 if not present
        if ! fnm list | grep -q "v18"; then
            print_status "Installing Node.js 18..."
            fnm install 18
        fi
        
        fnm use 18
        print_success "Using Node.js $(node --version)"
    else
        print_warning "fnm not found. Using system Node.js: $(node --version)"
        
        # Check if Node.js version is compatible
        NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$NODE_VERSION" -lt 18 ]; then
            print_error "Node.js 18+ is required for Azure Functions. Current version: $(node --version)"
            exit 1
        fi
    fi
}

# Function to check Azure Functions Core Tools
check_azure_functions_tools() {
    print_header "\n🔧 Checking Azure Functions Core Tools"
    
    if command_exists func; then
        FUNC_VERSION=$(func --version)
        print_success "Azure Functions Core Tools found: $FUNC_VERSION"
        
        # Check if it's version 4.x
        if [[ "$FUNC_VERSION" == 4.* ]]; then
            print_success "Azure Functions Core Tools v4 detected - compatible with Node.js 18"
        else
            print_warning "Azure Functions Core Tools v3 detected. Consider upgrading to v4 for better Node.js support"
        fi
    else
        print_error "Azure Functions Core Tools not found!"
        print_error "Please install it with: npm install -g azure-functions-core-tools@4"
        exit 1
    fi
}

# Function to install dependencies
install_dependencies() {
    print_header "\n📦 Installing Dependencies"
    
    # Install frontend dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    # Install API dependencies
    print_status "Installing API dependencies..."
    cd api
    npm install
    cd ..
    
    print_success "All dependencies installed"
}

# Function to start API server
start_api_server() {
    print_header "\n🚀 Starting Azure Functions API Server"
    
    cd api
    
    # Check if local.settings.json exists
    if [ ! -f "local.settings.json" ]; then
        print_error "local.settings.json not found in api directory!"
        print_error "Please ensure your environment variables are configured."
        exit 1
    fi
    
    # Start Azure Functions in background
    print_status "Starting Azure Functions host on http://localhost:7071"
    
    # Use the correct func binary path
    FUNC_BINARY="func"
    if [ -f "/opt/homebrew/bin/func" ]; then
        FUNC_BINARY="/opt/homebrew/bin/func"
    fi
    
    # Setup Node.js environment for API
    if command_exists fnm; then
        export FNM_PATH="/opt/homebrew/opt/fnm/bin"
        eval "$(fnm env)"
        fnm use 18 >/dev/null 2>&1
    fi
    
    $FUNC_BINARY host start --cors "*" &
    API_PID=$!
    
    cd ..
    
    # Wait for API to start
    print_status "Waiting for API server to start..."
    sleep 5
    
    # Check if API is responding
    if port_in_use 7071; then
        print_success "✅ API server started successfully on http://localhost:7071"
        print_success "📧 Contact endpoint: http://localhost:7071/api/contact"
    else
        print_error "❌ Failed to start API server"
        exit 1
    fi
}

# Function to start frontend server
start_frontend_server() {
    print_header "\n🌐 Starting Frontend Development Server"
    
    print_status "Starting Vite development server on http://localhost:3001"
    
    # Start Vite in background
    npm run dev &
    FRONTEND_PID=$!
    
    # Wait for frontend to start
    print_status "Waiting for frontend server to start..."
    sleep 3
    
    # Check if frontend is responding
    if port_in_use 3001; then
        print_success "✅ Frontend server started successfully on http://localhost:3001"
    else
        print_error "❌ Failed to start frontend server"
        exit 1
    fi
}

# Function to display running services
display_services() {
    print_header "\n🎉 Development Environment Ready!"
    echo ""
    echo -e "${CYAN}┌─────────────────────────────────────────────────────────┐${NC}"
    echo -e "${CYAN}│                    🚀 Services Running                  │${NC}"
    echo -e "${CYAN}├─────────────────────────────────────────────────────────┤${NC}"
    echo -e "${CYAN}│  ${GREEN}Frontend (React + Vite)${NC}                            ${CYAN}│${NC}"
    echo -e "${CYAN}│  ${YELLOW}➜  Local:    http://localhost:3001/                 ${CYAN}│${NC}"
    echo -e "${CYAN}│                                                         │${NC}"
    echo -e "${CYAN}│  ${GREEN}Backend API (Azure Functions)${NC}                     ${CYAN}│${NC}"
    echo -e "${CYAN}│  ${YELLOW}➜  API Base:  http://localhost:7071/api             ${CYAN}│${NC}"
    echo -e "${CYAN}│  ${YELLOW}➜  Contact:   http://localhost:7071/api/contact     ${CYAN}│${NC}"
    echo -e "${CYAN}├─────────────────────────────────────────────────────────┤${NC}"
    echo -e "${CYAN}│  ${PURPLE}Node.js Version: $(node --version)                         ${CYAN}│${NC}"
    echo -e "${CYAN}│  ${PURPLE}Azure Functions: v$(func --version 2>/dev/null || echo 'Unknown')                        ${CYAN}│${NC}"
    echo -e "${CYAN}└─────────────────────────────────────────────────────────┘${NC}"
    echo ""
    echo -e "${GREEN}📧 Email Configuration:${NC}"
    echo -e "   • SendGrid API configured for contact form"
    echo -e "   • Notification emails sent to: support@pbwweb.com"
    echo -e "   • Auto-reply emails sent to form submitters"
    echo ""
    echo -e "${YELLOW}💡 Development Tips:${NC}"
    echo -e "   • Contact form submissions will trigger email notifications"
    echo -e "   • Check terminal output for API logs and debugging info"
    echo -e "   • Frontend changes auto-reload, API changes require restart"
    echo ""
    echo -e "${RED}🛑 To stop all servers, press Ctrl+C${NC}"
}

# Function to handle cleanup on exit
cleanup() {
    print_header "\n🛑 Shutting down development servers..."
    
    if [ ! -z "$API_PID" ]; then
        print_status "Stopping API server (PID: $API_PID)..."
        kill $API_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        print_status "Stopping frontend server (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    
    # Cleanup any remaining processes on our ports
    cleanup_ports
    
    print_success "✅ All servers stopped successfully"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main execution
main() {
    print_header "🏗️  PBW Web Architects - Local Development Environment"
    print_header "=================================================="
    
    # Cleanup any existing processes
    cleanup_ports
    
    # Setup environment
    setup_node_environment
    check_azure_functions_tools
    
    # Install dependencies if needed
    if [ "$1" == "--install" ] || [ "$1" == "-i" ]; then
        install_dependencies
    fi
    
    # Start servers
    start_api_server
    start_frontend_server
    
    # Display status
    display_services
    
    # Keep script running and wait for user to stop
    print_status "Development servers are running. Press Ctrl+C to stop all servers."
    
    # Wait indefinitely
    while true; do
        sleep 1
    done
}

# Check for help flag
if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
    echo "PBW Web Architects - Local Development Script"
    echo ""
    echo "Usage: ./start-local.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help      Show this help message"
    echo "  -i, --install   Install dependencies before starting servers"
    echo ""
    echo "This script will:"
    echo "  1. Setup Node.js 18 environment using fnm"
    echo "  2. Start Azure Functions API on http://localhost:7071"
    echo "  3. Start Vite frontend on http://localhost:3001"
    echo "  4. Display service status and usage information"
    echo ""
    echo "Press Ctrl+C to stop all servers."
    exit 0
fi

# Run main function
main "$@"
