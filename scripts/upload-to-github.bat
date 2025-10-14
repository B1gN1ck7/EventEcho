@echo off
echo ================================================
echo           Upload to GitHub
echo ================================================
echo.

REM Add all files to staging
echo Adding all files to Git...
git add .

REM Check if there are any changes to commit
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo No changes to commit.
    echo All files are already up to date.
    pause
    exit /b 0
)

REM Commit changes
echo.
echo Please enter a commit message:
set /p commit_message="Commit message: "
if "%commit_message%"=="" (
    set commit_message=Update files
)

echo.
echo Committing changes with message: "%commit_message%"
git commit -m "%commit_message%"

REM Push to GitHub
echo.
echo Pushing to GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ================================================
    echo ✅ Successfully uploaded to GitHub!
    echo ================================================
) else (
    echo.
    echo ================================================
    echo ❌ Error occurred while pushing to GitHub
    echo ================================================
    echo.
    echo Make sure you have:
    echo 1. Created a GitHub repository
    echo 2. Set the remote origin correctly
    echo 3. Authenticated with GitHub
    echo.
    echo Run setup-github.bat first if you haven't set up the repository yet.
)

echo.
pause
