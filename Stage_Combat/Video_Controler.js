// 播放视频的函数
window.playVideo = function () {
    // 创建视频元素
    const video = document.createElement('video');
    video.src = 'public/images/回合结束演示.mp4';  // 视频路径
    video.type = 'video/mp4';
    //video.style.opacity = 0.7; 
    video.autoplay = true;  // 自动播放
    video.loop = false;  // 不循环
    video.style.position = 'absolute';  // 设置为绝对定位
    video.style.top = '0';  // 顶部对齐
    video.style.left = '0';  // 左侧对齐
    video.style.width = '100%';  // 视频宽度填充屏幕
    video.style.height = '100%';  // 视频高度填充屏幕
    video.style.zIndex = '1000';  // 确保视频在其他内容之上

    // 将视频元素添加到页面
    document.body.appendChild(video);

    // 播放结束后移除视频
    video.onended = () => {
        document.body.removeChild(video);
    };
}