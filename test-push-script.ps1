# 测试推送脚本
# 这个脚本会检查环境，但不实际执行推送

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "测试推送脚本环境" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查 Git 是否安装
try {
    $gitVersion = git --version
    Write-Host "[OK] Git 已安装: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[错误] Git 未安装" -ForegroundColor Red
    exit 1
}

# 检查是否在 Git 仓库中
if (Test-Path .git) {
    Write-Host "[OK] 当前目录是 Git 仓库" -ForegroundColor Green
} else {
    Write-Host "[错误] 当前目录不是 Git 仓库" -ForegroundColor Red
    exit 1
}

# 检查当前分支
try {
    $branch = git branch --show-current
    Write-Host "[OK] 当前分支: $branch" -ForegroundColor Green
} catch {
    Write-Host "[警告] 无法获取当前分支" -ForegroundColor Yellow
}

# 检查是否有未提交的更改
$status = git status --porcelain
if ($status) {
    Write-Host "[警告] 有未提交的更改:" -ForegroundColor Yellow
    Write-Host $status
} else {
    Write-Host "[OK] 工作区干净，没有未提交的更改" -ForegroundColor Green
}

# 检查远程仓库
$remote = git remote -v
if ($remote) {
    Write-Host "[信息] 当前远程仓库:" -ForegroundColor Cyan
    Write-Host $remote
} else {
    Write-Host "[信息] 尚未配置远程仓库" -ForegroundColor Cyan
    Write-Host "  运行 push-to-github.ps1 或 push-to-github.bat 来添加远程仓库" -ForegroundColor Yellow
}

# 检查提交历史
try {
    $commits = git log --oneline -5
    Write-Host ""
    Write-Host "[OK] 最近的提交:" -ForegroundColor Green
    Write-Host $commits
} catch {
    Write-Host "[警告] 无法获取提交历史" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "测试完成" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "如果所有检查都通过，你可以运行:" -ForegroundColor Yellow
Write-Host "  .\push-to-github.bat" -ForegroundColor Cyan
Write-Host "或" -ForegroundColor Yellow
Write-Host "  .\push-to-github.ps1" -ForegroundColor Cyan
Write-Host ""

