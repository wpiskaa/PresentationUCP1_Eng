document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlideCountSpan = document.getElementById('totalSlideCount');
    const progressBar = document.getElementById('progressBar');
    const dotsContainer = document.getElementById('slideDots');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Update total count
    if (totalSlideCountSpan) totalSlideCountSpan.textContent = totalSlides;

    // Build dot indicators
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        updateUI();
    }

    function updateUI() {
        // Update active dot
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));

        // Update counter
        currentSlideSpan.textContent = currentSlide + 1;

        // Update progress bar
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;

        // Update button states
        prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft') {
            if (currentSlide > 0) goToSlide(currentSlide - 1);
        } else if (e.key === 'Home') {
            goToSlide(0);
        } else if (e.key === 'End') {
            goToSlide(totalSlides - 1);
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    document.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
            else if (diff < 0 && currentSlide > 0) goToSlide(currentSlide - 1);
        }
    }, { passive: true });

    // Initialize
    updateUI();
});
