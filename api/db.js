const { Pool } = require('pg');

// 从环境变量获取数据库连接字符串
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('localhost') 
    ? false 
    : { rejectUnauthorized: false },
  // 设置客户端编码为UTF-8以支持中文
  client_encoding: 'UTF8'
});

// 测试数据库连接
pool.on('connect', () => {
  console.log('数据库连接成功');
});

pool.on('error', (err) => {
  console.error('数据库连接错误:', err);
});

module.exports = pool;

