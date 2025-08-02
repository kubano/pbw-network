#!/bin/bash

echo "🧪 Testing Contact API Endpoint"
echo ""

# Check if API is running
API_URL="http://localhost:7071/api/contact"

echo "📡 Testing API endpoint: $API_URL"
echo ""

# Test data
TEST_DATA='{
  "name": "Test User",
  "email": "test@example.com", 
  "company": "Test Company",
  "phone": "+1234567890",
  "interest": "web-application",
  "message": "This is a test message to verify the contact form API is working correctly."
}'

echo "📤 Sending test request..."
echo ""

# Make the request and capture response
RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
  -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA")

# Extract response body and status code
HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
HTTP_STATUS=$(echo "$RESPONSE" | tail -n1 | sed 's/.*://')

echo "📥 Response Status: $HTTP_STATUS"
echo "📥 Response Body:"
echo "$HTTP_BODY" | jq . 2>/dev/null || echo "$HTTP_BODY"
echo ""

# Check if successful
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ API Test Successful!"
    echo "🎉 Contact form endpoint is working correctly"
elif [ "$HTTP_STATUS" = "500" ]; then
    echo "⚠️  API returned 500 - likely SendGrid configuration issue"
    echo "💡 This is expected if SENDGRID_API_KEY is not configured"
    echo "📧 To fix: Add your SendGrid API key to .env.local"
else
    echo "❌ API Test Failed"
    echo "🔍 Check the API logs for more details"
fi

echo ""
echo "🌐 You can also test via browser at: http://localhost:3000/#contact"
