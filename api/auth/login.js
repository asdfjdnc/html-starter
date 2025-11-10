const pool = require('../db');
const bcrypt = require('bcryptjs');
const { parseJSONBody } = require('../utils/bodyParser');

module.exports = async (req, res) => {
  // 设置CORS头和内容类型
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }
  
  try {
    const body = await parseJSONBody(req);
    const { username, password, userType } = body;
    
    if (!username || !password || !userType) {
      return res.status(400).json({ error: '请填写所有字段' });
    }
    
    if (userType === 'admin') {
      // 管理员登录
      const result = await pool.query(
        'SELECT * FROM administrators WHERE username = $1',
        [username]
      );
      
      if (result.rows.length === 0) {
        return res.status(401).json({ error: '用户名或密码错误' });
      }
      
      const admin = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, admin.password);
      
      if (!passwordMatch) {
        return res.status(401).json({ error: '用户名或密码错误' });
      }
      
      return res.status(200).json({
        success: true,
        userType: 'admin',
        username: admin.username,
        id: admin.id
      });
    } else if (userType === 'student') {
      // 学生登录
      const result = await pool.query(
        'SELECT * FROM students WHERE student_id = $1',
        [username]
      );
      
      if (result.rows.length === 0) {
        return res.status(401).json({ error: '学号或密码错误' });
      }
      
      const student = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, student.password);
      
      if (!passwordMatch) {
        return res.status(401).json({ error: '学号或密码错误' });
      }
      
      return res.status(200).json({
        success: true,
        userType: 'student',
        student: {
          id: student.id,
          student_id: student.student_id,
          name: student.name,
          gender: student.gender,
          age: student.age,
          class_name: student.class_name,
          major: student.major
        }
      });
    } else {
      return res.status(400).json({ error: '无效的用户类型' });
    }
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ error: '登录失败', details: error.message });
  }
};

