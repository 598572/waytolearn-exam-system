# 🚀 飞书轻应用 - 前端代码

## 应用结构

```
waytolearn-lite-app/
├── manifest.json        # 飞书轻应用配置
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── app.js          # 主逻辑
│   ├── api.js          # 飞书 API 封装
│   └── router.js       # 路由管理
└── pages/
    ├── home.html       # 首页（学习任务）
    ├── exam.html       # 考试情况
    ├── practice.html   # 刷题记录
    ├── xingce.html     # 行测职测
    ├── shenlun.html    # 申论综应
    ├── community.html  # 社区
    ├── plan.html       # 计划和课程
    └── profile.html    # 我的
```

---

## 1. manifest.json（应用配置）

```json
{
  "appId": "cli_a930a522f6b89cbd",
  "name": "WaytoLearn 备考管理系统",
  "version": "1.0.0",
  "description": "公考备考学习管理与数据统计平台",
  "icon": "https://example.com/icon.png",
  "homepage": "https://example.com/index.html",
  "navigation": {
    "items": [
      {
        "title": "首页",
        "key": "home",
        "icon": "home"
      },
      {
        "title": "考试情况",
        "key": "exam",
        "icon": "calendar"
      },
      {
        "title": "刷题记录",
        "key": "practice",
        "icon": "edit"
      },
      {
        "title": "行测职测",
        "key": "xingce",
        "icon": "book"
      },
      {
        "title": "申论综应",
        "key": "shenlun",
        "icon": "file-text"
      },
      {
        "title": "社区",
        "key": "community",
        "icon": "message"
      },
      {
        "title": "计划和课程",
        "key": "plan",
        "icon": "schedule"
      },
      {
        "title": "我的",
        "key": "profile",
        "icon": "user"
      }
    ]
  },
  "permissions": [
    "bitable:app",
    "bitable:table",
    "bitable:record",
    "contact:user.base:readonly",
    "im:message"
  ]
}
```

---

## 2. index.html（主页面）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WaytoLearn 备考管理系统</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/element-plus"></script>
  <link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css">
</head>
<body>
  <div id="app">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="logo">
        <span class="logo-icon">W</span>
        <span class="logo-text">WaytoLearn 备考管理系统</span>
      </div>
      <div class="user-info">
        <el-avatar :size="32">{{ userName }}</el-avatar>
      </div>
    </header>

    <div class="main-container">
      <!-- 侧边导航 -->
      <aside class="sidebar">
        <nav>
          <div 
            v-for="item in navItems" 
            :key="item.key"
            class="nav-item"
            :class="{ active: currentPage === item.key }"
            @click="navigateTo(item.key)"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-text">{{ item.title }}</span>
          </div>
        </nav>
      </aside>

      <!-- 内容区域 -->
      <main class="content">
        <!-- 首页 -->
        <div v-if="currentPage === 'home'" class="page home-page">
          <div class="page-header">
            <h1>📋 首页 - 学习任务管理</h1>
          </div>

          <!-- 统计卡片 -->
          <div class="stats-row">
            <div class="stat-card">
              <div class="stat-label">总学习时长</div>
              <div class="stat-value primary">{{ stats.totalDuration }}<span class="unit">分钟</span></div>
            </div>
            <div class="stat-card">
              <div class="stat-label">今日学习</div>
              <div class="stat-value">{{ stats.todayDuration }}<span class="unit">分钟</span></div>
            </div>
            <div class="stat-card">
              <div class="stat-label">待完成任务</div>
              <div class="stat-value warning">{{ stats.pendingTasks }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">距离考试</div>
              <div class="stat-value success">{{ stats.daysToExam }}<span class="unit">天</span></div>
            </div>
          </div>

          <!-- 倒计时 -->
          <div class="countdown-card">
            <div class="countdown-title">⏰ 距离安徽省考 {{ examDate }} 还有</div>
            <div class="countdown-timer">
              <div class="countdown-item">
                <span class="countdown-number">{{ countdown.days }}</span>
                <span class="countdown-label">天</span>
              </div>
              <div class="countdown-item">
                <span class="countdown-number">{{ countdown.hours }}</span>
                <span class="countdown-label">时</span>
              </div>
              <div class="countdown-item">
                <span class="countdown-number">{{ countdown.minutes }}</span>
                <span class="countdown-label">分</span>
              </div>
              <div class="countdown-item">
                <span class="countdown-number">{{ countdown.seconds }}</span>
                <span class="countdown-label">秒</span>
              </div>
            </div>
          </div>

          <!-- 快捷操作 -->
          <div class="quick-actions">
            <div class="action-card" @click="showAddTaskModal">
              <div class="action-icon">📝</div>
              <div class="action-name">单个任务录入</div>
            </div>
            <div class="action-card" @click="showAddExamModal">
              <div class="action-icon">📅</div>
              <div class="action-name">上传考试信息</div>
            </div>
            <div class="action-card" @click="showWrongQuestionModal">
              <div class="action-icon">❌</div>
              <div class="action-name">行测错题上传</div>
            </div>
          </div>

          <!-- 任务列表 -->
          <div class="data-table-container">
            <div class="table-toolbar">
              <div class="table-filters">
                <el-button @click="filterTasks">🔍 筛选</el-button>
                <el-button @click="groupTasks">📊 分组</el-button>
                <el-button @click="sortTasks">🔃 排序</el-button>
              </div>
              <el-input 
                v-model="searchQuery" 
                placeholder="搜索任务..." 
                prefix-icon="Search"
                style="width: 200px"
              />
            </div>

            <el-table :data="filteredTasks" style="width: 100%">
              <el-table-column prop="task_name" label="任务名" />
              <el-table-column prop="task_type" label="任务类型" width="120" />
              <el-table-column prop="expected_finish_time" label="预计完成时间" width="150" />
              <el-table-column prop="start_time" label="开始时间" width="150" />
              <el-table-column prop="duration_minutes" label="学习时长 (分钟)" width="120" />
              <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                  <el-tag :type="getStatusType(scope.row.status)">
                    {{ scope.row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="learner" label="学习人" width="100" />
              <el-table-column label="操作" width="200" fixed="right">
                <template #default="scope">
                  <el-button 
                    size="small" 
                    :type="scope.row.status === '未开始' ? 'primary' : 'success'"
                    @click="handleTaskAction(scope.row)"
                  >
                    {{ getTaskActionText(scope.row.status) }}
                  </el-button>
                  <el-button size="small" @click="editTask(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination">
              <el-pagination
                v-model:current-page="currentPage_num"
                v-model:page-size="pageSize"
                :page-sizes="[20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalTasks"
              />
            </div>
          </div>
        </div>

        <!-- 其他页面占位 -->
        <div v-else class="page placeholder-page">
          <h1>{{ get_pageTitle }}</h1>
          <p>页面开发中...</p>
        </div>
      </main>
    </div>
  </div>

  <script src="js/app.js"></script>
</body>
</html>
```

---

## 3. css/style.css（样式）

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f5f7fa;
  color: #333;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-weight: bold;
}

.main-container {
  display: flex;
  height: calc(100vh - 60px);
}

.sidebar {
  width: 220px;
  background: white;
  border-right: 1px solid #e8e8e8;
  padding: 20px 0;
  overflow-y: auto;
}

.nav-item {
  padding: 12px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #666;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: #f5f7fa;
  color: #667eea;
}

.nav-item.active {
  background: #f0f2ff;
  color: #667eea;
  border-left-color: #667eea;
  font-weight: 500;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.page-header {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.stat-label {
  color: #999;
  font-size: 14px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.stat-value.primary {
  color: #667eea;
}

.stat-value.warning {
  color: #fa8c16;
}

.stat-value.success {
  color: #52c41a;
}

.countdown-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.countdown-timer {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

.countdown-item {
  background: rgba(255,255,255,0.2);
  padding: 12px 20px;
  border-radius: 8px;
  min-width: 80px;
}

.countdown-number {
  font-size: 32px;
  font-weight: bold;
  display: block;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.action-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
  text-align: center;
}

.action-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102,126,234,0.15);
}

.action-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  font-size: 24px;
}

.data-table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
}

.table-toolbar {
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

## 4. js/app.js（主逻辑）

```javascript
const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    // 状态
    const currentPage = ref('home');
    const userName = ref('用户');
    const searchQuery = ref('');
    const tasks = ref([]);
    const stats = ref({
      totalDuration: 328,
      todayDuration: 96,
      pendingTasks: 42,
      daysToExam: 26
    });
    const examDate = ref('2026/03/14 09:00');
    const countdown = ref({
      days: 26,
      hours: 14,
      minutes: 32,
      seconds: 45
    });

    // 导航菜单
    const navItems = [
      { key: 'home', title: '首页', icon: '🏠' },
      { key: 'exam', title: '考试情况', icon: '📅' },
      { key: 'practice', title: '刷题记录', icon: '📝' },
      { key: 'xingce', title: '行测职测', icon: '📚' },
      { key: 'shenlun', title: '申论综应', icon: '✍️' },
      { key: 'community', title: '社区', icon: '💬' },
      { key: 'plan', title: '计划和课程', icon: '📋' },
      { key: 'profile', title: '我的', icon: '⚙️' }
    ];

    // 计算属性
    const filteredTasks = computed(() => {
      if (!searchQuery.value) return tasks.value;
      return tasks.value.filter(task => 
        task.task_name.includes(searchQuery.value)
      );
    });

    const totalTasks = computed(() => tasks.value.length);
    const currentPage_num = ref(1);
    const pageSize = ref(20);

    // 方法
    const navigateTo = (pageKey) => {
      currentPage.value = pageKey;
    };

    const getStatusType = (status) => {
      const map = {
        '未开始': 'info',
        '进行中': 'warning',
        '已完成': 'success'
      };
      return map[status] || 'info';
    };

    const getTaskActionText = (status) => {
      const map = {
        '未开始': '开始计时',
        '进行中': '继续',
        '已完成': '查看'
      };
      return map[status] || '编辑';
    };

    const handleTaskAction = (task) => {
      console.log('Task action:', task);
      // TODO: 实现任务操作
    };

    const editTask = (task) => {
      console.log('Edit task:', task);
      // TODO: 实现编辑任务
    };

    const showAddTaskModal = () => {
      console.log('Show add task modal');
      // TODO: 显示添加任务对话框
    };

    const showAddExamModal = () => {
      console.log('Show add exam modal');
      // TODO: 显示添加考试对话框
    };

    const showWrongQuestionModal = () => {
      console.log('Show wrong question modal');
      // TODO: 显示添加错题对话框
    };

    const filterTasks = () => {
      console.log('Filter tasks');
    };

    const groupTasks = () => {
      console.log('Group tasks');
    };

    const sortTasks = () => {
      console.log('Sort tasks');
    };

    const getPageTitle = () => {
      const titles = {
        home: '首页',
        exam: '考试情况',
        practice: '刷题记录',
        xingce: '行测职测',
        shenlun: '申论综应',
        community: '社区',
        plan: '计划和课程',
        profile: '我的'
      };
      return titles[currentPage.value];
    };

    // 生命周期
    onMounted(async () => {
      // 加载用户信息
      await loadUserInfo();
      // 加载任务数据
      await loadTasks();
      // 启动倒计时
      startCountdown();
    });

    const loadUserInfo = async () => {
      // TODO: 调用飞书 API 获取用户信息
      userName.value = '择风';
    };

    const loadTasks = async () => {
      // TODO: 调用飞书 API 加载任务数据
      tasks.value = [
        {
          task_name: '逻辑：花生逻辑 600 题 1 套',
          task_type: '逻辑推理',
          expected_finish_time: '2026/02/23',
          start_time: '2026/02/23 10:00',
          duration_minutes: 17,
          status: '未开始',
          learner: '择风'
        },
        // ... 更多示例数据
      ];
    };

    const startCountdown = () => {
      setInterval(() => {
        const now = new Date();
        const target = new Date('2026-03-14T09:00:00');
        const diff = target - now;

        if (diff > 0) {
          countdown.value = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
          };
        }
      }, 1000);
    };

    return {
      currentPage,
      userName,
      searchQuery,
      tasks,
      stats,
      examDate,
      countdown,
      navItems,
      filteredTasks,
      totalTasks,
      currentPage_num,
      pageSize,
      navigateTo,
      getStatusType,
      getTaskActionText,
      handleTaskAction,
      editTask,
      showAddTaskModal,
      showAddExamModal,
      showWrongQuestionModal,
      filterTasks,
      groupTasks,
      sortTasks,
      getPageTitle
    };
  }
}).use(ElementPlus).mount('#app');
```

---

## 部署说明

### 1. 部署到飞书轻应用

1. 将代码打包上传到可访问的 HTTPS 服务器
2. 在飞书开放平台配置应用主页 URL
3. 配置导航菜单
4. 发布应用

### 2. 本地开发

```bash
# 安装依赖
npm install -g http-server

# 启动本地服务器
http-server . -p 8080

# 访问 http://localhost:8080
```

---

**下一步：** 对接飞书多维表格 API，实现真实数据交互！
