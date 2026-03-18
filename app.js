const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    const currentPage = ref('home');
    const userName = ref('择风');
    const searchQuery = ref('');
    const examDate = ref('2026/03/14 09:00');
    
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

    const stats = ref({
      totalDuration: 328,
      todayDuration: 96,
      pendingTasks: 42,
      daysToExam: 26
    });

    const countdown = ref({ days: 26, hours: 14, minutes: 32, seconds: 45 });

    const tasks = ref([
      { id: 1, task_name: '逻辑：花生逻辑 600 题 1 套', task_type: '逻辑推理', expected_finish_time: '2026/02/23', start_time: '2026/02/23 10:00', duration_minutes: 17, status: '未开始', learner: '择风' },
      { id: 2, task_name: '言语：花生 600 题 1 套', task_type: '言语理解', expected_finish_time: '2026/02/23', start_time: '2026/02/23 14:00', duration_minutes: 96, status: '未开始', learner: '择风' },
      { id: 3, task_name: '资料：刷题男孩毛娃儿刷题课 19、20', task_type: '资料分析', expected_finish_time: '2026/02/23', start_time: '2026/02/23 16:00', duration_minutes: 66, status: '未开始', learner: '择风' },
      { id: 4, task_name: '言语：花生 600 题 1 套', task_type: '言语理解', expected_finish_time: '2026/02/21', start_time: '2026/02/21 09:00', duration_minutes: 54, status: '进行中', learner: '罗佳' },
      { id: 5, task_name: '资料：刷题男孩毛娃儿刷题课 17、18', task_type: '资料分析', expected_finish_time: '2026/02/21', start_time: '2026/02/21 14:00', duration_minutes: 58, status: '已完成', learner: '罗佳' },
      { id: 6, task_name: '小马哥申论 16（大作文 2）', task_type: '申论', expected_finish_time: '2026/02/20', start_time: '2026/02/20 10:00', duration_minutes: 120, status: '已完成', learner: '择风' },
      { id: 7, task_name: '言语：郭熙 100 题第 10 节', task_type: '言语理解', expected_finish_time: '2026/02/17', start_time: '2026/02/17 09:00', duration_minutes: 45, status: '已完成', learner: '罗佳' },
      { id: 8, task_name: '资料：刷题男孩毛娃儿刷题课 9、10', task_type: '资料分析', expected_finish_time: '2026/02/17', start_time: '2026/02/17 14:00', duration_minutes: 63, status: '已完成', learner: '择风' }
    ]);

    const filteredTasks = computed(() => {
      if (!searchQuery.value) return tasks.value;
      return tasks.value.filter(task => task.task_name.includes(searchQuery.value));
    });

    const getPageTitle = computed(() => {
      const titles = { home: '首页', exam: '考试情况', practice: '刷题记录', xingce: '行测职测', shenlun: '申论综应', community: '社区', plan: '计划和课程', profile: '我的' };
      return titles[currentPage.value];
    });

    const getStatusClass = (status) => {
      const map = { '未开始': 'pending', '进行中': 'progress', '已完成': 'completed' };
      return map[status] || 'pending';
    };

    const getActionText = (status) => {
      const map = { '未开始': '开始计时', '进行中': '继续', '已完成': '查看' };
      return map[status] || '编辑';
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

    onMounted(() => {
      startCountdown();
    });

    return { currentPage, userName, searchQuery, tasks, stats, examDate, countdown, navItems, filteredTasks, getPageTitle, getStatusClass, getActionText };
  }
}).mount('#app');
