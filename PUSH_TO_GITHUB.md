# 推送到 GitHub - 快速指南

## ✅ 已完成
- ✓ Git 仓库已初始化
- ✓ 所有文件已提交（28个文件，3017行代码）

## 🚀 下一步：推送到 GitHub

### 步骤 1: 在 GitHub 上创建仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `student-management-system`（或你喜欢的名称）
   - **Description**: `学生信息管理系统`
   - 选择 **Public** 或 **Private**
   - **⚠️ 重要**: **不要**勾选 "Initialize this repository with a README"
3. 点击 **"Create repository"**

### 步骤 2: 添加远程仓库并推送

在项目目录打开 PowerShell，执行以下命令（**替换 YOUR_USERNAME 和 YOUR_REPO_NAME**）：

```powershell
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 设置主分支为 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```

**示例**（如果你的用户名是 `john`，仓库名是 `student-management-system`）：
```powershell
git remote add origin https://github.com/john/student-management-system.git
git branch -M main
git push -u origin main
```

### 步骤 3: 身份验证

如果推送时提示需要身份验证：

#### 方法一：使用 Personal Access Token（推荐）

1. 访问 https://github.com/settings/tokens
2. 点击 **"Generate new token (classic)"**
3. 填写信息：
   - **Note**: `Vercel Deployment`
   - **Expiration**: 选择过期时间（建议 90 days 或 No expiration）
   - **Select scopes**: 勾选 `repo`（完整仓库访问权限）
4. 点击 **"Generate token"**
5. **复制生成的 token**（只显示一次！）
6. 推送时：
   - **用户名**: 你的 GitHub 用户名
   - **密码**: 粘贴刚才复制的 token

#### 方法二：使用 SSH（更安全，推荐长期使用）

1. 生成 SSH 密钥：
```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```
   - 按回车使用默认路径
   - 设置密码（可选）

2. 复制公钥内容：
```powershell
cat ~/.ssh/id_ed25519.pub
```

3. 在 GitHub 上添加 SSH 密钥：
   - 访问 https://github.com/settings/keys
   - 点击 **"New SSH key"**
   - **Title**: `My Computer`
   - **Key**: 粘贴刚才复制的公钥内容
   - 点击 **"Add SSH key"**

4. 修改远程仓库地址为 SSH：
```powershell
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

5. 测试连接：
```powershell
ssh -T git@github.com
```

6. 推送代码：
```powershell
git push -u origin main
```

## 🎉 完成后

推送成功后，你应该能在 GitHub 上看到你的代码了！

## 📝 下一步：部署到 Vercel

推送完成后，按照以下步骤部署到 Vercel：

1. 访问 https://vercel.com 并登录
2. 点击 **"Add New..."** > **"Project"**
3. 导入你的 GitHub 仓库
4. 配置环境变量 `DATABASE_URL`
5. 点击 **"Deploy"**

详细说明请查看 [QUICK_START.md](./QUICK_START.md) 或 [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md)

## ❓ 遇到问题？

### 问题 1: 远程仓库已存在
如果提示远程仓库已存在，先删除再添加：
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 问题 2: 推送被拒绝
如果提示推送被拒绝，可能是因为远程仓库有内容。使用强制推送（谨慎使用）：
```powershell
git push -u origin main --force
```

### 问题 3: 身份验证失败
- 检查用户名和 token 是否正确
- 确认 token 有 `repo` 权限
- 尝试使用 SSH 方式

## 📚 相关文档

- [快速开始指南](./QUICK_START.md)
- [详细部署指南](./GITHUB_DEPLOYMENT.md)
- [部署检查清单](./DEPLOY_CHECKLIST.md)

