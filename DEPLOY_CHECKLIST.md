# 部署检查清单

## ✅ 部署前检查

### 1. 代码准备
- [ ] 所有文件已保存
- [ ] 代码无语法错误
- [ ] `.gitignore` 文件已配置
- [ ] `package.json` 依赖正确
- [ ] `vercel.json` 配置正确

### 2. GitHub 准备
- [ ] GitHub 账户已创建
- [ ] 新仓库已创建（或已有仓库）
- [ ] Git 已安装并配置
- [ ] 已准备好 Personal Access Token（如果需要）

### 3. Vercel 准备
- [ ] Vercel 账户已创建
- [ ] 已准备好 Neon 数据库连接字符串
- [ ] 环境变量 `DATABASE_URL` 已准备好

## 🚀 部署步骤

### 步骤 1: 推送到 GitHub

1. [ ] 初始化 Git 仓库
   ```bash
   git init
   ```

2. [ ] 添加所有文件
   ```bash
   git add .
   ```

3. [ ] 提交更改
   ```bash
   git commit -m "Initial commit: 学生信息管理系统"
   ```

4. [ ] 添加远程仓库
   ```bash
   git remote add origin https://github.com/yourusername/your-repo.git
   ```

5. [ ] 设置主分支
   ```bash
   git branch -M main
   ```

6. [ ] 推送到 GitHub
   ```bash
   git push -u origin main
   ```

### 步骤 2: 部署到 Vercel

1. [ ] 访问 Vercel Dashboard
2. [ ] 导入 GitHub 仓库
3. [ ] 配置项目设置：
   - [ ] Framework Preset: Other
   - [ ] Root Directory: ./
   - [ ] Build Command: 留空
   - [ ] Output Directory: ./
   - [ ] Install Command: npm install
4. [ ] 添加环境变量：
   - [ ] Name: DATABASE_URL
   - [ ] Value: 你的 Neon 数据库连接字符串
5. [ ] 点击 "Deploy"
6. [ ] 等待部署完成

### 步骤 3: 初始化数据库

1. [ ] 获取 Vercel 部署 URL
2. [ ] 访问 `https://your-project.vercel.app/api/init`
3. [ ] 确认看到成功响应：
   ```json
   {
     "success": true,
     "message": "数据库初始化成功"
   }
   ```

### 步骤 4: 测试系统

1. [ ] 访问网站首页
2. [ ] 测试管理员登录（admin/admin）
3. [ ] 测试学生注册
4. [ ] 测试学生登录
5. [ ] 测试管理员功能：
   - [ ] 添加学生
   - [ ] 编辑学生
   - [ ] 删除学生
   - [ ] 搜索学生

## 🔍 部署后检查

### 功能检查
- [ ] 登录功能正常
- [ ] 注册功能正常
- [ ] 学生信息管理功能正常
- [ ] 搜索功能正常
- [ ] 中文显示正常
- [ ] 响应式设计正常

### 技术检查
- [ ] 数据库连接正常
- [ ] API 接口响应正常
- [ ] 错误处理正常
- [ ] 控制台无错误
- [ ] Vercel 函数日志正常

## 📝 后续维护

### 代码更新流程
1. [ ] 修改代码
2. [ ] 测试本地功能
3. [ ] 提交更改
   ```bash
   git add .
   git commit -m "描述更改"
   git push
   ```
4. [ ] Vercel 自动部署
5. [ ] 检查部署日志
6. [ ] 测试生产环境

### 环境变量更新
1. [ ] 在 Vercel Dashboard 中更新环境变量
2. [ ] 重新部署项目
3. [ ] 测试功能

## 🆘 问题排查

### 常见问题
- [ ] GitHub 推送失败 → 检查网络和权限
- [ ] Vercel 部署失败 → 检查日志和配置
- [ ] 数据库连接失败 → 检查环境变量
- [ ] 中文乱码 → 检查编码设置
- [ ] API 请求失败 → 检查函数日志

### 日志查看
- [ ] Vercel 函数日志
- [ ] 浏览器控制台
- [ ] GitHub Actions（如果有）
- [ ] 数据库日志

## 📚 相关文档

- [快速开始指南](./QUICK_START.md)
- [详细部署指南](./GITHUB_DEPLOYMENT.md)
- [项目说明](./README.md)
- [部署说明](./DEPLOYMENT.md)

