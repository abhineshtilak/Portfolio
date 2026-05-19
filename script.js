/* ===== PARTICLES ===== */
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], mouse = { x: -999, y: -999 };

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  function initStars() {
    stars = Array.from({ length: 110 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.22,
      dy: (Math.random() - 0.5) * 0.22,
      alpha: Math.random() * 0.55 + 0.15,
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    // Connection lines
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const d = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(124,92,252,${0.1 * (1 - d / 130)})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
    stars.forEach(s => {
      s.x += s.dx + (mouse.x - s.x) * 0.00012;
      s.y += s.dy + (mouse.y - s.y) * 0.00012;
      if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190,190,255,${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('resize', () => { resize(); initStars(); });
  resize(); initStars(); animate();
})();

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ===== MOBILE MENU ===== */
const toggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(l =>
  l.addEventListener('click', () => {
    toggle.classList.remove('open');
    mobileMenu.classList.remove('open');
  })
);

/* ===== TYPING ANIMATION ===== */
const roles = [
  'Full-Stack Developer.',
  'MERN Stack Engineer.',
  'Technical Trainer.',
  'AI Integration Builder.',
  'Product Architect.',
];
let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const cur = roles[rIdx];
  if (!deleting) {
    typedEl.textContent = cur.slice(0, ++cIdx);
    if (cIdx === cur.length) { deleting = true; setTimeout(type, 2000); return; }
    setTimeout(type, 70);
  } else {
    typedEl.textContent = cur.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false; rIdx = (rIdx + 1) % roles.length;
      setTimeout(type, 350); return;
    }
    setTimeout(type, 40);
  }
}
setTimeout(type, 900);

/* ===== SCROLL REVEAL ===== */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('visible');
        triggerAnimations(e.target);
      }, i * 70);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  let current = 0;
  const duration = 1400;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) { el.textContent = target; clearInterval(timer); }
  }, 16);
}

/* ===== TRIGGER SECTION ANIMATIONS ===== */
function triggerAnimations(el) {
  el.querySelectorAll('.stat-number').forEach(animateCounter);
}

/* ===== PROGRESS BARS (Upcoming) ===== */
document.querySelectorAll('.progress-bar').forEach(bar => {
  bar.style.setProperty('--pw', '0%');
});

const progressObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const bar = e.target;
      const p = bar.getAttribute('data-progress');
      setTimeout(() => bar.style.setProperty('--pw', p + '%'), 300);
      progressObs.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-bar').forEach(b => progressObs.observe(b));

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    const active = a.getAttribute('href') === '#' + current;
    a.style.color = active ? '#fff' : '';
  });
}, { passive: true });

/* ===== CONTACT FORM ===== */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type=submit]');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.style.display = 'none';
    success.classList.add('show');
    this.reset();
  }, 1000);
});

/* ===== SMOOTH HOVER TILT on project cards ===== */
document.querySelectorAll('.project-card, .timeline-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-5px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
