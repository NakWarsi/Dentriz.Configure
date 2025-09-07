#!/bin/bash

# CI/CD Pipeline Local Testing Script
# This script helps test the pipeline steps locally before pushing to GitHub

set -e  # Exit on any error

echo "🚀 Starting CI/CD Pipeline Local Test"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the DentrizWeb directory."
    exit 1
fi

echo "📋 Step 1: Installing dependencies..."
if npm ci; then
    print_status "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

echo "🔍 Step 2: Running linting..."
if npm run lint; then
    print_status "Linting passed"
else
    print_error "Linting failed"
    exit 1
fi

echo "🧪 Step 3: Running tests..."
if npm run test -- --watch=false --browsers=ChromeHeadless --code-coverage; then
    print_status "Tests passed"
else
    print_error "Tests failed"
    exit 1
fi

echo "🏗️  Step 4: Building application..."
if npm run build; then
    print_status "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

echo "🔒 Step 5: Running security audit..."
if npm audit --audit-level=moderate; then
    print_status "Security audit passed"
else
    print_warning "Security audit found issues (check output above)"
fi

echo "📊 Step 6: Checking build artifacts..."
if [ -d "dist" ]; then
    print_status "Build artifacts created successfully"
    echo "   - Build size: $(du -sh dist | cut -f1)"
else
    print_error "Build artifacts not found"
    exit 1
fi

echo ""
echo "🎉 All pipeline steps completed successfully!"
echo "=============================================="
echo ""
echo "Next steps:"
echo "1. Commit and push your changes"
echo "2. Check GitHub Actions for automated pipeline execution"
echo "3. Monitor deployment status"
echo ""
print_status "Local pipeline test completed successfully!"
