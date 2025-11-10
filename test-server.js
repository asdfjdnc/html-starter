// 简单的本地测试服务器
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME 类型映射
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // 处理根路径
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // 获取文件扩展名
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // 读取文件
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // 文件不存在，返回404
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>404 - 文件未找到</title>
          </head>
          <body>
            <h1>404 - 文件未找到</h1>
            <p>请求的文件不存在: ${req.url}</p>
            <a href="/">返回首页</a>
          </body>
          </html>
        `);
      } else {
        // 服务器错误
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>500 - 服务器错误</title>
          </head>
          <body>
            <h1>500 - 服务器错误</h1>
            <p>${error.message}</p>
          </body>
          </html>
        `);
      }
    } else {
      // 成功返回文件
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('本地测试服务器已启动！');
  console.log('='.repeat(50));
  console.log(`服务器地址: http://localhost:${PORT}`);
  console.log('');
  console.log('可用页面:');
  console.log(`  - 登录页面: http://localhost:${PORT}/index.html`);
  console.log(`  - 注册页面: http://localhost:${PORT}/register.html`);
  console.log(`  - 管理员页面: http://localhost:${PORT}/admin.html`);
  console.log(`  - 学生页面: http://localhost:${PORT}/student.html`);
  console.log('');
  console.log('注意:');
  console.log('  - 这是一个前端测试服务器，API功能需要在Vercel上测试');
  console.log('  - 前端页面可以正常显示，但API请求会失败（这是正常的）');
  console.log('');
  console.log('按 Ctrl+C 停止服务器');
  console.log('='.repeat(50));
});

