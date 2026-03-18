// 页面路由管理
const pages = {
  home: {
    title: '首页',
    icon: '🏠',
    content: `
      <div class="page-header"><h1>📋 首页 - 学习任务管理</h1></div>
      <div class="stats-row">
        <div class="stat-card"><div class="stat-label">总学习时长</div><div class="stat-value primary"><span id="totalDuration">328</span><span style="font-size:16px">分钟</span></div></div>
        <div class="stat-card"><div class="stat-label">今日学习</div><div class="stat-value"><span id="todayDuration">96</span><span style="font-size:16px">分钟</span></div></div>
        <div class="stat-card"><div class="stat-label">待完成任务</div><div class="stat-value warning" id="pendingTasks">42</div></div>
        <div class="stat-card"><div class="stat-label">距离考试</div><div class="stat-value success"><span id="countdownDays">26</span><span style="font-size:16px">天</span></div></div>
      </div>
      <div class="countdown-card">
        <div class="countdown-title">⏰ 距离安徽省考 2026/03/14 09:00 还有</div>
        <div class="countdown-timer">
          <div class="countdown-item"><span class="countdown-number" id="cdDays">26</span><span class="countdown-label">天</span></div>
          <div class="countdown-item"><span class="countdown-number" id="cdHours">14</span><span class="countdown-label">时</span></div>
          <div class="countdown-item"><span class="countdown-number" id="cdMinutes">32</span><span class="countdown-label">分</span></div>
          <div class="countdown-item"><span class="countdown-number" id="cdSeconds">45</span><span class="countdown-label">秒</span></div>
        </div>
      </div>
      <div class="quick-actions">
        <div class="action-card"><div class="action-icon">📝</div><div class="action-name">单个任务录入</div></div>
        <div class="action-card"><div class="action-icon">📅</div><div class="action-name">上传考试信息</div></div>
        <div class="action-card"><div class="action-icon">❌</div><div class="action-name">行测错题上传</div></div>
        <div class="action-card"><div class="action-icon">📤</div><div class="action-name">批量添加任务</div></div>
      </div>
      <div class="data-table-container">
        <div class="table-toolbar">
          <div class="table-filters">
            <button class="filter-btn">🔍 筛选</button>
            <button class="filter-btn">📊 分组</button>
            <button class="filter-btn">🔃 排序</button>
          </div>
          <div class="search-box"><input id="searchInput" placeholder="搜索任务..."><span>🔍</span></div>
        </div>
        <table class="data-table">
          <thead><tr><th>任务名</th><th>任务类型</th><th>预计完成时间</th><th>开始时间</th><th>学习时长 (分钟)</th><th>状态</th><th>学习人</th><th>操作</th></tr></thead>
          <tbody id="taskTableBody"></tbody>
        </table>
        <div class="pagination"><div class="page-info">共 <span id="taskCount">0</span> 条</div><div class="page-controls"><button class="page-btn" disabled>上一页</button><button class="page-btn active">1</button><button class="page-btn">下一页</button></div></div>
      </div>
    `
  },
  exam: {
    title: '考试情况',
    icon: '📅',
    content: `
      <div class="page-header"><h1>📅 考试情况</h1></div>
      <div class="exam-section">
        <h2>🎯 目标考试</h2>
        <div class="data-table-container">
          <table class="data-table">
            <thead><tr><th>考试名称</th><th>考试时间</th><th>倒计时</th><th>是否参加</th><th>操作</th></tr></thead>
            <tbody>
              <tr><td>安徽省 2026 年度考试录用公务员公告</td><td>2026/03/14 09:00</td><td><span class="countdown-badge">26 天</span></td><td><span class="status-tag status-completed">✓</span></td><td><button class="action-btn">编辑</button></td></tr>
              <tr><td>江苏省 2026 年度考试录用公务员公告</td><td>2025/12/06 14:00</td><td><span class="countdown-badge">已过期</span></td><td><span class="status-tag status-completed">✓</span></td><td><button class="action-btn">编辑</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="exam-section" style="margin-top:20px;">
        <h2>📊 历史考试成绩</h2>
        <div class="data-table-container">
          <table class="data-table">
            <thead><tr><th>考试名称</th><th>考试时间</th><th>行测成绩</th><th>申论成绩</th><th>专业课</th><th>排名</th><th>操作</th></tr></thead>
            <tbody>
              <tr><td>江苏省 2026 年度考试录用公务员公告</td><td>2025/12/06 14:00</td><td>71.0</td><td>60.0</td><td>-</td><td>-</td><td><button class="action-btn secondary">录入</button></td></tr>
              <tr><td>中央机关及其直属机构 2026 年度考试录用公务员公告</td><td>2025/11/29 14:00</td><td>73.0</td><td>65.0</td><td>-</td><td>-</td><td><button class="action-btn secondary">录入</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style="margin-top:20px;"><button class="action-btn" onclick="showAddExamModal()">+ 添加考试</button></div>
    `
  },
  practice: {
    title: '刷题记录',
    icon: '📝',
    content: `
      <div class="page-header"><h1>📝 刷题记录</h1></div>
      <div class="chart-section">
        <h2>📊 各板块学习时间分布</h2>
        <div class="chart-placeholder">
          <div style="text-align:center;padding:40px;color:#999;">
            📈 图表区域<br>
            <small>言语理解 35% | 资料分析 30% | 逻辑推理 20% | 数量关系 15%</small>
          </div>
        </div>
      </div>
      <div class="data-table-container" style="margin-top:20px;">
        <div class="table-toolbar">
          <div class="table-filters">
            <button class="filter-btn">🔍 筛选</button>
            <button class="filter-btn">📅 按日期</button>
          </div>
        </div>
        <table class="data-table">
          <thead><tr><th>刷题日期</th><th>科目类型</th><th>题目来源</th><th>刷题时长 (分钟)</th><th>正确率</th><th>学习人</th></tr></thead>
          <tbody>
            <tr><td>2026/02/23</td><td>言语理解</td><td>花生 600 题</td><td>96</td><td>85%</td><td>择风</td></tr>
            <tr><td>2026/02/23</td><td>资料分析</td><td>刷题男孩毛娃儿</td><td>66</td><td>78%</td><td>择风</td></tr>
            <tr><td>2026/02/21</td><td>逻辑推理</td><td>花生逻辑 600 题</td><td>54</td><td>92%</td><td>罗佳</td></tr>
          </tbody>
        </table>
      </div>
    `
  },
  xingce: {
    title: '行测职测',
    icon: '📚',
    content: `
      <div class="page-header"><h1>📚 行测职测</h1></div>
      <div class="subject-tabs">
        <button class="tab-btn active">言语理解</button>
        <button class="tab-btn">逻辑推理</button>
        <button class="tab-btn">资料分析</button>
        <button class="tab-btn">数量关系</button>
        <button class="tab-btn">常识判断</button>
      </div>
      <div class="data-table-container" style="margin-top:20px;">
        <div class="table-toolbar">
          <div class="table-filters">
            <button class="filter-btn">📊 数据可视化分析</button>
            <button class="filter-btn">❌ 错题复盘</button>
            <button class="filter-btn">📄 套题数据总表</button>
          </div>
        </div>
        <table class="data-table">
          <thead><tr><th>任务名</th><th>任务类型</th><th>预计完成时间</th><th>学习时长 (分钟)</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            <tr><td>言语：花生 600 题 1 套</td><td>言语理解</td><td>2026/02/23</td><td>96</td><td><span class="status-tag status-pending">未开始</span></td><td><button class="action-btn">开始</button></td></tr>
            <tr><td>言语：郭熙 100 题第 10 节</td><td>言语理解</td><td>2026/02/17</td><td>45</td><td><span class="status-tag status-completed">已完成</span></td><td><button class="action-btn secondary">查看</button></td></tr>
          </tbody>
        </table>
      </div>
    `
  },
  shenlun: {
    title: '申论综应',
    icon: '✍️',
    content: `
      <div class="page-header"><h1>✍️ 申论综应</h1></div>
      <div class="data-table-container">
        <table class="data-table">
          <thead><tr><th>题目名称</th><th>类型</th><th>完成时间</th><th>得分</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            <tr><td>小马哥申论 16（大作文 2）</td><td>大作文</td><td>2026/02/20</td><td>-</td><td><span class="status-tag status-completed">已完成</span></td><td><button class="action-btn secondary">查看</button></td></tr>
            <tr><td>申论单一题练习 5</td><td>单一题</td><td>2026/02/18</td><td>-</td><td><span class="status-tag status-pending">未开始</span></td><td><button class="action-btn">开始</button></td></tr>
          </tbody>
        </table>
      </div>
      <div style="margin-top:20px;"><button class="action-btn" onclick="showAddShenlunModal()">+ 上传申论题目</button></div>
    `
  },
  community: {
    title: '社区',
    icon: '💬',
    content: `
      <div class="page-header"><h1>💬 社区</h1></div>
      <div class="community-section">
        <div class="post-card">
          <div class="post-header">
            <div class="post-author">择风</div>
            <div class="post-time">2 小时前</div>
          </div>
          <div class="post-content">今天言语理解正确率终于上 85% 了！坚持就是胜利！💪</div>
          <div class="post-footer">
            <span>👍 12</span>
            <span>💬 5 条评论</span>
          </div>
        </div>
        <div class="post-card">
          <div class="post-header">
            <div class="post-author">罗佳</div>
            <div class="post-time">5 小时前</div>
          </div>
          <div class="post-content">资料分析有什么好的刷题推荐吗？求大神指点！</div>
          <div class="post-footer">
            <span>👍 8</span>
            <span>💬 12 条评论</span>
          </div>
        </div>
      </div>
      <button class="action-btn" style="position:fixed;bottom:30px;right:30px;border-radius:50%;width:60px;height:60px;font-size:24px;">+</button>
    `
  },
  plan: {
    title: '计划和课程',
    icon: '📋',
    content: `
      <div class="page-header"><h1>📋 计划和课程</h1></div>
      <div class="plan-section">
        <h2>📅 学习计划</h2>
        <div class="plan-card">
          <div class="plan-header">
            <div class="plan-title">2 月言语理解专项计划</div>
            <div class="plan-progress">进度：75%</div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:75%;"></div>
          </div>
          <div class="plan-footer">
            <span>开始：2026/02/01</span>
            <span>结束：2026/02/28</span>
          </div>
        </div>
      </div>
      <div class="course-section" style="margin-top:20px;">
        <h2>🎬 我的课程</h2>
        <div class="course-list">
          <div class="course-card">
            <div class="course-title">郭熙言语理解系统班</div>
            <div class="course-info">共 30 节 · 已学 25 节</div>
            <button class="action-btn">继续学习</button>
          </div>
          <div class="course-card">
            <div class="course-title">花生十三资料分析</div>
            <div class="course-info">共 20 节 · 已学 15 节</div>
            <button class="action-btn">继续学习</button>
          </div>
        </div>
      </div>
    `
  },
  profile: {
    title: '我的',
    icon: '⚙️',
    content: `
      <div class="page-header"><h1>⚙️ 我的</h1></div>
      <div class="profile-section">
        <div class="profile-header">
          <div class="profile-avatar">择</div>
          <div class="profile-info">
            <div class="profile-name">择风</div>
            <div class="profile-email">zefeng@example.com</div>
          </div>
        </div>
        <div class="menu-list">
          <div class="menu-item"><span>👤 个人信息</span><span>›</span></div>
          <div class="menu-item"><span>🔔 消息通知</span><span>›</span></div>
          <div class="menu-item"><span>💳 我的订阅</span><span>›</span></div>
          <div class="menu-item"><span>📊 学习数据</span><span>›</span></div>
          <div class="menu-item"><span>❓ 帮助与反馈</span><span>›</span></div>
          <div class="menu-item"><span>ℹ️ 关于我们</span><span>›</span></div>
        </div>
        <button class="action-btn" style="width:100%;margin-top:20px;">退出登录</button>
      </div>
    `
  }
};

// 渲染页面
function renderPage(pageKey) {
  const page = pages[pageKey];
  if (!page) return;
  
  document.title = `${page.title} - WaytoLearn 备考管理系统`;
  document.getElementById('content').innerHTML = page.content;
  
  // 更新导航状态
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === pageKey) {
      item.classList.add('active');
    }
  });
  
  // 页面特定初始化
  if (pageKey === 'home') {
    initHomePage();
  }
}

// 首页初始化
function initHomePage() {
  // 倒计时
  const target = new Date('2026-03-14T09:00:00');
  setInterval(() => {
    const now = new Date();
    const diff = target - now;
    if (diff > 0) {
      document.getElementById('cdDays').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
      document.getElementById('cdHours').textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById('cdMinutes').textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById('cdSeconds').textContent = Math.floor((diff % (1000 * 60)) / 1000);
    }
  }, 1000);
}

// 显示添加考试对话框
function showAddExamModal() {
  alert('添加考试功能开发中...');
}

// 显示添加申论题目对话框
function showAddShenlunModal() {
  alert('添加申论题目功能开发中...');
}

// 导出到全局
window.renderPage = renderPage;
window.showAddExamModal = showAddExamModal;
window.showAddShenlunModal = showAddShenlunModal;
