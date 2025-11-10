# GitHub 和 Vercel 部署脚本
# 使用方法: .\deploy.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "学生信息管理系统 - 部署脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查 Git 是否安装
try {
    $gitVersion = git --version
    Write-Host "✓ Git 已安装: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git 未安装，请先安装 Git" -ForegroundColor Red
    Write-Host "下载地址: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# 检查是否已初始化 Git 仓库
if (Test-Path .git) {
    Write-Host "✓ Git 仓库已初始化" -ForegroundColor Green
} else {
    Write-Host "正在初始化 Git 仓库..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git 仓库初始化完成" -ForegroundColor Green
}

# 检查是否有未提交的更改
$status = git status --porcelain
if ($status) {
    Write-Host ""
    Write-Host "检测到未提交的更改:" -ForegroundColor Yellow
    Write-Host $status
    Write-Host ""
    $commit = Read-Host "是否提交这些更改? (y/n)"
    if ($commit -eq "y" -or $commit -eq "Y") {
        $message = Read-Host "请输入提交信息 (默认: Update)"
        if ([string]::IsNullOrWhiteSpace($message)) {
            $message = "Update"
        }
        git add .
        git commit -m $message
        Write-Host "✓ 更改已提交" -ForegroundColor Green
    }
} else {
    Write-Host "✓ 没有未提交的更改" -ForegroundColor Green
}

# 检查远程仓库
$remote = git remote -v
if ($remote) {
    Write-Host ""
    Write-Host "当前远程仓库:" -ForegroundColor Cyan
    Write-Host $remote
    Write-Host ""
    $push = Read-Host "是否推送到 GitHub? (y/n)"
    if ($push -eq "y" -or $push -eq "Y") {
        $branch = git branch --show-current
        if ([string]::IsNullOrWhiteSpace($branch)) {
            git branch -M main
            $branch = "main"
        }
        Write-Host "正在推送到 GitHub..." -ForegroundColor Yellow
        git push -u origin $branch
        Write-Host "✓ 推送完成" -ForegroundColor Green
    }
} else {
    Write-Host ""
    Write-Host "尚未配置远程仓库" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "请按照以下步骤配置:" -ForegroundColor Cyan
    Write-Host "1. 在 GitHub 上创建新仓库" -ForegroundColor White
    Write-Host "2. 执行以下命令添加远程仓库:" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor Gray
    Write-Host "3. 执行以下命令推送代码:" -ForegroundColor White
    Write-Host "   git branch -M main" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host ""
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "下一步:" -ForegroundColor Cyan
Write-Host "1. 确保代码已推送到 GitHub" -ForegroundColor White
Write-Host "2. 在 Vercel 中导入 GitHub 仓库" -ForegroundColor White
Write-Host "3. 配置 DATABASE_URL 环境变量" -ForegroundColor White
Write-Host "4. 部署完成后访问 /api/init 初始化数据库" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "详细说明请查看 GITHUB_DEPLOYMENT.md" -ForegroundColor Yellow

