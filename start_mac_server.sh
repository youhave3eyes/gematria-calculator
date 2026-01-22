#!/bin/bash

# 🍎 Mac Localhost Server Startup Script
# For Gematria Calculator Testing

echo "🚀 Starting Gematria Calculator Localhost Server..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to find available port
find_available_port() {
    local port=$1
    while lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; do
        port=$((port + 1))
    done
    echo $port
}

# Check what's available on Mac
echo "🔍 Checking available server options..."
echo ""

# Default port
PORT=8000
PORT=$(find_available_port $PORT)

# Try Python 3 first (most common on modern Mac)
if command_exists python3; then
    echo -e "${GREEN}✅ Python 3 found!${NC}"
    echo -e "${BLUE}Starting Python HTTP server on port $PORT...${NC}"
    echo ""
    echo -e "${YELLOW}📱 Open in browser:${NC}"
    echo -e "${GREEN}   http://localhost:$PORT/tmp_rovodev_test_runner.html${NC}"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
    echo ""
    python3 -m http.server $PORT

# Try Python 2 (older Mac)
elif command_exists python; then
    echo -e "${GREEN}✅ Python 2 found!${NC}"
    echo -e "${BLUE}Starting Python HTTP server on port $PORT...${NC}"
    echo ""
    echo -e "${YELLOW}📱 Open in browser:${NC}"
    echo -e "${GREEN}   http://localhost:$PORT/tmp_rovodev_test_runner.html${NC}"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
    echo ""
    python -m SimpleHTTPServer $PORT

# Try PHP (also pre-installed on Mac)
elif command_exists php; then
    echo -e "${GREEN}✅ PHP found!${NC}"
    echo -e "${BLUE}Starting PHP server on port $PORT...${NC}"
    echo ""
    echo -e "${YELLOW}📱 Open in browser:${NC}"
    echo -e "${GREEN}   http://localhost:$PORT/tmp_rovodev_test_runner.html${NC}"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
    echo ""
    php -S localhost:$PORT

# Try Node.js http-server
elif command_exists npx; then
    echo -e "${GREEN}✅ Node.js found!${NC}"
    echo -e "${BLUE}Starting Node HTTP server on port $PORT...${NC}"
    echo ""
    echo -e "${YELLOW}📱 Open in browser:${NC}"
    echo -e "${GREEN}   http://localhost:$PORT/tmp_rovodev_test_runner.html${NC}"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
    echo ""
    npx http-server -p $PORT

# No server found
else
    echo -e "${RED}❌ No server software found!${NC}"
    echo ""
    echo "Please install one of the following:"
    echo "  • Python 3 (recommended): Already on Mac 10.15+"
    echo "  • Node.js: brew install node"
    echo ""
    echo "Or simply double-click the HTML file to open in browser!"
    exit 1
fi
