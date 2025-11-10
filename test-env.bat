@echo off
chcp 65001 >nul
echo ========================================
echo Testing Git Environment
echo ========================================
echo.

echo [1] Checking Git installation...
git --version
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed
    exit /b 1
)
echo [OK] Git is installed
echo.

echo [2] Checking if current directory is a Git repository...
if not exist .git (
    echo [ERROR] Current directory is not a Git repository
    exit /b 1
)
echo [OK] Current directory is a Git repository
echo.

echo [3] Checking current branch...
git branch --show-current
echo.

echo [4] Checking for uncommitted changes...
git status --porcelain
if %errorlevel% equ 0 (
    echo [OK] Working directory is clean
) else (
    echo [WARNING] There are uncommitted changes
)
echo.

echo [5] Checking remote repositories...
git remote -v
if %errorlevel% neq 0 (
    echo [INFO] No remote repository configured
    echo        Run push-to-github.bat to add a remote repository
)
echo.

echo [6] Recent commits:
git log --oneline -5
echo.

echo ========================================
echo Test Complete
echo ========================================
echo.
echo If all checks passed, you can run:
echo   push-to-github.bat
echo.
pause

