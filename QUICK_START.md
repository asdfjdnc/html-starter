# 快速部署指南

## 🚀 一键部署到 GitHub 和 Vercel

### 步骤 1: 准备 GitHub 仓库

1. **在 GitHub 上创建新仓库**
   - 访问 https://github.com/new
   - 仓库名称: `student-management-system`（或任意名称）
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"

2. **复制仓库 URL**
   - 创建后会显示仓库 URL，例如: `https://github.com/yourusername/student-management-system.git`

### 步骤 2: 初始化并推送到 GitHub

在项目根目录打开 PowerShell，执行以下命令：

```powershell
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: 学生信息管理系统"

# 添加远程仓库（替换为你的仓库 URL）
git remote add origin https://github.com/yourusername/student-management-system.git

# 设置主分支
git branch -M main

# 推送到 GitHub
git push -u origin main
```

**如果遇到身份验证问题**：
- 使用 Personal Access Token 作为密码
- 或者配置 SSH 密钥（更推荐）

### 步骤 3: 部署到 Vercel

#### 方法一：通过 Vercel Dashboard（推荐）

1. **访问 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账户登录

2. **导入项目**
   - 点击 "Add New..." > "Project"
   - 找到你的 GitHub 仓库
   - 点击 "Import"

3. **配置项目**
   - Framework Preset: **Other**
   - Root Directory: `./`（默认）
   - Build Command: **留空**
   - Output Directory: `./`（默认）
   - Install Command: `npm install`（默认）

4. **添加环境变量**
   - 点击 "Environment Variables"
   - 添加变量：
     - **Name**: `DATABASE_URL`
     - **Value**: 你的 Neon 数据库连接字符串
   - 点击 "Add"

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成（约 1-2 分钟）

#### 方法二：通过 Vercel CLI

```powershell
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 添加环境变量
vercel env add DATABASE_URL

# 部署到生产环境
vercel --prod
```

### 步骤 4: 初始化数据库

部署完成后，访问以下 URL 初始化数据库：

```
https://your-project.vercel.app/api/init
```

**或者使用 PowerShell：**

```powershell
# 替换为你的 Vercel 项目 URL
$url = "https://your-project.vercel.app/api/init"
Invoke-WebRequest -Uri $url -Method GET
```

如果看到以下响应，说明初始化成功：

```json
{
  "success": true,
  "message": "数据库初始化成功"
}
```

### 步骤 5: 测试系统

1. **访问网站**
   - 打开你的 Vercel 项目 URL
   - 例如: `https://your-project.vercel.app`

2. **管理员登录**
   - 用户名: `admin`
   - 密码: `admin`

3. **测试功能**
   - ✅ 学生注册
   - ✅ 学生登录
   - ✅ 管理员添加/编辑/删除学生
   - ✅ 搜索功能

## 📝 使用部署脚本（可选）

项目包含一个 PowerShell 部署脚本，可以自动化部分流程：

```powershell
# 运行部署脚本
.\deploy.ps1
```

脚本会自动：
- 检查 Git 是否安装
- 初始化 Git 仓库（如果未初始化）
- 检查并提交更改
- 提示推送代码

## 🔄 后续更新

当你修改代码后，只需要：

```powershell
# 提交更改
git add .
git commit -m "描述你的更改"
git push
```

Vercel 会自动检测到 GitHub 的更改并重新部署。

## ❓ 常见问题

### Q: GitHub 推送失败怎么办？

A: 检查以下几点：
- 网络连接是否正常
- GitHub 用户名和仓库名是否正确
- 是否有推送权限
- 如果使用 HTTPS，可能需要 Personal Access Token

### Q: Vercel 部署失败怎么办？

A: 检查以下几点：
- `package.json` 是否正确
- 环境变量 `DATABASE_URL` 是否已配置
- 查看 Vercel 部署日志
- 检查代码是否有语法错误

### Q: 数据库连接失败怎么办？

A: 检查以下几点：
- `DATABASE_URL` 环境变量是否正确
- Neon 数据库是否正常运行
- 查看 Vercel 函数日志

### Q: 如何查看部署日志？

A: 在 Vercel Dashboard 中：
- 进入你的项目
- 点击 "Deployments"
- 选择最新的部署
- 查看 "Function Logs"

## 📚 更多信息

- 详细部署指南: [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md)
- 项目说明: [README.md](./README.md)
- 部署说明: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🆘 获取帮助

如果遇到问题：
1. 查看 Vercel 部署日志
2. 检查浏览器控制台错误
3. 查看 GitHub Issues
4. 检查数据库连接状态

