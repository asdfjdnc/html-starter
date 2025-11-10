const pool = require('./db');
const bcrypt = require('bcryptjs');

async function initDatabase() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // 确保数据库使用UTF-8编码（PostgreSQL默认支持，但显式设置更安全）
    await client.query('SET client_encoding = "UTF8"');
    
    // 创建管理员表
    await client.query(`
      CREATE TABLE IF NOT EXISTS administrators (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // 创建学生表（使用TEXT类型以更好地支持中文）
    await client.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        student_id VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        age INTEGER NOT NULL,
        class_name VARCHAR(50) NOT NULL,
        major VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // 检查是否已存在默认管理员账号
    const adminCheck = await client.query(
      'SELECT * FROM administrators WHERE username = $1',
      ['admin']
    );
    
    // 如果不存在，创建默认管理员账号
    if (adminCheck.rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await client.query(
        'INSERT INTO administrators (username, password) VALUES ($1, $2)',
        ['admin', hashedPassword]
      );
      console.log('默认管理员账号已创建: admin/admin');
    }
    
    await client.query('COMMIT');
    console.log('数据库初始化完成');
    
    return { success: true, message: '数据库初始化成功' };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('数据库初始化错误:', error);
    throw error;
  } finally {
    client.release();
  }
}

// 如果直接运行此文件，执行初始化
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('初始化完成');
      process.exit(0);
    })
    .catch((error) => {
      console.error('初始化失败:', error);
      process.exit(1);
    });
}

module.exports = initDatabase;

