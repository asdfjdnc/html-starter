// 学生页面功能

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否已登录
  const userInfo = checkAuth();
  if (!userInfo || userInfo.userType !== 'student') {
    window.location.href = 'index.html';
    return;
  }
  
  // 显示学生信息
  displayStudentInfo(userInfo.student);
});

// 显示学生信息
function displayStudentInfo(student) {
  const container = document.getElementById('studentInfoContainer');
  const loadingIndicator = document.getElementById('loadingIndicator');
  
  if (!student) {
    container.innerHTML = '<div class="empty-state"><p>无法加载学生信息</p></div>';
    loadingIndicator.style.display = 'none';
    return;
  }
  
  loadingIndicator.style.display = 'none';
  
  const html = `
    <div class="student-info-card">
      <div class="student-info-item">
        <div class="student-info-label">学号：</div>
        <div class="student-info-value">${student.student_id}</div>
      </div>
      <div class="student-info-item">
        <div class="student-info-label">姓名：</div>
        <div class="student-info-value">${student.name}</div>
      </div>
      <div class="student-info-item">
        <div class="student-info-label">性别：</div>
        <div class="student-info-value">${student.gender}</div>
      </div>
      <div class="student-info-item">
        <div class="student-info-label">年龄：</div>
        <div class="student-info-value">${student.age}</div>
      </div>
      <div class="student-info-item">
        <div class="student-info-label">班级：</div>
        <div class="student-info-value">${student.class_name}</div>
      </div>
      <div class="student-info-item">
        <div class="student-info-label">专业：</div>
        <div class="student-info-value">${student.major}</div>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}

