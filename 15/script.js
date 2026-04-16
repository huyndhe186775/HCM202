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
            showControls();
        }).catch(error => {
            console.error("Lỗi khi phát video:", error);
            // Fallback nếu vẫn lỗi
            video.muted = true;
            video.play();
            overlay.classList.add('fade-out');
            showControls();
        });
    });

    const controls = document.getElementById('video-controls');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressIndicator = document.getElementById('progress-indicator');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');

    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const volumeUpIcon = muteBtn.querySelector('.volume-up-icon');
    const volumeOffIcon = muteBtn.querySelector('.volume-off-icon');

    function showControls() {
        controls.classList.remove('hidden');
    }

    // Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    video.addEventListener('play', () => {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    });

    video.addEventListener('pause', () => {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    });

    // Mute/Unmute
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        updateVolumeIcon();
    });

    function updateVolumeIcon() {
        if (video.muted) {
            volumeUpIcon.classList.add('hidden');
            volumeOffIcon.classList.remove('hidden');
        } else {
            volumeUpIcon.classList.remove('hidden');
            volumeOffIcon.classList.add('hidden');
        }
    }

    // Progress Bar
    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.value = percent;
        progressIndicator.style.width = percent + '%';
        currentTimeEl.textContent = formatTime(video.currentTime);
    });

    video.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(video.duration);
    });

    progressBar.addEventListener('input', () => {
        const time = (progressBar.value / 100) * video.duration;
        video.currentTime = time;
    });

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Đảm bảo video luôn ở trạng thái sẵn sàng
    video.load();
});
