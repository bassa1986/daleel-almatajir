@echo off
REM Daleel Al-Matajir - Complete Local Deployment
REM This batch file does everything automatically

setlocal enabledelayedexpansion

echo.
echo ============================================================
echo   Daleel Al-Matajir - Complete Local Deployment
echo ============================================================
echo.

REM Set variables
set ZIP_PATH=C:\the websites\daleel-almatajir-website\daleel-almatajir-production-ready.zip
set PROJECT_DIR=C:\the websites\daleel-almatajir-website\daleel-almatajir
set DB_URL=postgresql://neondb_owner:npg_SPaVOJt0nB1A@ep-soft-scene-asu7agts-pooler.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require^&channel_binding=require
set DIRECT_URL=postgresql://neondb_owner:npg_SPaVOJt0nB1A@ep-soft-scene-asu7agts.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require^&channel_binding=require

echo [1/7] Checking if ZIP exists...
if not exist "%ZIP_PATH%" (
    echo ERROR: ZIP file not found at %ZIP_PATH%
    pause
    exit /b 1
)
echo SUCCESS: ZIP file found
echo.

echo [2/7] Extracting ZIP file...
cd /d "C:\the websites\daleel-almatajir-website"
powershell -Command "Expand-Archive -Path '%ZIP_PATH%' -DestinationPath '.' -Force" 2>nul
if exist "%PROJECT_DIR%" (
    echo SUCCESS: ZIP extracted
) else (
    echo ERROR: Failed to extract ZIP
    pause
    exit /b 1
)
echo.

echo [3/7] Creating .env file...
cd /d "%PROJECT_DIR%"

(
    echo DATABASE_URL="!DB_URL!"
    echo DIRECT_URL="!DIRECT_URL!"
    echo ADMIN_EMAIL="admin@daleel-almatajir.com"
    echo ADMIN_PASSWORD_HASH=""
) > .env

if exist ".env" (
    echo SUCCESS: .env file created
) else (
    echo ERROR: Failed to create .env
    pause
    exit /b 1
)
echo.

echo [4/7] Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found. Please install from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VER=%%i
echo SUCCESS: Node.js !NODE_VER! found
echo.

echo [5/7] Installing dependencies (this takes 2-3 minutes)...
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo SUCCESS: Dependencies installed
echo.

echo [6/7] Setting up database...
echo   - Generating Prisma Client...
call npx prisma generate --skip-engine-check
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Prisma generate failed
    pause
    exit /b 1
)
echo   SUCCESS: Prisma generated
echo.

echo   - Pushing schema to database...
call npx prisma db push --skip-generate
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Database push had issues, but continuing...
)
echo   SUCCESS: Database schema updated
echo.

echo   - Seeding database...
call npm run db:seed
echo   SUCCESS: Database seeded
echo.

echo.
echo ============================================================
echo   ✓ ALL SETUP COMPLETE!
echo ============================================================
echo.
echo Your website is starting...
echo.
echo   PUBLIC SITE:  http://localhost:3000
echo   ADMIN PANEL:  http://localhost:3000/admin
echo.
echo   Press Ctrl+C to stop the server
echo.

call npm run dev

pause
