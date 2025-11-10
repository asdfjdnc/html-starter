# Vercel部署指南

## 🚀 快速部署步骤

### 方法1：通过Vercel网站部署（推荐）

1. **访问Vercel官网**
   - 打开浏览器访问 https://vercel.com
   - 使用GitHub账号登录（推荐）

2. **创建新项目**
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 连接您的GitHub仓库

3. **配置项目**
   - 选择本项目文件夹
   - 框架预设选择 "Other"
   - 根目录保持默认

4. **设置环境变量**
   在Vercel控制台中添加以下环境变量：
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_a2IkZXOdenV4@ep-curly-butterfly-ahfbeuru-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成（通常1-2分钟）

### 方法2：通过Vercel CLI部署

如果命令行工具可用，可以使用以下命令：

```bash
# 登录Vercel
vercel login

# 部署项目
vercel --prod

# 设置环境变量
vercel env add DATABASE_URL
```

## 📋 部署后配置

### 1. 初始化数据库
部署完成后，首次访问以下URL初始化数据库：
```
https://your-project.vercel.app/api/init
```

### 2. 验证部署
- 访问主页： https://your-project.vercel.app
- 测试管理员登录（admin/admin）
- 测试学生注册和登录功能

## 🎯 测试清单

部署成功后，请按以下步骤测试：

### ✅ 基础功能测试
- [ ] 主页加载正常
- [ ] 管理员登录（admin/admin）
- [ ] 学生注册功能
- [ ] 学生登录功能
- [ ] 数据库初始化（/api/init）

### ✅ 管理功能测试
- [ ] 查看学生列表
- [ ] 添加新学生
- [ ] 编辑学生信息
- [ ] 删除学生
- [ ] 搜索功能

### ✅ 学生功能测试
- [ ] 查看个人信息
- [ ] 更新个人信息
- [ ] 密码修改

### ✅ 界面测试
- [ ] 响应式布局（手机/平板/桌面）
- [ ] 中文显示正常
- [ ] 表单验证功能

## 🔧 常见问题解决

### 数据库连接失败
- 检查DATABASE_URL是否正确
- 确认Neon数据库服务正常
- 检查网络连接

### API 500错误
- 检查环境变量配置
- 查看Vercel函数日志
- 确认数据库表已创建

### 中文乱码
- 确认数据库UTF-8编码
- 检查HTML meta标签
- 检查API响应头

## 📞 技术支持

如遇到问题，请检查：
1. Vercel控制台日志
2. 环境变量配置
3. 数据库连接状态
4. API端点响应

## 🎉 部署成功！

完成以上步骤后，您的学生信息管理系统就成功部署到Vercel了！
系统具备完整的学生管理功能，支持管理员和学生两种角色。