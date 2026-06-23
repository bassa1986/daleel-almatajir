@echo off
REM Daleel Al-Matajir — Local Development Launcher
REM This batch file runs the PowerShell setup script. It should be double-clicked
REM from Windows Explorer or run from Command Prompt/PowerShell.

setlocal enabledelayedexpansion

REM Check if PowerShell is available
where powershell >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: PowerShell not found. Please update Windows or install PowerShell.
    pause
    exit /b 1
)

REM Run the PowerShell script
echo Starting Daleel Al-Matajir local development...
echo.

REM Allow script execution for this one invocation
powershell -NoProfile -ExecutionPolicy Bypass -File "run-local.ps1" %*

REM If the dev server exited, let the user read the output before closing
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Press any key to close this window...
    pause >nul
)
