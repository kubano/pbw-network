@echo off
REM PBW Web Architects - Local Development Server (Windows)
REM This script starts both the frontend (Vite) and backend (Azure Functions) servers

echo.
echo ========================================
echo  PBW Web Architects - Local Development
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [INFO] Using Node.js version:
node --version

REM Check if Azure Functions Core Tools is installed
func --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Azure Functions Core Tools not found!
    echo Please install it with: npm install -g azure-functions-core-tools@4
    pause
    exit /b 1
)

echo [INFO] Using Azure Functions Core Tools version:
func --version

REM Kill any existing processes on our ports
echo [INFO] Cleaning up existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":7071" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

REM Install dependencies if --install flag is provided
if "%1"=="--install" (
    echo [INFO] Installing dependencies...
    call npm install
    cd api
    call npm install
    cd ..
    echo [SUCCESS] Dependencies installed
)

REM Start API server
echo [INFO] Starting Azure Functions API server...
cd api
start /b cmd /c "func host start --cors * >api.log 2>&1"
cd ..

REM Wait for API to start
echo [INFO] Waiting for API server to start...
timeout /t 5 /nobreak >nul

REM Start frontend server
echo [INFO] Starting Vite development server...
start /b cmd /c "npm run dev >frontend.log 2>&1"

REM Wait for frontend to start
echo [INFO] Waiting for frontend server to start...
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo           Services Running
echo ========================================
echo.
echo  Frontend (React + Vite)
echo  ^> Local:    http://localhost:3001/
echo.
echo  Backend API (Azure Functions)
echo  ^> API Base:  http://localhost:7071/api
echo  ^> Contact:   http://localhost:7071/api/contact
echo.
echo ========================================
echo.
echo [SUCCESS] Development environment ready!
echo.
echo Email Configuration:
echo   - SendGrid API configured for contact form
echo   - Notification emails sent to: support@pbwweb.com
echo   - Auto-reply emails sent to form submitters
echo.
echo Press any key to stop all servers...
pause >nul

REM Cleanup
echo [INFO] Shutting down development servers...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":7071" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

echo [SUCCESS] All servers stopped successfully
pause
