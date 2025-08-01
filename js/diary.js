// 日记功能模块

// DOM元素
let diaryContent;
let drawingCanvas;
let stickersPanel;
let textToolBtn;
let drawToolBtn;
let stickerToolBtn;
let saveDiaryBtn;
let ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = '#5D4954';
let currentLineWidth = 2;

// 贴纸数据
let stickers = [
    { name: 'heart', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F8E9E9" stroke="#5D4954" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>' },
    { name: 'star', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFF3D6" stroke="#5D4954" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path></svg>' },
    { name: 'flower', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D1F5E2" stroke="#5D4954" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>' },
    { name: 'coffee', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F8E9E9" stroke="#5D4954" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>' },
    { name: 'smile', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFF3D6" stroke="#5D4954" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>' },
    { name: 'moon', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D1F5E2" stroke="#5D4954" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>' },
    { name: 'sun', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFF3D6" stroke="#5D4954" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>' },
    { name: 'dog', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F8E9E9" stroke="#5D4954" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M18 18.5c0-.53-.08-1.05-.23-1.55l1.46-1.46a2 2 0 0 0 .59-1.41V13a6 6 0 0 0-6-6h-2a6 6 0 0 0-6 6v1.53a2 2 0 0 0 .59 1.41l1.46 1.46c-.15.5-.23 1.02-.23 1.55v3h12v-3z"></path><circle cx="12" cy="11" r="2"></circle><path d="M14 15.5a2 2 0 1 1-4 0"></path></svg>' }
];

// 初始化日记功能
function initDiary() {
    // 获取DOM元素
    diaryContent = document.getElementById('diary-content');
    drawingCanvas = document.getElementById('drawing-canvas');
    stickersPanel = document.getElementById('stickers-panel');
    textToolBtn = document.getElementById('text-tool');
    drawToolBtn = document.getElementById('draw-tool');
    stickerToolBtn = document.getElementById('sticker-tool');
    saveDiaryBtn = document.getElementById('save-diary');

    // 设置画布
    ctx = drawingCanvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 初始化贴纸面板
    initStickersPanel();

    // 绑定事件
    textToolBtn.addEventListener('click', () => switchTool('text'));
    drawToolBtn.addEventListener('click', () => switchTool('draw'));
    stickerToolBtn.addEventListener('click', () => switchTool('sticker'));
    saveDiaryBtn.addEventListener('click', saveDiary);

    // 绑定绘画事件
    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mousemove', draw);
    drawingCanvas.addEventListener('mouseup', stopDrawing);
    drawingCanvas.addEventListener('mouseout', stopDrawing);

    // 移动端触摸事件
    drawingCanvas.addEventListener('touchstart', startDrawing, { passive: false });
    drawingCanvas.addEventListener('touchmove', draw, { passive: false });
    drawingCanvas.addEventListener('touchend', stopDrawing);
}

// 切换工具
function switchTool(tool) {
    // 重置所有工具按钮
    textToolBtn.classList.remove('active');
    drawToolBtn.classList.remove('active');
    stickerToolBtn.classList.remove('active');

    // 隐藏所有工具面板
    diaryContent.classList.add('hidden');
    drawingCanvas.classList.add('hidden');
    stickersPanel.classList.add('hidden');

    // 激活当前工具
    switch(tool) {
        case 'text':
            textToolBtn.classList.add('active');
            diaryContent.classList.remove('hidden');
            break;
        case 'draw':
            drawToolBtn.classList.add('active');
            drawingCanvas.classList.remove('hidden');
            break;
        case 'sticker':
            stickerToolBtn.classList.add('active');
            stickersPanel.classList.remove('hidden');
            break;
    }

    // 播放音效
    playSound('page-turn');
}

// 调整画布大小
function resizeCanvas() {
    const rect = drawingCanvas.getBoundingClientRect();
    drawingCanvas.width = rect.width;
    drawingCanvas.height = rect.height;
}

// 开始绘画
function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getCoordinates(e);
}

// 绘画
function draw(e) {
    if (!isDrawing) return;

    const [x, y] = getCoordinates(e);

    // 绘制线条
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentLineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    [lastX, lastY] = [x, y];

    // 阻止触摸事件默认行为
    if (e.type === 'touchmove') {
        e.preventDefault();
    }
}

// 停止绘画
function stopDrawing() {
    isDrawing = false;
}

// 获取坐标
function getCoordinates(e) {
    const rect = drawingCanvas.getBoundingClientRect();
    if (e.type.includes('mouse')) {
        return [
            e.clientX - rect.left,
            e.clientY - rect.top
        ];
    } else if (e.type.includes('touch')) {
        return [
            e.touches[0].clientX - rect.left,
            e.touches[0].clientY - rect.top
        ];
    }
    return [0, 0];
}

// 初始化贴纸面板
function initStickersPanel() {
    stickersPanel.innerHTML = '';

    // 添加颜色选择器
    const colorPicker = document.createElement('div');
    colorPicker.classList.add('color-picker');
    colorPicker.innerHTML = `
        <div class="color-option active" style="background-color: #5D4954;" data-color="#5D4954"></div>
        <div class="color-option" style="background-color: #F87171;" data-color="#F87171"></div>
        <div class="color-option" style="background-color: #60A5FA;" data-color="#60A5FA"></div>
        <div class="color-option" style="background-color: #34D399;" data-color="#34D399"></div>
        <div class="color-option" style="background-color: #FBBF24;" data-color="#FBBF24"></div>
    `;
    stickersPanel.appendChild(colorPicker);

    // 颜色选择事件
    const colorOptions = colorPicker.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            currentColor = option.dataset.color;
        });
    });

    // 添加线条宽度选择器
    const lineWidth = document.createElement('div');
    lineWidth.classList.add('line-width');
    lineWidth.innerHTML = `
        <div class="width-option width-1 active" data-width="2"></div>
        <div class="width-option width-2" data-width="4"></div>
        <div class="width-option width-3" data-width="6"></div>
    `;
    stickersPanel.appendChild(lineWidth);

    // 线条宽度选择事件
    const widthOptions = lineWidth.querySelectorAll('.width-option');
    widthOptions.forEach(option => {
        option.addEventListener('click', () => {
            widthOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            currentLineWidth = parseInt(option.dataset.width);
        });
    });

    // 添加清除画布按钮
    const clearCanvasBtn = document.createElement('button');
    clearCanvasBtn.classList.add('clear-canvas');
    clearCanvasBtn.textContent = '清除画布';
    clearCanvasBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        playSound('page-turn');
    });
    stickersPanel.appendChild(clearCanvasBtn);

    // 添加贴纸
    stickers.forEach(sticker => {
        const stickerItem = document.createElement('div');
        stickerItem.classList.add('sticker-item');
        stickerItem.innerHTML = sticker.svg;
        stickerItem.addEventListener('click', () => {
            // 在画布上添加贴纸
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, drawingCanvas.width / 2 - 20, drawingCanvas.height / 2 - 20, 40, 40);
            };
            // 将SVG转换为Data URL
            const svgData = new XMLSerializer().serializeToString(stickerItem.querySelector('svg'));
            const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
            img.src = url;
            playSound('check');
        });
        stickersPanel.appendChild(stickerItem);
    });
}

// 加载特定日期的日记
function loadDiaryForDate(date) {
    if (!date) return;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateKey = `${year}-${month}-${day}`;

    // 从数据中获取日记
    const diary = window.diaryData[dateKey] || { text: '', drawing: '' };

    // 加载文本内容
    diaryContent.value = diary.text;

    // 加载绘画内容
    if (diary.drawing) {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
        img.src = diary.drawing;
    } else {
        ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    }

    // 默认显示文本工具
    switchTool('text');
}

// 保存日记
function saveDiary() {
    if (!window.selectedDate) return;

    const year = window.selectedDate.getFullYear();
    const month = window.selectedDate.getMonth() + 1;
    const day = window.selectedDate.getDate();
    const dateKey = `${year}-${month}-${day}`;

    // 获取日记内容
    const diaryText = diaryContent.value.trim();
    const drawingData = drawingCanvas.toDataURL();

    // 保存到数据中
    window.diaryData[dateKey] = {
        text: diaryText,
        drawing: drawingData
    };

    // 保存到本地存储
    window.saveData();

    // 显示保存成功动画
    saveDiaryBtn.classList.add('saved');
    setTimeout(() => {
        saveDiaryBtn.classList.remove('saved');
    }, 1500);

    // 播放音效
    playSound('save');
}

// 导出函数供其他模块使用
window.initDiary = initDiary;
window.loadDiaryForDate = loadDiaryForDate;
window.saveDiary = saveDiary;