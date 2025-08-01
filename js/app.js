// 应用主入口文件

// DOM元素
const splashScreen = document.getElementById('splash-screen');
const appMain = document.getElementById('app-main');
const splashIllustration = document.getElementById('splash-illustration');
const themeToggle = document.getElementById('theme-toggle');

// 应用初始化
function initApp() {
    // 显示启动页动画
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            appMain.classList.remove('hidden');
            // 初始化日历
            initCalendar();
            // 初始化任务
            initTasks();
            // 初始化日记
            initDiary();
            // 初始化音效
            initSounds();
            // 初始化动画
            initAnimations();
            // 设置季节主题
            setSeasonTheme();
        }, 1000);
    }, 2000);

    // 主题切换按钮事件
    themeToggle.addEventListener('click', toggleTheme);

    // 日期详情关闭按钮事件
    const closeDetail = document.getElementById('close-detail');
    closeDetail.addEventListener('click', () => {
        const dateDetail = document.getElementById('date-detail');
        dateDetail.classList.add('hidden');
        playSound('page-turn');
    });
}

// 切换主题
function toggleTheme() {
    const body = document.body;
    const currentSeason = body.dataset.season || 'spring';
    const seasons = ['spring', 'summer', 'autumn', 'winter'];
    const currentIndex = seasons.indexOf(currentSeason);
    const nextIndex = (currentIndex + 1) % seasons.length;
    const nextSeason = seasons[nextIndex];

    body.dataset.season = nextSeason;
    body.classList.remove(`season-${currentSeason}`);
    body.classList.add(`season-${nextSeason}`);

    // 更新主题图标
    updateThemeIcon(nextSeason);
    playSound('page-turn');
}

// 更新主题图标
function updateThemeIcon(season) {
    const themeIcon = themeToggle.querySelector('svg');
    let iconPath = '';

    switch(season) {
        case 'spring':
            iconPath = 'M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34';
            break;
        case 'summer':
            iconPath = 'M12 3V5M12 19V21M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M2 12H4M20 12H22M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z M12 20C9.79086 20 8 18.2091 8 16C8 13.7909 9.79086 12 12 12C14.2091 12 16 13.7909 16 16C16 18.2091 14.2091 20 12 20Z';
            break;
        case 'autumn':
            iconPath = 'M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z M7 18C7 16.8954 7.89543 16 9 16H15C16.1046 16 17 16.8954 17 18V20C17 21.1046 16.1046 22 15 22H9C7.89543 22 7 21.1046 7 20V18Z M12 2V5M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M2 12H5M19 12H22M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22';
            break;
        case 'winter':
            iconPath = 'M7 14H17M7 10H17M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z M12 6V8M12 16V18';
            break;
    }

    themeIcon.querySelector('path').setAttribute('d', iconPath);
}

// 设置季节主题
function setSeasonTheme() {
    const body = document.body;
    const month = new Date().getMonth();
    let season = 'spring';

    if (month >= 2 && month <= 4) { // 3-5月
        season = 'spring';
    } else if (month >= 5 && month <= 7) { // 6-8月
        season = 'summer';
    } else if (month >= 8 && month <= 10) { // 9-11月
        season = 'autumn';
    } else { // 12-2月
        season = 'winter';
    }

    body.dataset.season = season;
    body.classList.add(`season-${season}`);
    updateThemeIcon(season);
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);

// 导出函数供其他模块使用
window.initApp = initApp;
window.toggleTheme = toggleTheme;
window.setSeasonTheme = setSeasonTheme;