# ============================================================================
# Daleel Al-Matajir — Local Development Startup Script
# ============================================================================
# This script sets up and runs the site locally in development mode.
# The admin dashboard (/admin) is only accessible from localhost, not production.
# ============================================================================

param(
    [switch]$SkipInstall,
    [switch]$SkipSeed,
    [switch]$Help
)

if ($Help) {
    Write-Host @"
Usage: .\run-local.ps1 [options]

Options:
  -SkipInstall    Skip npm install (use if you already installed dependencies)
  -SkipSeed       Skip seeding the database (use if already seeded)
  -Help           Show this help message

Examples:
  .\run-local.ps1                 # Full setup: install, generate, seed, run
  .\run-local.ps1 -SkipInstall    # Skip npm install, just generate & seed
  .\run-local.ps1 -SkipSeed       # Install & run, don't seed database

Notes:
  - Make sure you have Node.js 18+ installed
  - The admin dashboard at http://localhost:3000/admin is local-only
  - Your .env file will be created from .env.example if it doesn't exist
  - Edit .env with your DATABASE_URL before running this script
"@
    exit 0
}

$ErrorActionPreference = "Stop"

Write-Host "`n=== Daleel Al-Matajir — Local Setup ===" -ForegroundColor Cyan

# ============================================================================
# 1. Check for Node.js
# ============================================================================
Write-Host "`n[1/5] Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

try {
    $npmVersion = npm --version
    Write-Host "✓ npm $npmVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found" -ForegroundColor Red
    exit 1
}

# ============================================================================
# 2. Set up .env file
# ============================================================================
Write-Host "`n[2/5] Checking environment configuration..." -ForegroundColor Yellow

if (!(Test-Path .env)) {
    if (Test-Path .env.example) {
        Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
        Copy-Item .env.example .env
        Write-Host "✓ .env created" -ForegroundColor Green
        Write-Host "⚠️  IMPORTANT: Edit .env now and add your credentials:" -ForegroundColor Yellow
        Write-Host "   - DATABASE_URL (pooled connection to Neon)" -ForegroundColor Gray
        Write-Host "   - DIRECT_URL (direct connection for migrations)" -ForegroundColor Gray
        Write-Host "   - ADMIN_EMAIL (your admin email, optional)" -ForegroundColor Gray
        Write-Host "   - ADMIN_PASSWORD_HASH (bcrypt hash, optional)" -ForegroundColor Gray
        Write-Host "`nPress Enter once you've updated .env..." -ForegroundColor Yellow
        Read-Host
    } else {
        Write-Host "✗ .env.example not found" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✓ .env file exists" -ForegroundColor Green
}

# Verify DATABASE_URL is set
$envContent = Get-Content .env -Raw
if ($envContent -notmatch "DATABASE_URL\s*=\s*postgresql") {
    Write-Host "⚠️  WARNING: DATABASE_URL in .env doesn't look like a PostgreSQL connection" -ForegroundColor Yellow
    Write-Host "Continuing anyway, but the app will fail at runtime if DB is not configured" -ForegroundColor Yellow
}

# ============================================================================
# 3. Install dependencies
# ============================================================================
if ($SkipInstall) {
    Write-Host "`n[3/5] Skipping npm install (--SkipInstall)" -ForegroundColor Yellow
} else {
    Write-Host "`n[3/5] Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ npm install failed" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
}

# ============================================================================
# 4. Generate Prisma Client & optionally seed database
# ============================================================================
Write-Host "`n[4/5] Setting up database..." -ForegroundColor Yellow

Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Prisma generate failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Prisma Client generated" -ForegroundColor Green

Write-Host "Pushing schema to database..." -ForegroundColor Yellow
npx prisma db push
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Prisma db push failed" -ForegroundColor Red
    Write-Host "Make sure DATABASE_URL in .env points to a valid PostgreSQL database" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Database schema up to date" -ForegroundColor Green

if ($SkipSeed) {
    Write-Host "Skipping database seed (--SkipSeed)" -ForegroundColor Yellow
} else {
    Write-Host "Seeding database with initial data..." -ForegroundColor Yellow
    npm run db:seed
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Seed may have failed or the database already contains data" -ForegroundColor Yellow
        Write-Host "This is usually OK — continuing..." -ForegroundColor Yellow
    } else {
        Write-Host "✓ Database seeded" -ForegroundColor Green
    }
}

# ============================================================================
# 5. Start development server
# ============================================================================
Write-Host "`n[5/5] Starting development server..." -ForegroundColor Yellow
Write-Host "`n✓ All set! Your site is starting up..." -ForegroundColor Green
Write-Host "`nAccess your site at:" -ForegroundColor Cyan
Write-Host "  📱 Public:  http://localhost:3000" -ForegroundColor White
Write-Host "  🛠️  Admin:   http://localhost:3000/admin" -ForegroundColor White
Write-Host "`n⚠️  Admin is LOCAL ONLY — it won't be accessible in production." -ForegroundColor Yellow
Write-Host "To stop the server, press Ctrl+C" -ForegroundColor Gray
Write-Host ""

npm run dev
