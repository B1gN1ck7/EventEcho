@echo off
echo ================================================
echo         Setup GitHub Repository
echo ================================================
echo.

REM Check if we're in a git repository
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo Initializing Git repository...
    git init
)

echo Please enter your GitHub repository details:
echo.
set /p github_username="GitHub Username: "
set /p repo_name="Repository Name (default: EventEcho): "
if "%repo_name%"=="" set repo_name=EventEcho

echo.
echo Repository will be: https://github.com/%github_username%/%repo_name%
echo.
set /p confirm="Is this correct? (y/n): "
if /i not "%confirm%"=="y" (
    echo Setup cancelled.
    pause
    exit /b 1
)

echo.
echo Setting up remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/%github_username%/%repo_name%.git

echo.
echo Adding all files to Git...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit: EventEcho project setup"

echo.
echo Setting default branch to main...
git branch -M main

echo.
echo ================================================
echo 🚀 READY TO PUSH TO GITHUB!
echo ================================================
echo.
echo Next steps:
echo 1. Go to https://github.com/new
echo 2. Create a new repository named: %repo_name%
echo 3. Do NOT initialize with README, .gitignore, or license
echo 4. Click "Create repository"
echo 5. Come back and run upload-to-github.bat
echo.
echo Or if the repository already exists, just run:
echo   upload-to-github.bat
echo.
pause
