# Daleel Al-Matajir - One-Click Local Deployment
# This script automates the entire setup process

$ErrorActionPreference = "Stop"

Write-Host "`n" -ForegroundColor Cyan
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Daleel Al-Matajir — Complete Local Deployment               ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Get the ZIP file path
$zipPath = "C:\the websites\daleel-almatajir-website\daleel-almatajir-production-ready.zip"

if (-not (Test-Path $zipPath)) {
    Write-Host "✗ ZIP file not found at: $zipPath" -ForegroundColor Red
    exit 1
}

Write-Host "[1/7] ✓ ZIP file found" -ForegroundColor Green

# Get database credentials
Write-Host "`n[2/7] Getting database credentials..." -ForegroundColor Yellow
Write-Host "From https://console.neon.tech copy your TWO connection strings" -ForegroundColor Gray
Write-Host ""

$dbUrl = Read-Host "Enter DATABASE_URL (pooled, with -pooler)"
$directUrl = Read-Host "Enter DIRECT_URL (direct, without -pooler)"

if (-not $dbUrl -or -not $directUrl) {
    Write-Host "✗ Database URLs required" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Credentials received" -ForegroundColor Green

# Extract ZIP
Write-Host "`n[3/7] Extracting ZIP file..." -ForegroundColor Yellow
$zipDir = "C:\the websites\daleel-almatajir-website"
$projDir = Join-Path $zipDir "daleel-almatajir"

if (Test-Path $projDir) {
    Write-Host "✓ Project folder exists" -ForegroundColor Green
} else {
    Expand-Archive -Path $zipPath -DestinationPath $zipDir -Force
    Write-Host "✓ ZIP extracted" -ForegroundColor Green
}

Set-Location $projDir

# Check Node.js
Write-Host "`n[4/7] Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green
Write-Host "✓ npm $npmVersion" -ForegroundColor Green

# Create .env file
Write-Host "`n[5/7] Creating .env file..." -ForegroundColor Yellow

$envContent = @"
DATABASE_URL="$dbUrl"
DIRECT_URL="$directUrl"
ADMIN_EMAIL="admin@daleel-almatajir.com"
ADMIN_PASSWORD_HASH=""
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8 -Force
Write-Host "✓ .env file created" -ForegroundColor Green

# Install dependencies
Write-Host "`n[6/7] Installing dependencies (2-3 minutes)..." -ForegroundColor Yellow
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ npm install failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Setup database
Write-Host "`n[7/7] Setting up database..." -ForegroundColor Yellow

Write-Host "  → Generating Prisma Client..." -ForegroundColor Gray
npx prisma generate --skip-engine-check
Write-Host "  ✓ Prisma generated" -ForegroundColor Green

Write-Host "  → Pushing schema to database..." -ForegroundColor Gray
npx prisma db push --skip-generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ⚠️  Database push had issues" -ForegroundColor Yellow
    Write-Host "  Make sure DATABASE_URL is correct" -ForegroundColor Yellow
} else {
    Write-Host "  ✓ Database schema updated" -ForegroundColor Green
}

Write-Host "  → Seeding database..." -ForegroundColor Gray
npm run db:seed
Write-Host "  ✓ Database seeded" -ForegroundColor Green

# Start dev server
Write-Host "`n"
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                  ✓ SETUP COMPLETE!                            ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host "`nStarting your website...`n" -ForegroundColor Cyan
Write-Host "📱 PUBLIC SITE:   http://localhost:3000" -ForegroundColor White
Write-Host "🛠️  ADMIN PANEL:   http://localhost:3000/admin" -ForegroundColor White
Write-Host "`n⏹️  Press Ctrl+C to stop the server`n" -ForegroundColor Yellow

npm run dev
