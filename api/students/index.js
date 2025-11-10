const pool = require('../db');
const { parseJSONBody } = require('../utils/bodyParser');

module.exports = async (req, res) => {
  // 设置CORS头和内容类型
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    // 获取所有学生信息
    try {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const searchParams = url.searchParams;
      const search = searchParams.get('search') || (req.query && req.query.search);
      
      let query = 'SELECT id, student_id, name, gender, age, class_name, major, created_at, updated_at FROM students';
      let params = [];
      
      if (search) {
        query += ' WHERE student_id LIKE $1 OR name LIKE $1 OR class_name LIKE $1 OR major LIKE $1';
        params.push(`%${search}%`);
      }
      
      query += ' ORDER BY created_at DESC';
      
      const result = await pool.query(query, params);
      
      return res.status(200).json({
        success: true,
        students: result.rows
      });
    } catch (error) {
      console.error('获取学生列表错误:', error);
      return res.status(500).json({ error: '获取学生列表失败', details: error.message });
    }
  }
  
  if (req.method === 'POST') {
    // 添加新学生
    try {
      const body = await parseJSONBody(req);
      const { studentId, password, name, gender, age, className, major } = body;
      
      if (!studentId || !password || !name || !gender || !age || !className || !major) {
        return res.status(400).json({ error: '请填写所有字段' });
      }
      
      // 检查学号是否已存在
      const existingStudent = await pool.query(
        'SELECT * FROM students WHERE student_id = $1',
        [studentId]
      );
      
      if (existingStudent.rows.length > 0) {
        return res.status(400).json({ error: '该学号已存在' });
      }
      
      // 加密密码
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // 插入学生记录
      const result = await pool.query(
        `INSERT INTO students (student_id, password, name, gender, age, class_name, major) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING id, student_id, name, gender, age, class_name, major, created_at, updated_at`,
        [studentId, hashedPassword, name, gender, parseInt(age), className, major]
      );
      
      return res.status(201).json({
        success: true,
        message: '学生添加成功',
        student: result.rows[0]
      });
    } catch (error) {
      console.error('添加学生错误:', error);
      return res.status(500).json({ error: '添加学生失败', details: error.message });
    }
  }
  
  return res.status(405).json({ error: '方法不允许' });
};

