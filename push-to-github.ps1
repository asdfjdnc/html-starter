# 推送到 GitHub 的辅助脚本
# 使用方法: .\push-to-github.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "推送到 GitHub - 辅助脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否已有远程仓库
$remote = git remote -v
if ($remote) {
    Write-Host "当前远程仓库:" -ForegroundColor Yellow
    Write-Host $remote
    Write-Host ""
    $change = Read-Host "已有远程仓库，是否更改? (y/n)"
    if ($change -eq "y" -or $change -eq "Y") {
        git remote remove origin
        Write-Host "✓ 已删除旧远程仓库" -ForegroundColor Green
    } else {
        Write-Host "使用现有远程仓库" -ForegroundColor Green
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
        exit
    }
}

Write-Host ""
Write-Host "请在 GitHub 上创建新仓库（如果还没有）" -ForegroundColor Yellow
Write-Host "访问: https://github.com/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "重要提示:" -ForegroundColor Red
Write-Host "- 不要勾选 'Initialize this repository with a README'" -ForegroundColor White
Write-Host ""

$username = Read-Host "请输入你的 GitHub 用户名"
$repoName = Read-Host "请输入仓库名称"

if ([string]::IsNullOrWhiteSpace($username) -or [string]::IsNullOrWhiteSpace($repoName)) {
    Write-Host "✗ 用户名和仓库名不能为空" -ForegroundColor Red
    exit 1
}

$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "远程仓库 URL: $repoUrl" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "确认添加此远程仓库? (y/n)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "已取消" -ForegroundColor Yellow
    exit
}

# 添加远程仓库
git remote add origin $repoUrl
Write-Host "✓ 远程仓库已添加" -ForegroundColor Green

# 设置主分支
git branch -M main
Write-Host "✓ 主分支已设置为 main" -ForegroundColor Green

Write-Host ""
Write-Host "准备推送到 GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "注意: 如果提示身份验证，请使用:" -ForegroundColor Yellow
Write-Host "- 用户名: 你的 GitHub 用户名" -ForegroundColor White
Write-Host "- 密码: Personal Access Token（不是 GitHub 密码）" -ForegroundColor White
Write-Host ""
Write-Host "获取 Token: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host ""

$push = Read-Host "是否现在推送? (y/n)"
if ($push -eq "y" -or $push -eq "Y") {
    Write-Host ""
    Write-Host "正在推送到 GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "✓ 推送成功！" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "代码已推送到: $repoUrl" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "下一步:" -ForegroundColor Yellow
        Write-Host "1. 访问 Vercel: https://vercel.com" -ForegroundColor White
        Write-Host "2. 导入 GitHub 仓库" -ForegroundColor White
        Write-Host "3. 配置 DATABASE_URL 环境变量" -ForegroundColor White
        Write-Host "4. 部署项目" -ForegroundColor White
        Write-Host ""
        Write-Host "详细说明请查看 QUICK_START.md" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Red
        Write-Host "✗ 推送失败" -ForegroundColor Red
        Write-Host "========================================" -ForegroundColor Red
        Write-Host ""
        Write-Host "可能的原因:" -ForegroundColor Yellow
        Write-Host "1. 身份验证失败 - 请使用 Personal Access Token" -ForegroundColor White
        Write-Host "2. 仓库不存在 - 请先在 GitHub 上创建仓库" -ForegroundColor White
        Write-Host "3. 网络问题 - 请检查网络连接" -ForegroundColor White
        Write-Host ""
        Write-Host "获取帮助: 查看 PUSH_TO_GITHUB.md" -ForegroundColor Cyan
    }
} else {
    Write-Host ""
    Write-Host "你可以稍后手动推送:" -ForegroundColor Yellow
    Write-Host "git push -u origin main" -ForegroundColor White
}

