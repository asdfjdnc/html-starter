# Vercel 部署完整指南

## 📋 目录

1. [准备工作](#准备工作)
2. [部署步骤](#部署步骤)
3. [环境变量配置](#环境变量配置)
4. [数据库初始化](#数据库初始化)
5. [功能测试](#功能测试)
6. [问题排查](#问题排查)

## 🚀 准备工作

### 1. 准备 Neon 数据库

1. **访问 Neon 官网**
   - 打开 https://neon.tech
   - 注册账户（如果还没有）

2. **创建数据库项目**
   - 登录后点击 "Create a project"
   - 输入项目名称（例如: `student-management`）
   - 选择区域（推荐选择离你最近的区域）
   - 点击 "Create project"

3. **获取连接字符串**
   - 项目创建后，点击 "Connection Details"
   - 复制连接字符串（格式类似：`postgresql://user:password@host/database?sslmode=require`）
   - **重要**: 保存这个连接字符串，稍后需要用到

### 2. 准备 Git 仓库

1. **创建 GitHub 仓库**
   - 访问 https://github.com
   - 点击 "New repository"
   - 输入仓库名称（例如: `student-management-system`）
   - 选择 Public 或 Private
   - 点击 "Create repository"

2. **推送代码到 GitHub**
   ```bash
   # 初始化 Git 仓库（如果还没有）
   git init
   
   # 添加所有文件
   git add .
   
   # 提交更改
   git commit -m "Initial commit: 学生信息管理系统"
   
   # 添加远程仓库（替换为你的仓库地址）
   git remote add origin https://github.com/yourusername/your-repo.git
   
   # 推送到远程仓库
   git branch -M main
   git push -u origin main
   ```

## 🚀 部署步骤

### 方法一：通过 Vercel Dashboard（推荐）

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用 GitHub 账户登录（如果没有账户，先注册）

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 在 "Import Git Repository" 中选择你的 GitHub 仓库
   - 点击 "Import"

3. **配置项目**
   - **Project Name**: 输入项目名称（例如: `student-management-system`）
   - **Framework Preset**: 选择 "Other"
   - **Root Directory**: 保持默认 `./`
   - **Build Command**: 留空（不需要构建）
   - **Output Directory**: 留空
   - **Install Command**: `npm install`

4. **配置环境变量**
   - 在 "Environment Variables" 部分
   - 点击 "Add" 添加新变量
   - **Key**: `DATABASE_URL`
   - **Value**: 粘贴你的 Neon 数据库连接字符串
   - **Environment**: 选择 "Production", "Preview", "Development"（全部选择）
   - 点击 "Save"

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成（通常需要 1-2 分钟）
   - 部署完成后，Vercel 会提供一个 URL（例如: `https://your-project.vercel.app`）

### 方法二：通过 Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```
   - 按照提示在浏览器中完成登录

3. **部署项目**
   ```bash
   # 在项目根目录运行
   vercel
   ```
   - 按照提示完成配置：
     - Set up and deploy? `Y`
     - Which scope? 选择你的账户
     - Link to existing project? `N`
     - What's your project's name? 输入项目名称
     - In which directory is your code located? `./`
     - Override settings? `N`

4. **添加环境变量**
   ```bash
   # 添加生产环境变量
   vercel env add DATABASE_URL production
   # 粘贴你的数据库连接字符串
   
   # 添加预览环境变量
   vercel env add DATABASE_URL preview
   # 粘贴你的数据库连接字符串
   
   # 添加开发环境变量
   vercel env add DATABASE_URL development
   # 粘贴你的数据库连接字符串
   ```

5. **部署到生产环境**
   ```bash
   vercel --prod
   ```

## 🔧 环境变量配置

### 必需的环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `DATABASE_URL` | Neon 数据库连接字符串 | `postgresql://user:password@host/database?sslmode=require` |

### 配置步骤

1. **在 Vercel Dashboard 中配置**
   - 进入项目设置
   - 点击 "Environment Variables"
   - 添加 `DATABASE_URL` 变量
   - 选择所有环境（Production, Preview, Development）
   - 保存并重新部署

2. **验证环境变量**
   - 部署后，在 Vercel Dashboard 中查看 Functions 日志
   - 确认没有环境变量相关的错误

## 🗄️ 数据库初始化

### 步骤 1: 访问初始化 API

部署完成后，访问以下 URL 初始化数据库：

```
https://your-project.vercel.app/api/init
```

### 步骤 2: 验证初始化结果

**预期响应**:
```json
{
  "success": true,
  "message": "数据库初始化成功"
}
```

**如果出现错误**:
- 检查 `DATABASE_URL` 环境变量是否正确配置
- 检查 Neon 数据库是否正常运行
- 查看 Vercel 函数日志中的错误信息

### 步骤 3: 验证数据库表

初始化成功后，数据库会创建以下表：
- `administrators` - 管理员表
- `students` - 学生表

并且会创建默认管理员账号：
- 用户名: `admin`
- 密码: `admin`

## ✅ 功能测试

### 测试 1: 管理员登录

1. **访问登录页面**
   ```
   https://your-project.vercel.app
   ```

2. **测试登录**
   - 选择 "管理员"
   - 用户名: `admin`
   - 密码: `admin`
   - 点击 "登录"

3. **预期结果**
   - 成功跳转到管理员页面
   - 显示学生信息管理界面

### 测试 2: 学生注册

1. **访问注册页面**
   ```
   https://your-project.vercel.app/register.html
   ```

2. **填写学生信息**
   - 学号: `2021001`
   - 密码: `123456`
   - 姓名: `张三`
   - 性别: `男`
   - 年龄: `20`
   - 班级: `计算机1班`
   - 专业: `计算机科学`

3. **点击注册**
   - 应该显示注册成功消息
   - 自动跳转到登录页面

### 测试 3: 学生登录

1. **访问登录页面**
   ```
   https://your-project.vercel.app
   ```

2. **测试登录**
   - 选择 "学生"
   - 学号: `2021001`
   - 密码: `123456`
   - 点击 "登录"

3. **预期结果**
   - 成功跳转到学生信息页面
   - 显示学生的个人信息

### 测试 4: 学生信息管理

1. **以管理员身份登录**

2. **测试添加学生**
   - 点击 "添加学生" 按钮
   - 填写学生信息
   - 点击 "保存"
   - 确认学生出现在列表中

3. **测试搜索学生**
   - 在搜索框输入学号或姓名
   - 点击 "搜索"
   - 确认搜索结果正确

4. **测试编辑学生**
   - 点击学生行的 "编辑" 按钮
   - 修改学生信息
   - 点击 "保存"
   - 确认信息已更新

5. **测试删除学生**
   - 点击学生行的 "删除" 按钮
   - 确认删除
   - 确认学生已从列表中删除

### 测试 5: API 功能测试

#### 使用 curl 测试（可选）

```bash
# 测试数据库初始化
curl https://your-project.vercel.app/api/init

# 测试管理员登录
curl -X POST https://your-project.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin",
    "userType": "admin"
  }'

# 测试学生注册
curl -X POST https://your-project.vercel.app/api/auth/register \
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

# 测试获取学生列表
curl https://your-project.vercel.app/api/students
```

#### 使用测试脚本（推荐）

**Windows (PowerShell)**:
```powershell
.\test-deployment.ps1 -Url "https://your-project.vercel.app"
```

**Linux/Mac (Bash)**:
```bash
chmod +x test-deployment.sh
./test-deployment.sh https://your-project.vercel.app
```

## 🔍 问题排查

### 问题 1: 部署失败

**症状**: 部署过程中出现错误

**解决方案**:
1. 检查 `package.json` 文件是否正确
2. 检查 `vercel.json` 文件是否正确
3. 查看 Vercel 部署日志中的错误信息
4. 确认所有依赖都已正确安装

### 问题 2: 数据库连接失败

**症状**: API 返回数据库连接错误

**解决方案**:
1. 检查 `DATABASE_URL` 环境变量是否正确配置
2. 检查 Neon 数据库是否正常运行
3. 检查数据库连接字符串格式是否正确
4. 确认数据库允许外部连接

### 问题 3: 数据库初始化失败

**症状**: 访问 `/api/init` 返回错误

**解决方案**:
1. 检查数据库连接是否正常
2. 检查数据库用户是否有创建表的权限
3. 查看 Vercel 函数日志中的错误信息
4. 确认数据库连接字符串中的数据库名称正确

### 问题 4: API 请求失败

**症状**: 前端无法连接到 API

**解决方案**:
1. 检查浏览器控制台的错误信息
2. 检查 API 路由路径是否正确
3. 查看 Vercel 函数日志
4. 确认 CORS 头设置正确
5. 检查网络请求是否被阻止

### 问题 5: 中文乱码

**症状**: 页面或数据库中的中文显示为乱码

**解决方案**:
1. 检查数据库编码设置
2. 检查 API 响应头中的 charset
3. 检查 HTML 文件的 charset 设置
4. 确认数据库连接字符串中的编码设置

### 问题 6: 登录失败

**症状**: 无法登录系统

**解决方案**:
1. 确认数据库已初始化
2. 确认管理员账号已创建
3. 检查密码是否正确
4. 查看 Vercel 函数日志中的错误信息
5. 检查密码加密是否正确

## 📊 测试检查清单

使用以下清单确保所有功能正常：

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
- [ ] 中文显示正常
- [ ] 响应式设计正常
- [ ] 错误处理正常
- [ ] 密码加密存储正常

## 🎯 下一步

1. **完成所有测试**
   - 按照测试清单逐一测试所有功能
   - 记录测试结果

2. **解决发现的问题**
   - 如果发现问题，参考问题排查部分
   - 修复问题后重新测试

3. **系统正式上线**
   - 所有测试通过后，系统可以正式使用
   - 建议修改默认管理员密码

4. **定期维护**
   - 定期备份数据库
   - 监控系统运行状态
   - 及时更新依赖

## 💡 提示

- 部署后立即测试数据库初始化
- 测试所有功能，确保系统正常工作
- 记录测试过程中发现的问题
- 在生产环境中修改默认管理员密码
- 定期备份数据库
- 监控 Vercel 函数日志，及时发现问题

## 📞 获取帮助

如果遇到问题，可以：
1. 查看 Vercel 函数日志
2. 查看浏览器控制台错误信息
3. 检查数据库连接状态
4. 参考问题排查部分
5. 查看 Vercel 官方文档

---

**祝部署顺利！** 🎉

