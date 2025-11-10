# Vercel 部署后测试脚本 (PowerShell)
# 使用方法: .\test-deployment.ps1 -Url "https://your-project.vercel.app"

param(
    [Parameter(Mandatory=$true)]
    [string]$Url
)

# 测试计数器
$script:Passed = 0
$script:Failed = 0

# 测试函数
function Test-Api {
    param(
        [string]$Name,
        [string]$Method,
        [string]$Endpoint,
        [string]$Body = $null,
        [string]$Expected
    )
    
    Write-Host "测试: $Name ... " -NoNewline
    
    try {
        $headers = @{
            "Content-Type" = "application/json"
        }
        
        if ($Method -eq "GET") {
            $response = Invoke-RestMethod -Uri "$Url$Endpoint" -Method Get -Headers $headers -ErrorAction Stop
        } elseif ($Method -eq "POST") {
            $response = Invoke-RestMethod -Uri "$Url$Endpoint" -Method Post -Headers $headers -Body $Body -ErrorAction Stop
        } elseif ($Method -eq "PUT") {
            $response = Invoke-RestMethod -Uri "$Url$Endpoint" -Method Put -Headers $headers -Body $Body -ErrorAction Stop
        } elseif ($Method -eq "DELETE") {
            $response = Invoke-RestMethod -Uri "$Url$Endpoint" -Method Delete -Headers $headers -ErrorAction Stop
        }
        
        $responseJson = $response | ConvertTo-Json -Depth 10
        
        if ($responseJson -match $Expected) {
            Write-Host "通过" -ForegroundColor Green
            $script:Passed++
            return $true
        } else {
            Write-Host "失败" -ForegroundColor Red
            Write-Host "  响应: $responseJson" -ForegroundColor Yellow
            $script:Failed++
            return $false
        }
    } catch {
        Write-Host "失败" -ForegroundColor Red
        Write-Host "  错误: $($_.Exception.Message)" -ForegroundColor Yellow
        $script:Failed++
        return $false
    }
}

Write-Host "=========================================="
Write-Host "开始测试部署: $Url"
Write-Host "=========================================="
Write-Host ""

# 测试 1: 数据库初始化
Write-Host "1. 测试数据库初始化"
Test-Api -Name "数据库初始化" -Method "GET" -Endpoint "/api/init" -Expected "success"
Write-Host ""

# 测试 2: 管理员登录
Write-Host "2. 测试管理员登录"
$loginBody = @{
    username = "admin"
    password = "admin"
    userType = "admin"
} | ConvertTo-Json
Test-Api -Name "管理员登录" -Method "POST" -Endpoint "/api/auth/login" -Body $loginBody -Expected "success"
Write-Host ""

# 测试 3: 学生注册
Write-Host "3. 测试学生注册"
$registerBody = @{
    studentId = "2021001"
    password = "123456"
    name = "张三"
    gender = "男"
    age = 20
    className = "计算机1班"
    major = "计算机科学"
} | ConvertTo-Json
Test-Api -Name "学生注册" -Method "POST" -Endpoint "/api/auth/register" -Body $registerBody -Expected "success"
Write-Host ""

# 测试 4: 学生登录
Write-Host "4. 测试学生登录"
$studentLoginBody = @{
    username = "2021001"
    password = "123456"
    userType = "student"
} | ConvertTo-Json
Test-Api -Name "学生登录" -Method "POST" -Endpoint "/api/auth/login" -Body $studentLoginBody -Expected "success"
Write-Host ""

# 测试 5: 获取学生列表
Write-Host "5. 测试获取学生列表"
Test-Api -Name "获取学生列表" -Method "GET" -Endpoint "/api/students" -Expected "students"
Write-Host ""

# 测试 6: 获取学生详情
Write-Host "6. 测试获取学生详情"
Test-Api -Name "获取学生详情" -Method "GET" -Endpoint "/api/students/1" -Expected "student"
Write-Host ""

# 测试结果
Write-Host "=========================================="
Write-Host "测试结果"
Write-Host "=========================================="
Write-Host "通过: $script:Passed" -ForegroundColor Green
Write-Host "失败: $script:Failed" -ForegroundColor Red
Write-Host ""

if ($script:Failed -eq 0) {
    Write-Host "所有测试通过！" -ForegroundColor Green
    exit 0
} else {
    Write-Host "部分测试失败，请检查上述错误信息" -ForegroundColor Red
    exit 1
}

