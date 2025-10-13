@echo off
echo ================================================
echo           Pull from GitHub
echo ================================================
echo.

REM Check if we're in a git repository
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Not in a Git repository.
    echo Please run this script from your project directory.
    pause
    exit /b 1
)

REM Fetch latest changes
echo Fetching latest changes from GitHub...
git fetch origin

REM Check if there are any local changes
git diff --quiet
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  WARNING: You have uncommitted local changes!
    echo.
    echo Current status:
    git status --short
    echo.
    set /p choice="Do you want to stash your changes and pull? (y/n): "
    if /i "%choice%"=="y" (
        echo Stashing local changes...
        git stash push -m "Auto-stash before pull on %date% %time%"
        echo.
        echo Pulling latest changes...
        git pull origin main
        echo.
        echo Applying your stashed changes back...
        git stash pop
        if %errorlevel% equ 0 (
            echo ✅ Successfully pulled and applied your changes!
        ) else (
            echo ⚠️  Pulled successfully, but there were conflicts with your stashed changes.
            echo Check the files and resolve any conflicts manually.
        )
    ) else (
        echo Pull cancelled. Please commit or stash your changes first.
        pause
        exit /b 1
    )
) else (
    echo No local changes detected.
    echo.
    echo Pulling latest changes...
    git pull origin main
)

if %errorlevel% equ 0 (
    echo.
    echo ================================================
    echo ✅ Successfully pulled from GitHub!
    echo ================================================
) else (
    echo.
    echo ================================================
    echo ❌ Error occurred while pulling from GitHub
    echo ================================================
    echo.
    echo Make sure you have:
    echo 1. Set the remote origin correctly
    echo 2. Authenticated with GitHub
    echo 3. The repository exists on GitHub
)

echo.
pause
