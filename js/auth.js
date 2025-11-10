// 认证相关功能

let currentUserType = 'admin';

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否已登录
  const userInfo = checkAuth();
  if (userInfo) {
    if (userInfo.userType === 'admin') {
      window.location.href = 'admin.html';
    } else if (userInfo.userType === 'student') {
      window.location.href = 'student.html';
    }
    return;
  }
  
  // 初始化用户类型选择器
  initUserTypeSelector();
  
  // 初始化登录表单
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // 初始化注册表单
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
});

// 初始化用户类型选择器
function initUserTypeSelector() {
  const buttons = document.querySelectorAll('.user-type-selector button');
  const usernameLabel = document.getElementById('usernameLabel');
  const usernameInput = document.getElementById('username');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // 移除所有活动状态
      buttons.forEach(btn => btn.classList.remove('active'));
      // 添加活动状态到当前按钮
      this.classList.add('active');
      // 更新当前用户类型
      currentUserType = this.dataset.type;
      
      // 更新标签文本
      if (usernameLabel) {
        usernameLabel.textContent = currentUserType === 'admin' ? '用户名' : '学号';
      }
      if (usernameInput) {
        usernameInput.placeholder = currentUserType === 'admin' ? '请输入用户名' : '请输入学号';
      }
    });
  });
}

// 处理登录
async function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (!username || !password) {
    showAlert('请填写用户名和密码', 'error');
    return;
  }
  
  try {
    const data = await apiRequest(`${getApiUrl()}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        userType: currentUserType
      })
    });
    
    if (data.success) {
      // 保存用户信息
      saveUserInfo(data);
      
      // 根据用户类型跳转
      if (data.userType === 'admin') {
        window.location.href = 'admin.html';
      } else if (data.userType === 'student') {
        window.location.href = 'student.html';
      }
    }
  } catch (error) {
    showAlert(error.message || '登录失败，请检查用户名和密码', 'error');
  }
}

// 处理注册
async function handleRegister(e) {
  e.preventDefault();
  
  const studentId = document.getElementById('studentId').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const gender = document.getElementById('gender').value;
  const age = document.getElementById('age').value;
  const className = document.getElementById('className').value;
  const major = document.getElementById('major').value;
  
  if (!studentId || !password || !name || !gender || !age || !className || !major) {
    showAlert('请填写所有字段', 'error');
    return;
  }
  
  try {
    const data = await apiRequest(`${getApiUrl()}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        studentId,
        password,
        name,
        gender,
        age: parseInt(age),
        className,
        major
      })
    });
    
    if (data.success) {
      showAlert('注册成功！正在跳转到登录页面...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }
  } catch (error) {
    showAlert(error.message || '注册失败，请检查输入信息', 'error');
  }
}

