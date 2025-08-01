// 动画效果模块

// 全局动画函数
function animateElement(element, animationClass, duration = 500) {
    return new Promise((resolve) => {
        // 添加动画类
        element.classList.add(animationClass);

        // 动画结束后移除类
        setTimeout(() => {
            element.classList.remove(animationClass);
            resolve();
        }, duration);
    });
}

// 页面载入动画
function pageLoadAnimation() {
    const appContainer = document.querySelector('.app-container');
    appContainer.style.opacity = '0';
    appContainer.style.transform = 'translateY(20px)';
    appContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    setTimeout(() => {
        appContainer.style.opacity = '1';
        appContainer.style.transform = 'translateY(0)';
    }, 100);
}

// 元素淡入动画
function fadeIn(element, duration = 500) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;

    return new Promise((resolve) => {
        setTimeout(() => {
            element.style.opacity = '1';
            setTimeout(resolve, duration);
        }, 10);
    });
}

// 元素淡出动画
function fadeOut(element, duration = 500) {
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ease`;

    return new Promise((resolve) => {
        setTimeout(() => {
            element.style.opacity = '0';
            setTimeout(resolve, duration);
        }, 10);
    });
}

// 元素弹跳动画
function bounce(element, duration = 1000) {
    element.style.transform = 'translateY(0)';
    element.style.transition = `transform ${duration}ms ease`;

    // 弹跳动画关键帧
    const keyframes = [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-10px)' },
        { transform: 'translateY(0)' },
        { transform: 'translateY(-5px)' },
        { transform: 'translateY(0)' }
    ];

    return new Promise((resolve) => {
        let startTime;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // 计算当前关键帧
            let frameIndex = Math.floor(percentage * (keyframes.length - 1));
            const nextFrameIndex = Math.min(frameIndex + 1, keyframes.length - 1);
            const frameProgress = (percentage * (keyframes.length - 1)) % 1;

            // 插值计算当前变换
            const currentFrame = keyframes[frameIndex];
            const nextFrame = keyframes[nextFrameIndex];
            const translateY = currentFrame.transform.split('(')[1].split(')')[0];
            const nextTranslateY = nextFrame.transform.split('(')[1].split(')')[0];
            const interpolatedTranslateY = parseFloat(translateY) + (parseFloat(nextTranslateY) - parseFloat(translateY)) * frameProgress;

            element.style.transform = `translateY(${interpolatedTranslateY}px)`;

            if (percentage < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        };

        requestAnimationFrame(animate);
    });
}

// 绘制生长动画（用于对勾发芽效果）
function growAnimation(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设置画布尺寸
    canvas.width = 40;
    canvas.height = 40;

    return new Promise((resolve) => {
        let startTime;
        const duration = 1000; // 动画持续时间（毫秒）

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 绘制对勾
            ctx.beginPath();
            ctx.moveTo(10, 20);
            ctx.lineTo(15 + percentage * 5, 25 + percentage * 5);
            ctx.lineTo(30 - percentage * 10, 15 - percentage * 5);
            ctx.strokeStyle = '#34D399';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            // 绘制发芽效果
            if (percentage > 0.5) {
                const芽Progress = (percentage - 0.5) * 2;
                ctx.beginPath();
                ctx.moveTo(30 - 10 * percentage, 15 - 5 * percentage);
                ctx.bezierCurveTo(
                    30 - 10 * percentage + 5 * 芽Progress,
                    15 - 5 * percentage - 10 * 芽Progress,
                    30 - 10 * percentage + 15 * 芽Progress,
                    15 - 5 * percentage - 5 * 芽Progress,
                    30 - 10 * percentage + 10 * 芽Progress,
                    15 - 5 * percentage - 15 * 芽Progress
                );
                ctx.strokeStyle = '#10B981';
                ctx.lineWidth = 2;
                ctx.stroke();

                // 绘制叶子
                if (芽Progress > 0.5) {
                    const leafProgress = (芽Progress - 0.5) * 2;
                    ctx.beginPath();
                    ctx.arc(
                        30 - 10 * percentage + 10 * 芽Progress,
                        15 - 5 * percentage - 15 * 芽Progress,
                        3 * leafProgress,
                        0,
                        Math.PI * 2
                    );
                    ctx.fillStyle = 'rgba(16, 185, 129, 0.5)';
                    ctx.fill();
                }
            }

            if (percentage < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        };

        requestAnimationFrame(animate);
    });
}

// 花瓣飘落动画
function petalFallAnimation() {
    const container = document.body;
    const petalsCount = 10;

    for (let i = 0; i < petalsCount; i++) {
        createPetal(container);
    }
}

// 创建花瓣
function createPetal(container) {
    const petal = document.createElement('div');
    petal.classList.add('falling-petal');

    // 随机位置和样式
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const rotation = Math.random() * 360;
    const colors = ['#F8E9E9', '#D1F5E2', '#FFF3D6', '#FFDAB9'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // 设置样式
    petal.style.position = 'fixed';
    petal.style.top = '-20px';
    petal.style.left = `${left}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.backgroundColor = color;
    petal.style.borderRadius = '100% 0 100% 0';
    petal.style.opacity = '0.7';
    petal.style.transform = `rotate(${rotation}deg)`;
    petal.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.1)';
    petal.style.animation = `fall ${duration}s linear forwards ${delay}s`;
    petal.style.zIndex = '1000';

    // 添加到容器
    container.appendChild(petal);

    // 动画结束后移除
    setTimeout(() => {
        container.removeChild(petal);
    }, (delay + duration) * 1000);
}

// 添加花瓣飘落动画样式
function addPetalAnimationStyle() {
    if (!document.getElementById('petal-animation-style')) {
        const style = document.createElement('style');
        style.id = 'petal-animation-style';
        style.textContent = `
            @keyframes fall {
                0% {
                    transform: translateY(-20px) rotate(0deg);
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 初始化动画模块
function initAnimations() {
    // 添加花瓣飘落动画样式
    addPetalAnimationStyle();

    // 页面载入动画
    pageLoadAnimation();
}

// 导出函数供其他模块使用
window.initAnimations = initAnimations;
window.animateElement = animateElement;
window.fadeIn = fadeIn;
window.fadeOut = fadeOut;
window.bounce = bounce;
window.growAnimation = growAnimation;
window.petalFallAnimation = petalFallAnimation;