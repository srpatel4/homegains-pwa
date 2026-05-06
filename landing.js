// Custom Cursor removed per user request

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Triggers slightly earlier for snappy feel
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-scale').forEach(el => {
    observer.observe(el);
});

// Parallax effect on hero background text
const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (heroBgText) {
        // Precise movement simulating forward momentum
        heroBgText.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.4}px))`;
    }
});
