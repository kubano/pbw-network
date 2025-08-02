#!/bin/bash

echo "🚀 Starting PBW Web Architects - Local Development Environment"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Check if API dependencies exist
if [ ! -d "api/node_modules" ]; then
    echo "📦 Installing API dependencies..."
    cd api
    npm install
    cd ..
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  No .env.local file found!"
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo ""
    echo "🔧 Please edit .env.local with your SendGrid API key:"
    echo "   SENDGRID_API_KEY=your_actual_api_key_here"
    echo ""
    read -p "Press Enter after you've configured .env.local..."
fi

echo ""
echo "🌐 Starting services..."
echo ""
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🔧 API will be available at: http://localhost:7071"
echo "📧 Contact API endpoint: http://localhost:7071/api/contact"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Function to kill background processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $FRONTEND_PID $API_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start frontend in background
echo "🚀 Starting frontend..."
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 3

# Start API in background
echo "🚀 Starting API..."
cd api
func start --cors "*" &
API_PID=$!
cd ..

# Wait for both processes
wait
