// 请求体解析辅助函数

async function parseJSONBody(req) {
  // 如果req.body已经存在（Vercel可能已经解析），直接返回
  if (req.body !== undefined && req.body !== null) {
    try {
      if (typeof req.body === 'string') {
        return JSON.parse(req.body);
      }
      if (typeof req.body === 'object') {
        return req.body;
      }
    } catch (e) {
      throw new Error('无效的JSON格式: ' + e.message);
    }
  }
  
  // 如果req有json方法（某些环境提供，如Web API），使用它
  if (typeof req.json === 'function') {
    try {
      return await req.json();
    } catch (e) {
      throw new Error('解析JSON失败: ' + e.message);
    }
  }
  
  // 如果req是一个流，从流中读取
  if (req.readable || typeof req.on === 'function') {
    return new Promise((resolve, reject) => {
      let body = '';
      
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch (error) {
          reject(new Error('无效的JSON格式: ' + error.message));
        }
      });
      
      req.on('error', reject);
    });
  }
  
  // 如果以上都不适用，返回空对象
  return {};
}

module.exports = { parseJSONBody };

