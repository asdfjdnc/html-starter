// API 代码语法测试脚本

const fs = require('fs');
const path = require('path');

console.log('开始测试 API 代码...\n');

// 测试的文件列表
const apiFiles = [
  'api/db.js',
  'api/init-db.js',
  'api/init.js',
  'api/auth/login.js',
  'api/auth/register.js',
  'api/students/index.js',
  'api/students/[id].js',
  'api/utils/bodyParser.js'
];

let hasError = false;

// 测试每个文件
apiFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${file}`);
    hasError = true;
    return;
  }
  
  try {
    // 尝试加载模块（检查语法）
    delete require.cache[require.resolve(filePath)];
    require(filePath);
    console.log(`✅ ${file} - 语法正确`);
  } catch (error) {
    console.error(`❌ ${file} - 错误: ${error.message}`);
    hasError = true;
  }
});

// 测试前端 JavaScript 文件
console.log('\n开始测试前端 JavaScript 代码...\n');

const jsFiles = [
  'js/utils.js',
  'js/auth.js',
  'js/admin.js',
  'js/student.js'
];

jsFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${file}`);
    hasError = true;
    return;
  }
  
  try {
    // 读取文件内容检查基本语法
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 检查基本的JavaScript语法错误
    if (content.includes('function') || content.includes('const') || content.includes('let')) {
      // 尝试使用eval检查语法（仅检查语法，不执行）
      new Function(content);
      console.log(`✅ ${file} - 语法正确`);
    } else {
      console.log(`⚠️  ${file} - 文件为空或格式异常`);
    }
  } catch (error) {
    console.error(`❌ ${file} - 错误: ${error.message}`);
    hasError = true;
  }
});

// 测试 HTML 文件
console.log('\n开始测试 HTML 文件...\n');

const htmlFiles = [
  'index.html',
  'register.html',
  'admin.html',
  'student.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${file}`);
    hasError = true;
    return;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 检查基本的HTML结构
    if (content.includes('<!DOCTYPE html>') && 
        content.includes('<html') && 
        content.includes('</html>')) {
      console.log(`✅ ${file} - 结构正确`);
    } else {
      console.warn(`⚠️  ${file} - HTML结构可能不完整`);
    }
    
    // 检查是否包含必要的脚本引用
    if (file === 'index.html' || file === 'register.html') {
      if (content.includes('js/utils.js') && content.includes('js/auth.js')) {
        console.log(`   ✅ ${file} - JavaScript引用正确`);
      } else {
        console.warn(`   ⚠️  ${file} - JavaScript引用可能缺失`);
      }
    } else if (file === 'admin.html') {
      if (content.includes('js/utils.js') && content.includes('js/admin.js')) {
        console.log(`   ✅ ${file} - JavaScript引用正确`);
      } else {
        console.warn(`   ⚠️  ${file} - JavaScript引用可能缺失`);
      }
    } else if (file === 'student.html') {
      if (content.includes('js/utils.js') && content.includes('js/student.js')) {
        console.log(`   ✅ ${file} - JavaScript引用正确`);
      } else {
        console.warn(`   ⚠️  ${file} - JavaScript引用可能缺失`);
      }
    }
  } catch (error) {
    console.error(`❌ ${file} - 错误: ${error.message}`);
    hasError = true;
  }
});

// 检查配置文件
console.log('\n开始测试配置文件...\n');

const configFiles = [
  'package.json',
  'vercel.json'
];

configFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${file}`);
    hasError = true;
    return;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    JSON.parse(content);
    console.log(`✅ ${file} - JSON格式正确`);
  } catch (error) {
    console.error(`❌ ${file} - JSON格式错误: ${error.message}`);
    hasError = true;
  }
});

console.log('\n' + '='.repeat(50));
if (hasError) {
  console.log('❌ 测试完成，发现错误！');
  process.exit(1);
} else {
  console.log('✅ 所有测试通过！');
  console.log('\n提示:');
  console.log('1. 确保在Vercel中配置了DATABASE_URL环境变量');
  console.log('2. 部署后访问 /api/init 初始化数据库');
  console.log('3. 使用 admin/admin 登录管理员账户');
  process.exit(0);
}

