// 请求处理工具函数

// 解析请求体
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    if (req.method === 'GET' || req.method === 'DELETE') {
      resolve({});
      return;
    }
    
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('无效的JSON格式'));
      }
    });
    
    req.on('error', reject);
  });
}

// 解析查询参数
function parseQuery(url) {
  const urlObj = new URL(url, 'http://localhost');
  const params = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

// 从URL路径提取动态参数
function extractPathParams(url, pattern) {
  // 例如：/api/students/123 -> { id: '123' }
  const urlParts = url.split('?')[0].split('/');
  const patternParts = pattern.split('/');
  const params = {};
  
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith('[') && patternParts[i].endsWith(']')) {
      const paramName = patternParts[i].slice(1, -1);
      params[paramName] = urlParts[i];
    }
  }
  
  return params;
}

module.exports = {
  parseBody,
  parseQuery,
  extractPathParams
};

