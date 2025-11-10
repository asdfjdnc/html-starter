// 部署状态检查脚本
const fs = require('fs');
const path = require('path');

console.log('🔍 检查项目部署准备状态...\n');

// 检查必需文件
const requiredFiles = [
  'vercel.json',
  'package.json',
  'index.html',
  'styles.css',
  '.env'
];

const requiredDirs = [
  'api',
  'js',
  'css'
];

const requiredApiFiles = [
  'api/db.js',
  'api/init.js',
  'api/auth/login.js',
  'api/auth/register.js',
  'api/students/index.js',
  'api/students/[id].js'
];

let allGood = true;

// 检查文件
console.log('📋 检查必需文件:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - 缺失`);
    allGood = false;
  }
});

// 检查目录
console.log('\n📁 检查必需目录:');
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`  ✅ ${dir}/`);
  } else {
    console.log(`  ❌ ${dir}/ - 缺失`);
    allGood = false;
  }
});

// 检查API文件
console.log('\n🔧 检查API文件:');
requiredApiFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - 缺失`);
    allGood = false;
  }
});

// 检查环境变量
console.log('\n🔐 检查环境变量:');
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  if (envContent.includes('DATABASE_URL')) {
    console.log('  ✅ DATABASE_URL 已配置');
  } else {
    console.log('  ❌ DATABASE_URL 未找到');
    allGood = false;
  }
  
  if (envContent.includes('neondb')) {
    console.log('  ✅ Neon数据库连接字符串已设置');
  } else {
    console.log('  ⚠️  数据库连接字符串可能需要检查');
  }
} else {
  console.log('  ❌ .env文件不存在');
  allGood = false;
}

// 检查Vercel配置
console.log('\n⚙️  检查Vercel配置:');
if (fs.existsSync('vercel.json')) {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    if (vercelConfig.functions) {
      console.log('  ✅ Functions配置已设置');
    } else {
      console.log('  ⚠️  Functions配置可能不完整');
    }
  } catch (error) {
    console.log('  ❌ vercel.json格式错误');
    allGood = false;
  }
} else {
  console.log('  ❌ vercel.json不存在');
  allGood = false;
}

// 检查package.json
console.log('\n📦 检查package.json:');
if (fs.existsSync('package.json')) {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.dependencies) {
      const deps = Object.keys(packageJson.dependencies);
      if (deps.includes('pg') && deps.includes('bcryptjs')) {
        console.log('  ✅ 必需依赖已安装 (pg, bcryptjs)');
      } else {
        console.log('  ⚠️  某些依赖可能缺失');
      }
    }
  } catch (error) {
    console.log('  ❌ package.json格式错误');
    allGood = false;
  }
}

// 总结
console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('🎉 项目已准备好部署到Vercel！');
  console.log('\n📋 下一步操作：');
  console.log('1. 访问 https://vercel.com');
  console.log('2. 导入GitHub仓库');
  console.log('3. 设置环境变量DATABASE_URL');
  console.log('4. 点击部署');
  console.log('5. 部署完成后访问 /api/init 初始化数据库');
} else {
  console.log('❌ 项目还存在一些问题，请解决后再部署');
}

console.log('\n📖 详细部署指南请查看：');
console.log('- MANUAL_DEPLOYMENT.md (手动部署指南)');
console.log('- VERCEL_DEPLOYMENT_GUIDE.md (Vercel部署指南)');
console.log('- TEST.md (测试清单)');