// ===== REVEAL WEBSITE ON BUTTON CLICK =====
function revealWebsite() {
    const splashScreen = document.getElementById('splashScreen');
    splashScreen.classList.add('hidden');
    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 800);
}

// ===== GENERATE RANDOM FALLING STARS =====
function generateStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = window.innerWidth > 768 ? 150 : 80;
    const fallAnimations = ['fall1', 'fall2', 'fall3', 'fall4'];

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Assign random falling animation
        const randomAnimation = fallAnimations[Math.floor(Math.random() * fallAnimations.length)];
        star.classList.add(randomAnimation);

        // Random horizontal position
        star.style.left = Math.random() * 100 + '%';

        // Start from random top position for continuous falling effect
        star.style.top = Math.random() * 100 - 10 + '%';

        // Random animation delay for staggered effect
        star.style.animationDelay = Math.random() * 5 + 's';

        starsContainer.appendChild(star);
    }
}

// ===== TOGGLE HEAVY DAY MESSAGE =====
function toggleHeavyDayMessage() {
    const message = document.getElementById('heavy-message');
    message.classList.toggle('revealed');
}

// ===== ALBUM SWITCHING =====
function switchAlbum(album) {
    // Hide all albums
    document.querySelectorAll('.album-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active from all buttons
    document.querySelectorAll('.album-tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected album
    document.getElementById(album + '-album').classList.add('active');

    // Add active to clicked button
    event.target.classList.add('active');
}

// ===== SCROLL ANIMATIONS =====
function observeElements() {
    const options = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fade-in 0.8s ease-in forwards';
            }
        });
    }, options);

    document.querySelectorAll('.trait-card, .memory-card, .album-card').forEach(card => {
        observer.observe(card);
    });
}

// ===== SCROLL TO WARM BACKGROUND TRANSITION =====
function handleScroll() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        // Warm transition happens at "I See You" section (around 25% of scroll)
        if (isVisible && section.id === 'see-you') {
            document.body.style.background = `linear-gradient(135deg, 
                rgba(10, 15, 44, 0.8) 0%, 
                rgba(45, 24, 16, 0.8) 50%, 
                rgba(10, 15, 44, 0.8) 100%), 
                linear-gradient(135deg, #2d1810 0%, #1a1f3a 100%)`;
        }

        // Return to blue at closing
        if (section.id === 'closing') {
            document.body.style.background = `linear-gradient(135deg, #0a0f2c 0%, #1a1f3a 100%)`;
        }
    });
}

// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    generateStars();
    observeElements();

    window.addEventListener('scroll', () => {
        handleScroll();
    });

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ===== HANDLE WINDOW RESIZE =====
window.addEventListener('resize', () => {
    // Regenerate stars on resize if needed
    if (window.innerWidth < 768 && document.querySelectorAll('.star').length > 50) {
        document.getElementById('stars').innerHTML = '';
        generateStars();
    }
});
