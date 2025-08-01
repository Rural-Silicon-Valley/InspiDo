// 日历功能模块

// DOM元素
let calendarGrid;
let currentMonthEl;
let prevMonthBtn;
let nextMonthBtn;
let dateDetail;
let detailDateEl;

// 日期数据
let currentDate = new Date();
let selectedDate = null;
let tasksData = {}; // 存储每天的任务
let diaryData = {}; // 存储每天的日记

// 初始化日历
function initCalendar() {
    // 获取DOM元素
    calendarGrid = document.getElementById('calendar-grid');
    currentMonthEl = document.getElementById('current-month');
    prevMonthBtn = document.getElementById('prev-month');
    nextMonthBtn = document.getElementById('next-month');
    dateDetail = document.getElementById('date-detail');
    detailDateEl = document.getElementById('detail-date');
    const closeDetailBtn = document.getElementById('close-detail');

    // 绑定事件
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
        playSound('page-turn');
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
        playSound('page-turn');
    });

    closeDetailBtn.addEventListener('click', closeDateDetail);

    // 从本地存储加载数据
    loadData();

    // 渲染日历
    renderCalendar();
}

// 渲染日历
function renderCalendar() {
    // 更新月份显示
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    currentMonthEl.textContent = `${year}年${month + 1}月`;

    // 清空日历网格
    calendarGrid.innerHTML = '';

    // 获取当月第一天是星期几
    const firstDay = new Date(year, month, 1).getDay();

    // 获取当月的天数
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 添加上个月的占位天数
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        calendarGrid.appendChild(emptyDay);
    }

    // 添加当月的天数
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('calendar-day');

        // 检查是否是今天
        const today = new Date();
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayEl.classList.add('today');
        }

        // 检查是否有任务
        const dateKey = `${year}-${month + 1}-${i}`;
        if (tasksData[dateKey] && tasksData[dateKey].length > 0) {
            dayEl.classList.add('has-task');

            // 检查是否所有任务都已完成
            const allCompleted = tasksData[dateKey].every(task => task.completed);
            if (allCompleted) {
                dayEl.classList.add('completed-task');
            }
        }

        // 添加日期数字
        const dayNumber = document.createElement('div');
        dayNumber.classList.add('day-number');
        dayNumber.textContent = i;
        dayEl.appendChild(dayNumber);

        // 如果有任务，添加任务图标
        if (tasksData[dateKey] && tasksData[dateKey].length > 0) {
            const taskIcon = document.createElement('div');
            taskIcon.classList.add('day-icon');
            // 随机选择一个任务图标
            const randomIcon = getRandomTaskIcon();
            taskIcon.innerHTML = randomIcon;
            dayEl.appendChild(taskIcon);
        }

        // 添加点击事件
        dayEl.addEventListener('click', () => {
            selectedDate = new Date(year, month, i);
            openDateDetail();
        });

        calendarGrid.appendChild(dayEl);
    }
}

// 关闭日期详情
function closeDateDetail() {
    // 保存日记
    if (window.saveDiary) {
        window.saveDiary();
    }

    // 保存任务（如果有未保存的更改）
    window.saveData();

    // 隐藏面板
    dateDetail.classList.add('hidden');
    dateDetail.style.display = 'none';

    // 播放音效
    try {
        playSound('page-turn');
    } catch (e) {
        console.error('音效播放失败:', e);
    }
}

// 打开日期详情
function openDateDetail() {
    if (!selectedDate) return;

    // 更新详情标题
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    detailDateEl.textContent = `${year}年${month}月${day}日`;

    // 加载任务
    loadTasksForDate(selectedDate);

    // 加载日记
    loadDiaryForDate(selectedDate);

    // 先显示面板，再播放音效
    dateDetail.classList.remove('hidden');
    // 确保面板可见性
    dateDetail.style.display = 'block';
    dateDetail.style.opacity = '1';
    // 音效播放错误处理
    try {
        playSound('page-turn');
    } catch (e) {
        console.error('音效播放失败:', e);
    }
}

// 获取随机任务图标
function getRandomTaskIcon() {
    const icons = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>', // 咖啡杯
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>', // 花
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>', // 太阳
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>', // 树
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>' // 咖啡杯
    ];
    return icons[Math.floor(Math.random() * icons.length)];
}

// 加载数据
function loadData() {
    // 从localStorage加载任务数据
    const savedTasks = localStorage.getItem('loveHealTasks');
    if (savedTasks) {
        tasksData = JSON.parse(savedTasks);
    }

    // 从localStorage加载日记数据
    const savedDiary = localStorage.getItem('loveHealDiary');
    if (savedDiary) {
        diaryData = JSON.parse(savedDiary);
    }
}

// 保存数据
function saveData() {
    localStorage.setItem('loveHealTasks', JSON.stringify(tasksData));
    localStorage.setItem('loveHealDiary', JSON.stringify(diaryData));
}

// 导出数据和函数供其他模块使用
window.tasksData = tasksData;
window.diaryData = diaryData;
window.initCalendar = initCalendar;
window.renderCalendar = renderCalendar;
window.openDateDetail = openDateDetail;
window.loadData = loadData;
window.saveData = saveData;
window.selectedDate = selectedDate;