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
    const { studentId, password, name, gender, age, className, major } = body;
    
    // 验证必填字段
    if (!studentId || !password || !name || !gender || !age || !className || !major) {
      return res.status(400).json({ error: '请填写所有字段' });
    }
    
    // 验证学号是否已存在
    const existingStudent = await pool.query(
      'SELECT * FROM students WHERE student_id = $1',
      [studentId]
    );
    
    if (existingStudent.rows.length > 0) {
      return res.status(400).json({ error: '该学号已存在' });
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 插入学生记录
    const result = await pool.query(
      `INSERT INTO students (student_id, password, name, gender, age, class_name, major) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, student_id, name, gender, age, class_name, major`,
      [studentId, hashedPassword, name, gender, parseInt(age), className, major]
    );
    
    const student = result.rows[0];
    
    return res.status(201).json({
      success: true,
      message: '注册成功',
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
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ error: '注册失败', details: error.message });
  }
};

