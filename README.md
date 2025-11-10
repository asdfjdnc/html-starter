# 学生信息管理系统

一个基于 HTML、CSS、JavaScript 和 Vercel Serverless Functions 的学生信息管理系统，使用 Neon PostgreSQL 数据库。

## 功能特性

- ✅ 学生注册登录
- ✅ 管理员登录
- ✅ 学生信息增删改查（管理员）
- ✅ 学生查看个人信息
- ✅ 密码加密存储（bcrypt）
- ✅ 响应式设计（移动优先）
- ✅ 中文支持

## 技术栈

- **前端**: HTML, CSS, JavaScript
- **后端**: Vercel Serverless Functions (Node.js)
- **数据库**: Neon PostgreSQL
- **部署**: Vercel

## 默认管理员账号

- 用户名: `admin`
- 密码: `admin`

## 快速开始

### 部署到 GitHub 和 Vercel

1. **查看快速部署指南**: [QUICK_START.md](./QUICK_START.md)
2. **查看详细部署指南**: [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md)

### 部署步骤

#### 1. 推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

#### 2. 部署到 Vercel

1. 访问 [Vercel](https://vercel.com) 并登录
2. 导入 GitHub 仓库
3. 配置环境变量 `DATABASE_URL`
4. 点击 "Deploy"

#### 3. 初始化数据库

部署完成后，访问以下 URL 初始化数据库：

```
https://your-domain.vercel.app/api/init
```

这将创建以下表：
- `administrators` - 管理员表
- `students` - 学生表

并创建默认管理员账号（admin/admin）。

## 本地开发（可选）

如果需要本地开发，需要：

1. 创建 `.env.local` 文件，添加：
```
DATABASE_URL=your_neon_database_url
```

2. 安装 Vercel CLI：
```bash
npm i -g vercel
```

3. 运行开发服务器：
```bash
vercel dev
```

## 项目结构

```
.
├── api/                  # Serverless Functions
│   ├── db.js            # 数据库连接
│   ├── init.js          # 数据库初始化 API
│   ├── init-db.js       # 数据库初始化脚本
│   ├── auth/            # 认证相关 API
│   │   ├── login.js     # 登录 API
│   │   └── register.js  # 注册 API
│   └── students/        # 学生相关 API
│       ├── index.js     # 学生列表 API
│       └── [id].js      # 学生详情/更新/删除 API
├── js/                  # 前端 JavaScript
│   ├── utils.js         # 工具函数
│   ├── auth.js          # 认证相关
│   ├── admin.js         # 管理员页面
│   └── student.js       # 学生页面
├── index.html           # 登录页面
├── register.html        # 注册页面
├── admin.html           # 管理员管理页面
├── student.html         # 学生信息页面
├── styles.css           # 样式文件
├── package.json         # 项目配置
└── vercel.json          # Vercel 配置
```

## API 接口

### 认证相关

#### 登录
- **URL**: `/api/auth/login`
- **方法**: `POST`
- **参数**: 
  ```json
  {
    "username": "admin",
    "password": "admin",
    "userType": "admin" // 或 "student"
  }
  ```

#### 注册
- **URL**: `/api/auth/register`
- **方法**: `POST`
- **参数**: 
  ```json
  {
    "studentId": "2021001",
    "password": "password",
    "name": "张三",
    "gender": "男",
    "age": 20,
    "className": "计算机1班",
    "major": "计算机科学"
  }
  ```

### 学生管理

#### 获取学生列表
- **URL**: `/api/students`
- **方法**: `GET`
- **查询参数**: `search` (可选)

#### 添加学生
- **URL**: `/api/students`
- **方法**: `POST`
- **参数**: 同注册接口

#### 获取学生详情
- **URL**: `/api/students/:id`
- **方法**: `GET`

#### 更新学生信息
- **URL**: `/api/students/:id`
- **方法**: `PUT`
- **参数**: 同注册接口（password 可选）

#### 删除学生
- **URL**: `/api/students/:id`
- **方法**: `DELETE`

## 数据库表结构

### administrators 表
- `id`: SERIAL PRIMARY KEY
- `username`: VARCHAR(50) UNIQUE NOT NULL
- `password`: VARCHAR(255) NOT NULL
- `created_at`: TIMESTAMP

### students 表
- `id`: SERIAL PRIMARY KEY
- `student_id`: VARCHAR(50) UNIQUE NOT NULL
- `password`: VARCHAR(255) NOT NULL
- `name`: VARCHAR(100) NOT NULL
- `gender`: VARCHAR(10) NOT NULL
- `age`: INTEGER NOT NULL
- `class_name`: VARCHAR(50) NOT NULL
- `major`: VARCHAR(100) NOT NULL
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## 注意事项

1. 首次部署后，必须访问 `/api/init` 初始化数据库
2. 确保在 Vercel 中配置了 `DATABASE_URL` 环境变量
3. 密码使用 bcrypt 加密存储
4. 系统支持中文，数据库使用 UTF-8 编码

## 许可证

MIT
