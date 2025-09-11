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

# Detect components
HAS_BACKEND=false
HAS_FRONTEND=false
HAS_DOCKER_BACKEND=false
HAS_DOCKER_FRONTEND=false

if [ -d "backend" ] && [ -f "backend/package.json" ]; then
    HAS_BACKEND=true
fi

if [ -d "frontend" ] && [ -f "frontend/package.json" ]; then
    HAS_FRONTEND=true
fi

if [ -f "backend/Dockerfile" ]; then
    HAS_DOCKER_BACKEND=true
fi

if [ -f "frontend/Dockerfile" ]; then
    HAS_DOCKER_FRONTEND=true
fi

# 1. Install Dependencies
show_progress "Installing dependencies..."
if [ -f package-lock.json ] || [ -f npm-shrinkwrap.json ]; then
    npm ci
else
    show_progress "No lockfile found, running npm install"
    npm install
fi
show_success "Dependencies installed"

# 2. Run Tests
if [ "$HAS_BACKEND" = true ]; then
    show_progress "Running backend tests..."
    npm run test:backend
    show_success "Backend tests passed"
else
    show_progress "Skipping backend tests (backend not present)"
fi

if [ "$HAS_FRONTEND" = true ]; then
    show_progress "Running frontend tests..."
    npm run test:frontend
    show_success "Frontend tests passed"
else
    show_progress "Skipping frontend tests (frontend not present)"
fi

# 3. Build Application
if [ "$HAS_BACKEND" = true ]; then
    show_progress "Building backend..."
    npm run build:backend
    show_success "Backend built"
else
    show_progress "Skipping backend build (backend not present)"
fi

if [ "$HAS_FRONTEND" = true ]; then
    show_progress "Building frontend..."
    npm run build:frontend
    show_success "Frontend built"
else
    show_progress "Skipping frontend build (frontend not present)"
fi

# 4. Deploy Backend
if [ "$HAS_BACKEND" = true ]; then
    show_progress "Deploying backend..."
    npm run heroku:deploy
    show_success "Backend deployed"
else
    show_progress "Skipping backend deploy (backend not present)"
fi

# 5. Deploy Frontend
if [ "$HAS_FRONTEND" = true ]; then
    show_progress "Deploying frontend..."
    npm run vercel:deploy
    show_success "Frontend deployed"
else
    show_progress "Skipping frontend deploy (frontend not present)"
fi

# 6. Deploy Docker
if [ "$HAS_DOCKER_BACKEND" = true ] || [ "$HAS_DOCKER_FRONTEND" = true ]; then
    show_progress "Deploying Docker containers..."
    npm run docker:build
    npm run docker:up
    show_success "Docker deployed"
else
    show_progress "Skipping Docker deploy (no Dockerfiles present)"
fi

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
