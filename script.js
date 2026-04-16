document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');
    const startBtn = document.getElementById('start-btn');
    const overlay = document.getElementById('overlay');

    // Mặc định video sẽ bị browser chặn nếu không muted.
    // Chúng ta sẽ hiển thị màn hình Start để lấy tương tác người dùng.

    startBtn.addEventListener('click', () => {
        // Sau khi người dùng click, âm thanh sẽ được phép phát
        video.muted = false;
        video.play().then(() => {
            overlay.classList.add('fade-out');
        }).catch(error => {
            console.error("Lỗi khi phát video:", error);
            // Fallback nếu vẫn lỗi
            video.muted = true;
            video.play();
            overlay.classList.add('fade-out');
        });
    });

    // Đảm bảo video luôn ở trạng thái sẵn sàng
    video.load();
});
