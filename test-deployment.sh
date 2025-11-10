#!/bin/bash

# Vercel 部署后测试脚本
# 使用方法: ./test-deployment.sh https://your-project.vercel.app

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查参数
if [ -z "$1" ]; then
    echo -e "${RED}错误: 请提供部署 URL${NC}"
    echo "使用方法: ./test-deployment.sh https://your-project.vercel.app"
    exit 1
fi

BASE_URL=$1

echo "=========================================="
echo "开始测试部署: $BASE_URL"
echo "=========================================="
echo ""

# 测试计数器
PASSED=0
FAILED=0

# 测试函数
test_api() {
    local name=$1
    local method=$2
    local url=$3
    local data=$4
    local expected=$5
    
    echo -n "测试: $name ... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$url")
    elif [ "$method" = "POST" ]; then
        response=$(curl -s -w "\n%{http_code}" -X POST -H "Content-Type: application/json" -d "$data" "$url")
    elif [ "$method" = "PUT" ]; then
        response=$(curl -s -w "\n%{http_code}" -X PUT -H "Content-Type: application/json" -d "$data" "$url")
    elif [ "$method" = "DELETE" ]; then
        response=$(curl -s -w "\n%{http_code}" -X DELETE "$url")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if echo "$body" | grep -q "$expected"; then
        echo -e "${GREEN}通过${NC}"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}失败${NC}"
        echo "  HTTP 状态码: $http_code"
        echo "  响应: $body"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

# 测试 1: 数据库初始化
echo "1. 测试数据库初始化"
test_api "数据库初始化" "GET" "$BASE_URL/api/init" "" "success"
echo ""

# 测试 2: 管理员登录
echo "2. 测试管理员登录"
test_api "管理员登录" "POST" "$BASE_URL/api/auth/login" '{"username":"admin","password":"admin","userType":"admin"}' "success"
echo ""

# 测试 3: 学生注册
echo "3. 测试学生注册"
test_api "学生注册" "POST" "$BASE_URL/api/auth/register" '{"studentId":"2021001","password":"123456","name":"张三","gender":"男","age":20,"className":"计算机1班","major":"计算机科学"}' "success"
echo ""

# 测试 4: 学生登录
echo "4. 测试学生登录"
test_api "学生登录" "POST" "$BASE_URL/api/auth/login" '{"username":"2021001","password":"123456","userType":"student"}' "success"
echo ""

# 测试 5: 获取学生列表
echo "5. 测试获取学生列表"
test_api "获取学生列表" "GET" "$BASE_URL/api/students" "" "students"
echo ""

# 测试 6: 获取学生详情
echo "6. 测试获取学生详情"
test_api "获取学生详情" "GET" "$BASE_URL/api/students/1" "" "student"
echo ""

# 测试结果
echo "=========================================="
echo "测试结果"
echo "=========================================="
echo -e "${GREEN}通过: $PASSED${NC}"
echo -e "${RED}失败: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}所有测试通过！${NC}"
    exit 0
else
    echo -e "${RED}部分测试失败，请检查上述错误信息${NC}"
    exit 1
fi

