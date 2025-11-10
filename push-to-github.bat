@echo off
chcp 65001 >nul
echo ========================================
echo 推送到 GitHub - 辅助脚本
echo ========================================
echo.

REM 检查是否已有远程仓库
git remote -v >nul 2>&1
if %errorlevel% equ 0 (
    echo 当前远程仓库:
    git remote -v
    echo.
    set /p change="已有远程仓库，是否更改? (y/n): "
    if /i "%change%"=="y" (
        git remote remove origin
        echo [OK] 已删除旧远程仓库
    ) else (
        set /p push="是否推送到 GitHub? (y/n): "
        if /i "%push%"=="y" (
            git push -u origin main
        )
        goto :end
    )
)

echo.
echo 请在 GitHub 上创建新仓库（如果还没有）
echo 访问: https://github.com/new
echo.
echo 重要提示:
echo - 不要勾选 'Initialize this repository with a README'
echo.

set /p username="请输入你的 GitHub 用户名: "
set /p repoName="请输入仓库名称: "

if "%username%"=="" (
    echo [错误] 用户名不能为空
    exit /b 1
)

if "%repoName%"=="" (
    echo [错误] 仓库名不能为空
    exit /b 1
)

set repoUrl=https://github.com/%username%/%repoName%.git

echo.
echo 远程仓库 URL: %repoUrl%
echo.

set /p confirm="确认添加此远程仓库? (y/n): "
if /i not "%confirm%"=="y" (
    echo 已取消
    exit /b
)

REM 添加远程仓库
git remote add origin %repoUrl%
echo [OK] 远程仓库已添加

REM 设置主分支
git branch -M main
echo [OK] 主分支已设置为 main

echo.
echo 准备推送到 GitHub...
echo.
echo 注意: 如果提示身份验证，请使用:
echo - 用户名: 你的 GitHub 用户名
echo - 密码: Personal Access Token（不是 GitHub 密码）
echo.
echo 获取 Token: https://github.com/settings/tokens
echo.

set /p push="是否现在推送? (y/n): "
if /i "%push%"=="y" (
    echo.
    echo 正在推送到 GitHub...
    git push -u origin main
    
    if %errorlevel% equ 0 (
        echo.
        echo ========================================
        echo [成功] 推送成功！
        echo ========================================
        echo.
        echo 代码已推送到: %repoUrl%
        echo.
        echo 下一步:
        echo 1. 访问 Vercel: https://vercel.com
        echo 2. 导入 GitHub 仓库
        echo 3. 配置 DATABASE_URL 环境变量
        echo 4. 部署项目
        echo.
        echo 详细说明请查看 QUICK_START.md
    ) else (
        echo.
        echo ========================================
        echo [错误] 推送失败
        echo ========================================
        echo.
        echo 可能的原因:
        echo 1. 身份验证失败 - 请使用 Personal Access Token
        echo 2. 仓库不存在 - 请先在 GitHub 上创建仓库
        echo 3. 网络问题 - 请检查网络连接
        echo.
        echo 获取帮助: 查看 PUSH_TO_GITHUB.md
    )
) else (
    echo.
    echo 你可以稍后手动推送:
    echo git push -u origin main
)

:end
pause

