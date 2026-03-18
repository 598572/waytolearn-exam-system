// 飞书 API 配置
const FEISHU_CONFIG = {
  app_id: 'cli_a930a522f6b89cbd',
  app_secret: 'GGWN38gJJkw1Erqyy9Mbvdw5OoKHxxDg',
  app_token: 'EvRGba5bHatnuks5xCRcsaX7nKb',
  table_id: 'tblZ8BlYX8kTpJQ1'
};

let access_token = '';
let token_expire_time = 0;

// 获取访问令牌
async function getAccessToken() {
  const now = Date.now() / 1000;
  if (access_token && now < token_expire_time) {
    return access_token;
  }

  try {
    // 通过后端代理获取 token（避免前端暴露密钥）
    const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: FEISHU_CONFIG.app_id,
        app_secret: FEISHU_CONFIG.app_secret
      })
    });

    const data = await response.json();
    if (data.code === 0) {
      access_token = data.tenant_access_token;
      token_expire_time = now + data.expire - 60; // 提前 60 秒过期
      return access_token;
    } else {
      console.error('获取 token 失败:', data);
      return null;
    }
  } catch (error) {
    console.error('获取 token 错误:', error);
    return null;
  }
}

// 获取任务列表
async function getTasks() {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const response = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_CONFIG.app_token}/tables/${FEISHU_CONFIG.table_id}/records`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (data.code === 0) {
      return data.data.items.map(item => ({
        id: item.record_id,
        task_name: item.fields['任务名'] || '',
        task_type: item.fields['任务类型'] || '',
        expected_finish_time: item.fields['预计完成时间'] || '',
        start_time: item.fields['开始时间'] || '',
        duration_minutes: item.fields['学习时长（分钟）'] || 0,
        status: item.fields['状态'] || '未开始',
        learner: item.fields['学习人'] || ''
      }));
    } else {
      console.error('获取任务失败:', data);
      return [];
    }
  } catch (error) {
    console.error('获取任务错误:', error);
    return [];
  }
}

// 添加任务
async function addTask(task) {
  const token = await getAccessToken();
  if (!token) return false;

  try {
    const response = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_CONFIG.app_token}/tables/${FEISHU_CONFIG.table_id}/records`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          '任务名': task.task_name,
          '任务类型': task.task_type,
          '预计完成时间': task.expected_finish_time,
          '开始时间': task.start_time,
          '状态': task.status,
          '学习人': task.learner
        }
      })
    });

    const data = await response.json();
    return data.code === 0;
  } catch (error) {
    console.error('添加任务错误:', error);
    return false;
  }
}

// 更新任务
async function updateTask(recordId, fields) {
  const token = await getAccessToken();
  if (!token) return false;

  try {
    const response = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_CONFIG.app_token}/tables/${FEISHU_CONFIG.table_id}/records/${recordId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });

    const data = await response.json();
    return data.code === 0;
  } catch (error) {
    console.error('更新任务错误:', error);
    return false;
  }
}

// 删除任务
async function deleteTask(recordId) {
  const token = await getAccessToken();
  if (!token) return false;

  try {
    const response = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_CONFIG.app_token}/tables/${FEISHU_CONFIG.table_id}/records/${recordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return data.code === 0;
  } catch (error) {
    console.error('删除任务错误:', error);
    return false;
  }
}

// 开始计时
async function startTimer(recordId) {
  const now = new Date();
  const startTime = now.toLocaleString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  }).replace(/\//g, '-');

  return await updateTask(recordId, {
    '状态': '进行中',
    '开始时间': startTime
  });
}

// 完成计时
async function completeTimer(recordId, duration) {
  const now = new Date();
  const finishTime = now.toLocaleString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  }).replace(/\//g, '-');

  return await updateTask(recordId, {
    '状态': '已完成',
    '实际完成时间': finishTime,
    '学习时长（分钟）': duration
  });
}
