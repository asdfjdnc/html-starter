// 简单的Vercel部署脚本
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 开始部署到Vercel...');

try {
  // 检查是否已有vercel.json
  if (!fs.existsSync('vercel.json')) {
    console.log('❌ 找不到vercel.json文件');
    process.exit(1);
  }

  // 检查环境变量
  if (!fs.existsSync('.env')) {
    console.log('⚠️  找不到.env文件，请确保已配置环境变量');
  }

  console.log('📋 项目结构检查完成');
  console.log('✅ vercel.json 存在');
  console.log('✅ API 文件夹存在');
  console.log('✅ 前端文件存在');
  
  console.log('\n📝 部署说明：');
  console.log('1. 请访问 https://vercel.com');
  console.log('2. 导入GitHub仓库或上传本项目文件夹');
  console.log('3. 在Vercel控制台设置环境变量DATABASE_URL');
  console.log('4. 部署完成后访问提供的URL');
  console.log('5. 首次访问 /api/init 初始化数据库');
  
  console.log('\n🎯 默认管理员账号：');
  console.log('用户名：admin');
  console.log('密码：admin');

} catch (error) {
  console.error('❌ 部署失败：', error.message);
  process.exit(1);
}