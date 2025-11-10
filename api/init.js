const initDatabase = require('./init-db');

module.exports = async (req, res) => {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 支持GET和POST方法
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }
  
  try {
    const result = await initDatabase();
    res.status(200).json(result);
  } catch (error) {
    console.error('初始化错误:', error);
    res.status(500).json({ error: '数据库初始化失败', details: error.message });
  }
};

