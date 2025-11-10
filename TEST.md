# 测试指南

## 本地测试

### 1. 测试代码语法

运行测试脚本检查所有代码的语法：

```bash
node test-api.js
```

这将检查：
- API 代码的语法
- 前端 JavaScript 代码的语法
- HTML 文件的结构
- 配置文件的格式

### 2. 测试前端页面

启动本地测试服务器：

```bash
node test-server.js
```

然后在浏览器中访问：
- http://localhost:3000 - 登录页面
- http://localhost:3000/register.html - 注册页面
- http://localhost:3000/admin.html - 管理员页面
- http://localhost:3000/student.html - 学生页面

**注意**: 本地测试服务器只用于测试前端页面显示，API 功能需要在 Vercel 上测试。

### 3. 测试 API（需要在 Vercel 上）

#### 步骤 1: 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置 `DATABASE_URL` 环境变量
4. 部署项目

#### 步骤 2: 初始化数据库

访问以下 URL 初始化数据库：

```
https://your-domain.vercel.app/api/init
```

或者使用 curl：

```bash
curl https://your-domain.vercel.app/api/init
```

预期响应：

```json
{
  "success": true,
  "message": "数据库初始化成功"
}
```

#### 步骤 3: 测试登录功能

**管理员登录测试**:

```bash
curl -X POST https://your-domain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin",
    "userType": "admin"
  }'
```

预期响应：

```json
{
  "success": true,
  "userType": "admin",
  "username": "admin",
  "id": 1
}
```

**学生注册测试**:

```bash
curl -X POST https://your-domain.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "2021001",
    "password": "123456",
    "name": "张三",
    "gender": "男",
    "age": 20,
    "className": "计算机1班",
    "major": "计算机科学"
  }'
```

预期响应：

```json
{
  "success": true,
  "message": "注册成功",
  "student": {
    "id": 1,
    "student_id": "2021001",
    "name": "张三",
    "gender": "男",
    "age": 20,
    "class_name": "计算机1班",
    "major": "计算机科学"
  }
}
```

**学生登录测试**:

```bash
curl -X POST https://your-domain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "2021001",
    "password": "123456",
    "userType": "student"
  }'
```

#### 步骤 4: 测试学生管理功能

**获取学生列表**:

```bash
curl https://your-domain.vercel.app/api/students
```

**添加学生**:

```bash
curl -X POST https://your-domain.vercel.app/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "2021002",
    "password": "123456",
    "name": "李四",
    "gender": "女",
    "age": 19,
    "className": "计算机1班",
    "major": "计算机科学"
  }'
```

**获取学生详情**:

```bash
curl https://your-domain.vercel.app/api/students/1
```

**更新学生信息**:

```bash
curl -X PUT https://your-domain.vercel.app/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "2021001",
    "name": "张三",
    "gender": "男",
    "age": 21,
    "className": "计算机2班",
    "major": "软件工程"
  }'
```

**删除学生**:

```bash
curl -X DELETE https://your-domain.vercel.app/api/students/1
```

## 功能测试清单

### 前端测试

- [x] 登录页面显示正常
- [x] 注册页面显示正常
- [x] 管理员页面显示正常
- [x] 学生页面显示正常
- [x] 响应式设计在不同屏幕尺寸下正常
- [x] 中文显示正常，无乱码
- [x] 表单验证正常工作
- [x] 用户类型选择器正常工作

### API 测试

- [ ] 数据库初始化成功
- [ ] 管理员登录成功
- [ ] 学生注册成功
- [ ] 学生登录成功
- [ ] 获取学生列表成功
- [ ] 添加学生成功
- [ ] 获取学生详情成功
- [ ] 更新学生信息成功
- [ ] 删除学生成功
- [ ] 搜索学生功能正常
- [ ] 密码加密存储正常
- [ ] 错误处理正常

### 安全性测试

- [ ] 密码正确加密存储
- [ ] 未授权访问被阻止
- [ ] SQL 注入防护正常
- [ ] XSS 防护正常

## 浏览器测试

建议在以下浏览器中测试：

- [ ] Chrome (最新版本)
- [ ] Firefox (最新版本)
- [ ] Safari (最新版本)
- [ ] Edge (最新版本)
- [ ] 移动浏览器 (iOS Safari, Chrome Mobile)

## 性能测试

- [ ] 页面加载速度正常
- [ ] API 响应时间正常
- [ ] 数据库查询性能正常

## 问题排查

如果遇到问题，请检查：

1. **数据库连接问题**
   - 检查 `DATABASE_URL` 环境变量是否正确
   - 检查 Neon 数据库是否正常运行
   - 查看 Vercel 函数日志

2. **API 请求失败**
   - 检查浏览器控制台的错误信息
   - 检查网络请求是否正常
   - 查看 Vercel 函数日志

3. **中文乱码**
   - 检查数据库编码设置
   - 检查 API 响应头中的 charset
   - 检查 HTML 文件的 charset 设置

4. **页面显示问题**
   - 检查 CSS 文件是否正常加载
   - 检查 JavaScript 文件是否正常加载
   - 检查浏览器控制台是否有错误

## 测试报告

测试完成后，请记录：

1. 测试环境（浏览器、操作系统等）
2. 测试结果（通过/失败）
3. 发现的问题
4. 问题解决方案
