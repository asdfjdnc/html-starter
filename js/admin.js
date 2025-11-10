// 管理员页面功能

let students = [];
let editingStudentId = null;

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否已登录
  const userInfo = checkAuth();
  if (!userInfo || userInfo.userType !== 'admin') {
    window.location.href = 'index.html';
    return;
  }
  
  // 加载学生列表
  loadStudents();
  
  // 初始化表单
  const studentForm = document.getElementById('studentForm');
  if (studentForm) {
    studentForm.addEventListener('submit', handleSaveStudent);
  }
  
  // 初始化搜索
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchStudents();
      }
    });
  }
});

// 加载学生列表
async function loadStudents(searchTerm = '') {
  const loadingIndicator = document.getElementById('loadingIndicator');
  const tableContainer = document.getElementById('studentsTableContainer');
  
  try {
    loadingIndicator.style.display = 'block';
    tableContainer.innerHTML = '';
    
    const url = searchTerm 
      ? `${getApiUrl()}/students?search=${encodeURIComponent(searchTerm)}`
      : `${getApiUrl()}/students`;
    
    const data = await apiRequest(url, {
      method: 'GET'
    });
    
    students = data.students || [];
    displayStudents(students);
  } catch (error) {
    showAlert(error.message || '加载学生列表失败', 'error');
    tableContainer.innerHTML = '<div class="empty-state"><p>加载失败，请刷新重试</p></div>';
  } finally {
    loadingIndicator.style.display = 'none';
  }
}

// 显示学生列表
function displayStudents(studentsList) {
  const tableContainer = document.getElementById('studentsTableContainer');
  
  if (studentsList.length === 0) {
    tableContainer.innerHTML = '<div class="empty-state"><p>暂无学生信息</p></div>';
    return;
  }
  
  let html = `
    <table>
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>班级</th>
          <th>专业</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  studentsList.forEach(student => {
    html += `
      <tr>
        <td>${student.student_id}</td>
        <td>${student.name}</td>
        <td>${student.gender}</td>
        <td>${student.age}</td>
        <td>${student.class_name}</td>
        <td>${student.major}</td>
        <td>
          <div class="action-buttons">
            <button class="btn btn-primary btn-sm" onclick="editStudent(${student.id})">编辑</button>
            <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">删除</button>
          </div>
        </td>
      </tr>
    `;
  });
  
  html += `
      </tbody>
    </table>
  `;
  
  tableContainer.innerHTML = html;
}

// 搜索学生
function searchStudents() {
  const searchTerm = document.getElementById('searchInput').value.trim();
  loadStudents(searchTerm);
}

// 处理搜索事件
function handleSearch(e) {
  if (e.key === 'Enter') {
    searchStudents();
  }
}

// 清空搜索
function clearSearch() {
  document.getElementById('searchInput').value = '';
  loadStudents();
}

// 打开添加学生模态框
function openAddModal() {
  editingStudentId = null;
  const modal = document.getElementById('studentModal');
  const modalTitle = document.getElementById('modalTitle');
  const form = document.getElementById('studentForm');
  
  modalTitle.textContent = '添加学生';
  form.reset();
  document.getElementById('passwordInput').required = true;
  document.getElementById('passwordHint').textContent = '*';
  
  modal.classList.add('active');
}

// 编辑学生
async function editStudent(id) {
  try {
    const data = await apiRequest(`${getApiUrl()}/students/${id}`, {
      method: 'GET'
    });
    
    if (data.success) {
      editingStudentId = id;
      const student = data.student;
      const modal = document.getElementById('studentModal');
      const modalTitle = document.getElementById('modalTitle');
      const form = document.getElementById('studentForm');
      
      modalTitle.textContent = '编辑学生';
      document.getElementById('studentId').value = student.id;
      document.getElementById('studentIdInput').value = student.student_id;
      document.getElementById('passwordInput').value = '';
      document.getElementById('passwordInput').required = false;
      document.getElementById('passwordHint').textContent = '';
      document.getElementById('nameInput').value = student.name;
      document.getElementById('genderInput').value = student.gender;
      document.getElementById('ageInput').value = student.age;
      document.getElementById('classNameInput').value = student.class_name;
      document.getElementById('majorInput').value = student.major;
      
      modal.classList.add('active');
    }
  } catch (error) {
    showAlert(error.message || '加载学生信息失败', 'error');
  }
}

// 关闭模态框
function closeModal() {
  const modal = document.getElementById('studentModal');
  modal.classList.remove('active');
  editingStudentId = null;
  document.getElementById('studentForm').reset();
}

// 保存学生
async function handleSaveStudent(e) {
  e.preventDefault();
  
  const formData = {
    studentId: document.getElementById('studentIdInput').value,
    name: document.getElementById('nameInput').value,
    gender: document.getElementById('genderInput').value,
    age: document.getElementById('ageInput').value,
    className: document.getElementById('classNameInput').value,
    major: document.getElementById('majorInput').value
  };
  
  const password = document.getElementById('passwordInput').value;
  if (password) {
    formData.password = password;
  }
  
  if (!formData.studentId || !formData.name || !formData.gender || !formData.age || !formData.className || !formData.major) {
    showAlert('请填写所有必填字段', 'error');
    return;
  }
  
  try {
    let data;
    if (editingStudentId) {
      // 更新学生
      data = await apiRequest(`${getApiUrl()}/students/${editingStudentId}`, {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
    } else {
      // 添加学生
      if (!password) {
        showAlert('添加学生时密码为必填项', 'error');
        return;
      }
      data = await apiRequest(`${getApiUrl()}/students`, {
        method: 'POST',
        body: JSON.stringify(formData)
      });
    }
    
    if (data.success) {
      showAlert(data.message || (editingStudentId ? '更新成功' : '添加成功'), 'success');
      closeModal();
      loadStudents();
    }
  } catch (error) {
    showAlert(error.message || '保存失败', 'error');
  }
}

// 删除学生
async function deleteStudent(id) {
  if (!confirm('确定要删除这个学生吗？此操作不可恢复。')) {
    return;
  }
  
  try {
    const data = await apiRequest(`${getApiUrl()}/students/${id}`, {
      method: 'DELETE'
    });
    
    if (data.success) {
      showAlert('删除成功', 'success');
      loadStudents();
    }
  } catch (error) {
    showAlert(error.message || '删除失败', 'error');
  }
}

// 点击模态框外部关闭
window.onclick = function(event) {
  const modal = document.getElementById('studentModal');
  if (event.target === modal) {
    closeModal();
  }
}

