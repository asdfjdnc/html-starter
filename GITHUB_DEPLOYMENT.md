# GitHub 和 Vercel 部署指南

## 第一步：准备 GitHub 仓库

### 1.1 在 GitHub 上创建新仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `student-management-system`（或你喜欢的名称）
   - Description: `学生信息管理系统`
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"（因为我们已经有了）
4. 点击 "Create repository"

### 1.2 初始化本地 Git 仓库

在项目根目录打开终端（PowerShell 或 Command Prompt），执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 提交文件
git commit -m "Initial commit: 学生信息管理系统"

# 添加远程仓库（替换 YOUR_USERNAME 和 YOUR_REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

**注意**：将 `YOUR_USERNAME` 替换为你的 GitHub 用户名，`YOUR_REPO_NAME` 替换为你创建的仓库名称。

### 1.3 如果遇到身份验证问题

如果推送时提示需要身份验证，可以使用以下方法之一：

#### 方法一：使用 Personal Access Token（推荐）

1. 访问 GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. 点击 "Generate new token (classic)"
3. 选择权限：至少勾选 `repo`
4. 生成 token 并复制
5. 推送时使用 token 作为密码：
   ```bash
   git push -u origin main
   # 用户名：你的 GitHub 用户名
   # 密码：刚才生成的 token
   ```

#### 方法二：使用 SSH（更安全）

1. 生成 SSH 密钥：
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. 复制公钥内容：
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

3. 在 GitHub 上添加 SSH 密钥：
   - Settings > SSH and GPG keys > New SSH key
   - 粘贴公钥内容

4. 修改远程仓库地址为 SSH：
   ```bash
   git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

## 第二步：部署到 Vercel

### 2.1 通过 Vercel Dashboard 部署（推荐）

1. 访问 [Vercel](https://vercel.com) 并登录（可以使用 GitHub 账户登录）

2. 点击 "Add New..." > "Project"

3. 导入 GitHub 仓库：
   - 在 "Import Git Repository" 中找到你刚创建的仓库
   - 点击 "Import"

4. 配置项目：
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: 留空（不需要构建）
   - **Output Directory**: ./
   - **Install Command**: `npm install`

5. 配置环境变量：
   - 点击 "Environment Variables"
   - 添加变量：
     - **Name**: `DATABASE_URL`
     - **Value**: 你的 Neon 数据库连接字符串
   - 点击 "Add"

6. 点击 "Deploy"

7. 等待部署完成

### 2.2 通过 Vercel CLI 部署

1. 安装 Vercel CLI：
   ```bash
   npm install -g vercel
   ```

2. 在项目根目录登录：
   ```bash
   vercel login
   ```

3. 部署项目：
   ```bash
   vercel
   ```
   按照提示完成部署：
   - 选择项目范围
   - 链接到现有项目或创建新项目
   - 确认项目设置

4. 添加环境变量：
   ```bash
   vercel env add DATABASE_URL
   ```
   然后粘贴你的数据库连接字符串

5. 部署到生产环境：
   ```bash
   vercel --prod
   ```

## 第三步：初始化数据库

部署完成后，需要初始化数据库：

1. 获取你的 Vercel 部署 URL（格式：`https://your-project.vercel.app`）

2. 访问初始化接口：
   ```
   https://your-project.vercel.app/api/init
   ```

   或者使用 curl：
   ```bash
   curl https://your-project.vercel.app/api/init
   ```

3. 如果看到以下响应，说明初始化成功：
   ```json
   {
     "success": true,
     "message": "数据库初始化成功"
   }
   ```

## 第四步：测试系统

1. 访问你的网站：`https://your-project.vercel.app`

2. 使用默认管理员账号登录：
   - 用户名: `admin`
   - 密码: `admin`

3. 测试功能：
   - 学生注册
   - 学生登录
   - 管理员添加/编辑/删除学生
   - 搜索功能

## 后续更新

当你修改代码后，只需要：

1. 提交更改到 Git：
   ```bash
   git add .
   git commit -m "描述你的更改"
   git push
   ```

2. Vercel 会自动检测到 GitHub 的更改并重新部署

## 故障排除

### GitHub 推送失败

- 检查网络连接
- 确认 GitHub 用户名和仓库名正确
- 检查是否有文件冲突
- 确认有推送权限

### Vercel 部署失败

- 检查 `package.json` 是否正确
- 查看 Vercel 部署日志
- 确认环境变量 `DATABASE_URL` 已正确配置
- 检查代码是否有语法错误

### 数据库连接失败

- 确认 `DATABASE_URL` 环境变量正确
- 检查 Neon 数据库是否正常运行
- 查看 Vercel 函数日志

### 中文乱码

- 确认数据库使用 UTF-8 编码
- 检查 API 响应头是否包含 `charset=utf-8`
- 确认 HTML 文件的字符编码设置

## 有用的链接

- [GitHub 文档](https://docs.github.com)
- [Vercel 文档](https://vercel.com/docs)
- [Neon 文档](https://neon.tech/docs)

## 获取帮助

如果遇到问题：
1. 查看 Vercel 部署日志
2. 检查浏览器控制台错误
3. 查看 GitHub Issues
4. 检查数据库连接状态

