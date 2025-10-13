@echo off
echo ================================================
echo      Connect to Existing GitHub Repository
echo ================================================
echo.

echo This script will help you connect your local files to an existing GitHub repository.
echo.

set /p github_url="Enter your GitHub repository URL (e.g., https://github.com/username/repository.git): "

if "%github_url%"=="" (
    echo Error: Please provide a GitHub repository URL.
    pause
    exit /b 1
)

echo.
echo Adding GitHub repository as remote origin...
git remote add origin %github_url%

echo.
echo Fetching existing files from GitHub...
git fetch origin

echo.
echo Checking what branch exists on GitHub...
git branch -r

echo.
echo You now have a few options:
echo.
echo 1. If your GitHub repo is empty or you want to overwrite it:
echo    - Run: git push -u origin master
echo.
echo 2. If your GitHub repo has files you want to keep:
echo    - Run: git pull origin master --allow-unrelated-histories
echo    - Then run: git push -u origin master
echo.
echo 3. If your GitHub repo uses 'main' branch instead of 'master':
echo    - Run: git pull origin main --allow-unrelated-histories
echo    - Then run: git push -u origin main
echo.

set /p choice="Choose option (1, 2, or 3): "

if "%choice%"=="1" (
    echo.
    echo Adding all files and pushing to GitHub...
    git add .
    git commit -m "Initial commit with all project files"
    git push -u origin master
) else if "%choice%"=="2" (
    echo.
    echo Pulling existing files from GitHub...
    git pull origin master --allow-unrelated-histories
    echo.
    echo Adding all files and pushing to GitHub...
    git add .
    git commit -m "Merge local files with existing repository"
    git push -u origin master
) else if "%choice%"=="3" (
    echo.
    echo Pulling existing files from GitHub...
    git pull origin main --allow-unrelated-histories
    echo.
    echo Adding all files and pushing to GitHub...
    git add .
    git commit -m "Merge local files with existing repository"
    git push -u origin main
) else (
    echo Invalid choice. Please run the script again.
    pause
    exit /b 1
)

if %errorlevel% equ 0 (
    echo.
    echo ================================================
    echo ✅ Successfully connected to GitHub!
    echo ================================================
    echo.
    echo You can now use:
    echo - upload-to-github.bat to upload changes
    echo - pull-from-github.bat to pull updates
) else (
    echo.
    echo ================================================
    echo ❌ Error occurred. Please check the repository URL and try again.
    echo ================================================
)

echo.
pause
