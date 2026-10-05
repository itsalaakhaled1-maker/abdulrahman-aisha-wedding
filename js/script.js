// ==================== ENVELOPE OPENING LOGIC ====================
document.addEventListener('DOMContentLoaded', function() {

    const envelopeScreen = document.getElementById('envelope-screen');
    const videoScreen = document.getElementById('video-screen');
    const mainWebsite = document.getElementById('main-website');
    const inviteVideo = document.getElementById('invite-video');

    let isOpened = false;

    // Handle envelope click
    envelopeScreen.addEventListener('click', function() {
        if (isOpened) return;
        isOpened = true;

        // Step 1: Hide envelope immediately
        envelopeScreen.classList.add('fade-out');

        // Step 2: Show video screen and play video
        setTimeout(() => {
            envelopeScreen.style.display = 'none';
            videoScreen.classList.remove('hidden');

            // Play the video
            inviteVideo.play().catch(e => {
                console.log('Video autoplay failed:', e);
                // If video fails, skip to website
                showWebsite();
            });
        }, 500);

        // Step 3: When video ends, fade out and show website
        inviteVideo.addEventListener('ended', function() {
            fadeOutVideo();
        });

        // Fallback: If video is longer than 5 seconds, fade out after 5 seconds
        setTimeout(() => {
            if (!videoScreen.classList.contains('fade-out')) {
                fadeOutVideo();
            }
        }, 5000);
    });

    function fadeOutVideo() {
        videoScreen.classList.add('fade-out');

        setTimeout(() => {
            videoScreen.style.display = 'none';
            showWebsite();
        }, 1000);
    }

    function showWebsite() {
        mainWebsite.classList.remove('hidden');

        // Trigger fade in
        setTimeout(() => {
            mainWebsite.classList.add('visible');
        }, 100);

        // Start countdown
        startCountdown();

        // Initialize RSVP form
        initRSVPForm();
    }

    // ==================== COUNTDOWN TIMER ====================
    function startCountdown() {
        // Wedding date: November 6, 2026 at 8:30 PM
        const weddingDate = new Date('2026-11-06T20:30:00+04:00');

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        function updateCountdown() {
            const now = new Date();
            const diff = weddingDate - now;

            if (diff <= 0) {
                // Wedding day has arrived!
                daysEl.textContent = '0';
                hoursEl.textContent = '0';
                minutesEl.textContent = '0';
                secondsEl.textContent = '0';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            daysEl.textContent = days;
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        }

        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ==================== RSVP FORM ====================
    function initRSVPForm() {
        const form = document.getElementById('rsvp-form');
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const successMessage = document.getElementById('success-message');
        const declineMessage = document.getElementById('decline-message');

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('guest-name').value.trim();
            const attendance = form.querySelector('input[name="attendance"]:checked')?.value;
            const message = document.getElementById('message').value.trim();

            if (!name || !attendance) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            btnLoading.classList.remove('hidden');

            // Simulate sending (replace with actual API call)
            setTimeout(() => {
                // Hide form
                form.style.display = 'none';

                // Show appropriate message
                if (attendance === 'yes') {
                    successMessage.classList.remove('hidden');
                } else {
                    declineMessage.classList.remove('hidden');
                }

                // Log the response (for demo)
                console.log('RSVP Response:', {
                    name: name,
                    attendance: attendance,
                    message: message,
                    timestamp: new Date().toISOString()
                });

            }, 1500);
        });
    }

    // ==================== SMOOTH SCROLL ====================
    // Add smooth scroll behavior for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
