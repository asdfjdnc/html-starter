// 工具函数

// 显示提示消息
function showAlert(message, type = 'info', containerId = 'alertContainer') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  
  // 3秒后自动消失
  setTimeout(() => {
    container.innerHTML = '';
  }, 3000);
}

// 获取API基础URL
function getApiUrl() {
  // 在Vercel上，API路由在/api目录下
  return '/api';
}

// 发送API请求
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || '请求失败');
    }
    
    return data;
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
}

// 检查用户是否已登录
function checkAuth() {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    return null;
  }
  
  try {
    return JSON.parse(userInfo);
  } catch (e) {
    return null;
  }
}

// 保存用户信息
function saveUserInfo(userInfo) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

// 清除用户信息
function clearUserInfo() {
  localStorage.removeItem('userInfo');
}

// 退出登录
function logout() {
  clearUserInfo();
  window.location.href = 'index.html';
}

// 格式化日期
function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN');
}

