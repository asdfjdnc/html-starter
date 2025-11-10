@echo off
chcp 65001 >nul
echo ========================================
echo Testing Push Script (Dry Run)
echo ========================================
echo.

echo This is a dry run test. No actual changes will be made.
echo.

REM Check if remote exists
git remote -v >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Remote repository is already configured:
    git remote -v
    echo.
    echo To test adding a new remote, first remove it:
    echo   git remote remove origin
    echo.
) else (
    echo [INFO] No remote repository configured
    echo.
    echo To add a remote repository, you would run:
    echo   git remote add origin https://github.com/USERNAME/REPO.git
    echo.
)

REM Check current branch
echo [INFO] Current branch:
git branch --show-current
echo.

REM Check if branch is main
git branch --show-current | findstr /C:"main" >nul
if %errorlevel% equ 0 (
    echo [OK] Branch is already 'main'
) else (
    echo [INFO] Branch would be renamed to 'main' with: git branch -M main
)
echo.

REM Check if there are commits to push
echo [INFO] Recent commits that would be pushed:
git log --oneline -5
echo.

echo ========================================
echo Dry Run Test Complete
echo ========================================
echo.
echo To actually push to GitHub:
echo   1. Create a repository on GitHub
echo   2. Run: push-to-github.bat
echo   3. Or manually: git remote add origin https://github.com/USERNAME/REPO.git
echo   4. Then: git push -u origin main
echo.
pause

