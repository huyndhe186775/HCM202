document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');
    const unmuteBtn = document.getElementById('unmute-btn');
    const icon = document.getElementById('icon');
    const overlay = document.getElementById('overlay');

    // Cố gắng phát video ngay lập tức
    // Chrome/Safari yêu cầu user interaction để bật âm thanh
    video.play().catch(error => {
        console.log("Autoplay bị chặn hoặc có lỗi:", error);
    });

    unmuteBtn.addEventListener('click', () => {
        if (video.muted) {
            video.muted = false;
            icon.textContent = '🔊';
            unmuteBtn.innerHTML = '🔊 Đang phát âm thanh';
            
            // Tự động ẩn overlay sau khi bật âm thanh 2 giây để người dùng xem clip
            setTimeout(() => {
                overlay.classList.add('fade-out');
            }, 2000);
        } else {
            video.muted = true;
            icon.textContent = '🔇';
            unmuteBtn.innerHTML = '🔇 Bật âm thanh';
            overlay.classList.remove('fade-out');
        }
    });

    // Nếu người dùng click bất kỳ đâu trên màn hình, cũng thử phát video (đề phòng autoplay bị chặn hoàn toàn)
    document.body.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        }
    }, { once: true });
});
