const pool = require('../db');
const bcrypt = require('bcryptjs');
const { parseJSONBody } = require('../utils/bodyParser');

module.exports = async (req, res) => {
  // 设置CORS头和内容类型
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 从URL路径中提取ID（Vercel动态路由）
  let id;
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathParts = url.pathname.split('/').filter(p => p);
    id = pathParts[pathParts.length - 1] || req.query?.id;
  } catch (e) {
    // 如果URL解析失败，尝试从req.query获取
    id = req.query?.id;
  }
  
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: '缺少有效的学生ID' });
  }
  
  if (req.method === 'GET') {
    // 获取单个学生信息
    try {
      const result = await pool.query(
        'SELECT id, student_id, name, gender, age, class_name, major, created_at, updated_at FROM students WHERE id = $1',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: '学生不存在' });
      }
      
      return res.status(200).json({
        success: true,
        student: result.rows[0]
      });
    } catch (error) {
      console.error('获取学生信息错误:', error);
      return res.status(500).json({ error: '获取学生信息失败', details: error.message });
    }
  }
  
  if (req.method === 'PUT') {
    // 更新学生信息
    try {
      const body = await parseJSONBody(req);
      const { studentId, password, name, gender, age, className, major } = body;
      
      if (!studentId || !name || !gender || !age || !className || !major) {
        return res.status(400).json({ error: '请填写所有字段' });
      }
      
      // 检查学号是否被其他学生使用
      const existingStudent = await pool.query(
        'SELECT * FROM students WHERE student_id = $1 AND id != $2',
        [studentId, id]
      );
      
      if (existingStudent.rows.length > 0) {
        return res.status(400).json({ error: '该学号已被其他学生使用' });
      }
      
      // 如果提供了新密码，则加密并更新
      let updateQuery;
      let params;
      
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateQuery = `
          UPDATE students 
          SET student_id = $1, password = $2, name = $3, gender = $4, age = $5, class_name = $6, major = $7, updated_at = CURRENT_TIMESTAMP
          WHERE id = $8
          RETURNING id, student_id, name, gender, age, class_name, major, created_at, updated_at
        `;
        params = [studentId, hashedPassword, name, gender, parseInt(age), className, major, id];
      } else {
        updateQuery = `
          UPDATE students 
          SET student_id = $1, name = $2, gender = $3, age = $4, class_name = $5, major = $6, updated_at = CURRENT_TIMESTAMP
          WHERE id = $7
          RETURNING id, student_id, name, gender, age, class_name, major, created_at, updated_at
        `;
        params = [studentId, name, gender, parseInt(age), className, major, id];
      }
      
      const result = await pool.query(updateQuery, params);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: '学生不存在' });
      }
      
      return res.status(200).json({
        success: true,
        message: '学生信息更新成功',
        student: result.rows[0]
      });
    } catch (error) {
      console.error('更新学生信息错误:', error);
      return res.status(500).json({ error: '更新学生信息失败', details: error.message });
    }
  }
  
  if (req.method === 'DELETE') {
    // 删除学生
    try {
      const result = await pool.query(
        'DELETE FROM students WHERE id = $1 RETURNING id',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: '学生不存在' });
      }
      
      return res.status(200).json({
        success: true,
        message: '学生删除成功'
      });
    } catch (error) {
      console.error('删除学生错误:', error);
      return res.status(500).json({ error: '删除学生失败', details: error.message });
    }
  }
  
  return res.status(405).json({ error: '方法不允许' });
};

