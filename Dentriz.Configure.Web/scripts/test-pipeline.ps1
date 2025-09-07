# CI/CD Pipeline Local Testing Script (PowerShell)
# This script helps test the pipeline steps locally before pushing to GitHub

param(
    [switch]$SkipTests,
    [switch]$SkipSecurity
)

# Stop on any error
$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting CI/CD Pipeline Local Test" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Error "package.json not found. Please run this script from the DentrizWeb directory."
    exit 1
}

try {
    Write-Host "📋 Step 1: Installing dependencies..." -ForegroundColor White
    npm ci
    Write-Status "Dependencies installed successfully"
}
catch {
    Write-Error "Failed to install dependencies"
    exit 1
}

try {
    Write-Host "🔍 Step 2: Running linting..." -ForegroundColor White
    npm run lint
    Write-Status "Linting passed"
}
catch {
    Write-Error "Linting failed"
    exit 1
}

if (-not $SkipTests) {
    try {
        Write-Host "🧪 Step 3: Running tests..." -ForegroundColor White
        npm run test -- --watch=false --browsers=ChromeHeadless --code-coverage
        Write-Status "Tests passed"
    }
    catch {
        Write-Error "Tests failed"
        exit 1
    }
}
else {
    Write-Warning "Skipping tests (--SkipTests flag used)"
}

try {
    Write-Host "🏗️  Step 4: Building application..." -ForegroundColor White
    npm run build
    Write-Status "Build completed successfully"
}
catch {
    Write-Error "Build failed"
    exit 1
}

if (-not $SkipSecurity) {
    try {
        Write-Host "🔒 Step 5: Running security audit..." -ForegroundColor White
        npm audit --audit-level=moderate
        Write-Status "Security audit passed"
    }
    catch {
        Write-Warning "Security audit found issues (check output above)"
    }
}
else {
    Write-Warning "Skipping security audit (--SkipSecurity flag used)"
}

try {
    Write-Host "📊 Step 6: Checking build artifacts..." -ForegroundColor White
    if (Test-Path "dist") {
        $buildSize = (Get-ChildItem "dist" -Recurse | Measure-Object -Property Length -Sum).Sum
        $buildSizeMB = [math]::Round($buildSize / 1MB, 2)
        Write-Status "Build artifacts created successfully"
        Write-Host "   - Build size: $buildSizeMB MB" -ForegroundColor Gray
    }
    else {
        Write-Error "Build artifacts not found"
        exit 1
    }
}
catch {
    Write-Error "Failed to check build artifacts"
    exit 1
}

Write-Host ""
Write-Host "🎉 All pipeline steps completed successfully!" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Commit and push your changes" -ForegroundColor Gray
Write-Host "2. Check GitHub Actions for automated pipeline execution" -ForegroundColor Gray
Write-Host "3. Monitor Azure App Service deployment status" -ForegroundColor Gray
Write-Host "4. Check your Azure App Service URL" -ForegroundColor Gray
Write-Host ""
Write-Status "Local pipeline test completed successfully!"
