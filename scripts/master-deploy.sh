#!/bin/bash

# panas-real-estate-tokenization - Master Deployment Script
set -e

echo "🚀 panas-real-estate-tokenization - MASTER DEPLOYMENT"
echo "================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

show_progress() {
    echo -e "${BLUE}📋 $1${NC}"
}

show_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# 1. Install Dependencies
show_progress "Installing dependencies..."
npm ci
show_success "Dependencies installed"

# 2. Run Tests
show_progress "Running tests..."
npm test
show_success "Tests passed"

# 3. Build Application
show_progress "Building application..."
npm run build
show_success "Application built"

# 4. Deploy Backend
show_progress "Deploying backend..."
npm run heroku:deploy
show_success "Backend deployed"

# 5. Deploy Frontend
show_progress "Deploying frontend..."
npm run vercel:deploy
show_success "Frontend deployed"

# 6. Deploy Docker
show_progress "Deploying Docker containers..."
npm run docker:build
npm run docker:up
show_success "Docker deployed"

# 7. Create Release
show_progress "Creating release..."
VERSION=$(node -p "require('./package.json').version")
git tag -a "v$VERSION" -m "Release v$VERSION - panas-real-estate-tokenization"
git push origin "v$VERSION"
show_success "Release v$VERSION created"

echo ""
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETED${NC}"
echo "=========================="
echo "✅ Backend: https://panas-real-estate-tokenization-backend.herokuapp.com"
echo "✅ Frontend: https"
echo "✅ Release: v$VERSION"
