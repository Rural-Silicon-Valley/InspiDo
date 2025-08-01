// 任务功能模块

// DOM元素
let tasksList;
let addTaskBtn;
let taskInputModal;
let taskInputField;
let saveTaskBtn;
let cancelTaskBtn;

// 任务数据
let currentTasks = [];
let taskIcons = [
    { name: 'coffee', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>' },
    { name: 'smile', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>' },
    { name: 'heart', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>' },
    { name: 'book', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>' },
    { name: 'run', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v6h6"></path><path d="M13 11l2-3 2 3 4-4"></path><circle cx="17" cy="18" r="5"></circle><path d="M15 18h2"></path></svg>' },
    { name: 'music', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>' },
    { name: 'moon', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>' }
];

// 积极暗示语句
let positiveAffirmations = [
    "对自己说：我的每一天都丰盛",
    "今天我选择快乐和感恩",
    "我值得被爱和尊重",
    "我的内心充满平静和力量",
    "我接纳自己的不完美",
    "今天我要做一件让自己开心的事",
    "我相信一切都会好起来的",
    "我对自己有耐心和 compassion",
    "我的存在本身就是有价值的",
    "今天我要给自己一个微笑"
];

// 初始化任务功能
function initTasks() {
    // 获取DOM元素
    tasksList = document.getElementById('tasks-list');
    addTaskBtn = document.getElementById('add-task');
    taskInputModal = document.createElement('div');
    taskInputModal.classList.add('task-input-modal');
    taskInputModal.innerHTML = `
        <div class="task-input-content">
            <h3 class="task-input-title">添加今日小事</h3>
            <textarea class="task-input-field" placeholder="写下你今天想完成的小事..."></textarea>
            <div class="task-input-buttons">
                <button class="task-input-btn cancel-btn">取消</button>
                <button class="task-input-btn save-btn">保存</button>
            </div>
        </div>
    `;
    document.body.appendChild(taskInputModal);

    taskInputField = taskInputModal.querySelector('.task-input-field');
    saveTaskBtn = taskInputModal.querySelector('.save-btn');
    cancelTaskBtn = taskInputModal.querySelector('.cancel-btn');

    // 绑定事件
    addTaskBtn.addEventListener('click', openTaskInputModal);
    saveTaskBtn.addEventListener('click', saveNewTask);
    cancelTaskBtn.addEventListener('click', closeTaskInputModal);

    // 为首次使用的用户添加默认任务
    checkAndAddDefaultTasks();
}

// 打开任务输入弹窗
function openTaskInputModal() {
    taskInputField.value = '';
    taskInputModal.classList.add('active');
    taskInputField.focus();
    playSound('page-turn');
}

// 关闭任务输入弹窗
function closeTaskInputModal() {
    taskInputModal.classList.remove('active');
    playSound('page-turn');
}

// 保存新任务
function saveNewTask() {
    const taskText = taskInputField.value.trim();
    if (!taskText) return;

    // 创建新任务
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        icon: getRandomTaskIcon()
    };

    // 添加到当前任务列表
    currentTasks.push(newTask);

    // 保存到数据中
    saveTasksForDate(window.selectedDate, currentTasks);

    // 更新UI
    renderTasks();

    // 关闭弹窗
    closeTaskInputModal();

    // 播放音效
    playSound('check');
}

// 加载特定日期的任务
function loadTasksForDate(date) {
    if (!date) return;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateKey = `${year}-${month}-${day}`;

    // 从数据中获取任务
    currentTasks = window.tasksData[dateKey] || [];

    // 渲染任务
    renderTasks();
}

// 渲染任务列表
function renderTasks() {
    // 清空任务列表
    tasksList.innerHTML = '';

    // 检查是否有任务
    if (currentTasks.length === 0) {
        // 显示空状态
        const emptyState = document.createElement('div');
        emptyState.classList.add('empty-state');
        emptyState.innerHTML = `
            <div class="empty-illustration"></div>
            <p class="empty-text">今天还没有添加小事，点击下方按钮添加吧～</p>
        `;
        tasksList.appendChild(emptyState);
        return;
    }

    // 渲染每个任务
    currentTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        // 任务复选框
        const checkbox = document.createElement('div');
        checkbox.classList.add('task-checkbox');
        if (task.completed) {
            checkbox.classList.add('checked');
        }
        checkbox.addEventListener('click', () => toggleTaskCompletion(task.id));

        // 任务内容
        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');

        const taskText = document.createElement('div');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;

        // 任务图标
        const taskIcon = document.createElement('div');
        taskIcon.classList.add('task-icon');
        taskIcon.innerHTML = task.icon;

        // 组装任务项
        taskContent.appendChild(taskText);
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(taskIcon);

        tasksList.appendChild(taskItem);
    });
}

// 切换任务完成状态
function toggleTaskCompletion(taskId) {
    const taskIndex = currentTasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;

    // 切换完成状态
    currentTasks[taskIndex].completed = !currentTasks[taskIndex].completed;

    // 保存到数据中
    saveTasksForDate(window.selectedDate, currentTasks);

    // 更新UI
    renderTasks();

    // 更新日历
    window.renderCalendar();

    // 播放音效
    playSound('check');

    // 如果任务已完成，显示成就动画
    if (currentTasks[taskIndex].completed) {
        showAchievementAnimation();
    }
}

// 保存特定日期的任务
function saveTasksForDate(date, tasks) {
    if (!date) return;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateKey = `${year}-${month}-${day}`;

    // 保存到数据中
    window.tasksData[dateKey] = tasks;

    // 保存到本地存储
    window.saveData();
}

// 获取随机任务图标
function getRandomTaskIcon() {
    const randomIndex = Math.floor(Math.random() * taskIcons.length);
    return taskIcons[randomIndex].svg;
}

// 显示成就动画
function showAchievementAnimation() {
    const achievementEl = document.createElement('div');
    achievementEl.classList.add('achievement-animation');

    // 随机选择一个成就图标
    const icons = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="achievement-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>', // 对勾
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="achievement-icon"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path></svg>', // 花
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="achievement-icon"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>', // 笑脸
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="achievement-icon"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>' // 星星
    ];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    achievementEl.innerHTML = randomIcon;

    // 添加到页面
    document.body.appendChild(achievementEl);

    // 动画结束后移除
    setTimeout(() => {
        document.body.removeChild(achievementEl);
    }, 1500);
}

// 检查并添加默认任务
function checkAndAddDefaultTasks() {
    // 检查今天是否已有任务
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dateKey = `${year}-${month}-${day}`;

    if (!window.tasksData[dateKey] || window.tasksData[dateKey].length === 0) {
        // 没有任务，添加随机积极暗示
        const randomAffirmation = positiveAffirmations[Math.floor(Math.random() * positiveAffirmations.length)];
        const defaultTask = {
            id: Date.now(),
            text: randomAffirmation,
            completed: false,
            icon: getRandomTaskIcon()
        };

        // 保存到数据中
        window.tasksData[dateKey] = [defaultTask];
        window.saveData();

        // 如果当前查看的是今天，更新UI
        if (window.selectedDate && window.selectedDate.toDateString() === today.toDateString()) {
            loadTasksForDate(today);
        }
    }
}

// 导出函数供其他模块使用
window.initTasks = initTasks;
window.loadTasksForDate = loadTasksForDate;
window.saveTasksForDate = saveTasksForDate;
window.toggleTaskCompletion = toggleTaskCompletion;