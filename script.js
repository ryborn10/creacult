const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursorDot');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .job-card, .content-card, .req-item, .glass-card, .join-code').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
    }, 2400);
});

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let W = window.innerWidth, H = window.innerHeight;
canvas.width = W; canvas.height = H;

const COLORS = ['rgba(123,0,255,', 'rgba(255,0,170,', 'rgba(168,85,247,', 'rgba(0,212,255,'];

const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2.5 + 0.5,
    alpha: Math.random() * 0.6 + 0.1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    pulse: Math.random() * Math.PI * 2
}));

function animParticles() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() * 0.001;
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const a = p.alpha * (0.7 + 0.3 * Math.sin(t * 1.5 + p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + a + ')';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (a * 0.15) + ')';
        ctx.fill();
    });
    requestAnimationFrame(animParticles);
}
animParticles();
window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W; canvas.height = H;
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), 80);
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

function copyCode() {
    const text = '(NICKNAME) X OmeGirl 969';
    navigator.clipboard.writeText(text).then(() => {
        const hint = document.getElementById('copyHint');
        hint.textContent = '✅ TERSALIN!';
        hint.style.color = '#00ff88';
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            hint.textContent = '👆 KLIK UNTUK COPY';
            hint.style.color = '';
        }, 2500);
    });
}
