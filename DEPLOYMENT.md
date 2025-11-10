# 部署指南

## 快速部署步骤

### 1. 准备 Neon 数据库

1. 访问 [Neon](https://neon.tech) 并创建账户
2. 创建新的数据库项目
3. 复制数据库连接字符串（格式类似：`postgresql://user:password@host/database`）

### 2. 部署到 Vercel

#### 方法一：通过 Vercel Dashboard

1. 访问 [Vercel](https://vercel.com) 并登录
2. 点击 "New Project"
3. 导入你的 Git 仓库（GitHub、GitLab 或 Bitbucket）
4. 在项目设置中添加环境变量：
   - 名称: `DATABASE_URL`
   - 值: 你的 Neon 数据库连接字符串
5. 点击 "Deploy"

#### 方法二：通过 Vercel CLI

1. 安装 Vercel CLI：
   ```bash
   npm i -g vercel
   ```

2. 在项目根目录运行：
   ```bash
   vercel
   ```

3. 按照提示完成部署
4. 添加环境变量：
   ```bash
   vercel env add DATABASE_URL
   ```
   然后粘贴你的数据库连接字符串

5. 重新部署以应用环境变量：
   ```bash
   vercel --prod
   ```

### 3. 初始化数据库

部署完成后，访问以下 URL 初始化数据库：

```
https://your-domain.vercel.app/api/init
```

或者使用 curl：

```bash
curl https://your-domain.vercel.app/api/init
```

如果看到以下响应，说明初始化成功：

```json
{
  "success": true,
  "message": "数据库初始化成功"
}
```

### 4. 测试系统

1. 访问你的网站：`https://your-domain.vercel.app`
2. 使用默认管理员账号登录：
   - 用户名: `admin`
   - 密码: `admin`
3. 测试学生注册功能
4. 测试学生信息管理功能

## 故障排除

### 数据库连接失败

1. 检查 `DATABASE_URL` 环境变量是否正确配置
2. 确认 Neon 数据库是否正常运行
3. 检查数据库连接字符串格式是否正确

### 中文乱码

1. 确认数据库使用 UTF-8 编码
2. 检查 API 响应头是否包含 `charset=utf-8`
3. 确认 HTML 文件的 `<meta charset="UTF-8">` 设置正确

### API 请求失败

1. 检查浏览器控制台的错误信息
2. 查看 Vercel 函数日志
3. 确认 API 路由路径正确

### 数据库初始化失败

1. 检查数据库连接是否正常
2. 查看 Vercel 函数日志中的错误信息
3. 确认数据库用户有创建表的权限

## 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `DATABASE_URL` | Neon 数据库连接字符串 | 是 |

## 支持

如果遇到问题，请检查：
1. Vercel 函数日志
2. 浏览器控制台
3. 数据库连接状态

