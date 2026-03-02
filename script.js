/* ============================================================
   WEDDING WEBSITE — script.js
   Thea Spigarelli & Patrick Beal — April 29, 2026
   ============================================================ */

'use strict';

/* ---- Sparkle star factory ---------------------------------- */

/**
 * Creates a 4-pointed sparkle star SVG element.
 * @param {number} size - Diameter in px
 * @returns {SVGSVGElement}
 */
function createSparkle(size) {
  const c = size / 2;
  const outer = size / 2;
  const inner = size * 0.14; // tight inner radius for classic 4-point look

  // 8 points: 4 outer tips, 4 inner corners
  const pts = [
    [c,        c - outer], // N
    [c + inner, c - inner], // NE inner
    [c + outer, c        ], // E
    [c + inner, c + inner], // SE inner
    [c,        c + outer], // S
    [c - inner, c + inner], // SW inner
    [c - outer, c        ], // W
    [c - inner, c - inner], // NW inner
  ];

  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ') + ' Z';

  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('aria-hidden', 'true');
  svg.style.overflow = 'visible';

  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', d);
  path.style.fill = 'var(--color-star)';

  svg.appendChild(path);
  return svg;
}

/* ---- Star scattering --------------------------------------- */

/**
 * Scatters randomly positioned sparkle stars inside a container element.
 * Stars avoid the center 30% (where content lives in hero).
 * @param {HTMLElement} container
 * @param {number} count
 * @param {boolean} avoidCenter - If true, skip 30% center zone (for hero)
 */
function generateStars(container, count, avoidCenter) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    let left, top;

    if (avoidCenter) {
      // Place stars outside the middle 35% × 40% rect
      do {
        left = Math.random() * 100;
        top  = Math.random() * 100;
      } while (left > 32 && left < 68 && top > 30 && top < 70);
    } else {
      left = 5 + Math.random() * 90;
      top  = 5 + Math.random() * 90;
    }

    const size = 7 + Math.random() * 9;
    const dur  = (2.5 + Math.random() * 3.5).toFixed(2);
    const del  = (Math.random() * 5).toFixed(2);

    const wrapper = document.createElement('div');
    wrapper.className = 'star';
    wrapper.style.left = `${left}%`;
    wrapper.style.top  = `${top}%`;
    wrapper.style.setProperty('--twinkle-dur',   `${dur}s`);
    wrapper.style.setProperty('--twinkle-delay', `${del}s`);

    wrapper.appendChild(createSparkle(size));
    fragment.appendChild(wrapper);
  }

  container.appendChild(fragment);
}

/* ---- Constellation draw-in via IntersectionObserver -------- */

function initConstellations() {
  const drawTargets = document.querySelectorAll('.constellation-draw');
  if (!drawTargets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        el.classList.add('drawn');

        // Add shimmer class after draw-in transition finishes (~2.2 s)
        setTimeout(() => el.classList.add('constellation-shimmer'), 2300);

        // Stop observing once drawn
        observer.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );

  drawTargets.forEach((el) => observer.observe(el));
}

/* ---- Mobile hamburger menu --------------------------------- */

function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on any link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- FAQ accordion ----------------------------------------- */

function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Re-open if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---- Photo carousel --------------------------------------- */

/**
 * Fisher-Yates in-place shuffle.
 * @param {Array} arr
 * @returns {Array} The same array, shuffled.
 */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initCarousel() {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  // 1. Build image list and shuffle
  const images = Array.from({ length: 8 }, (_, i) => `assets/images/${i + 1}.jpg`);
  shuffleArray(images);

  // 2. Inject slides
  const slides = images.map((src, idx) => {
    const div = document.createElement('div');
    div.className = 'carousel__slide' + (idx === 0 ? ' active' : '');

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Photo ${idx + 1}`;
    img.loading = 'lazy';

    div.appendChild(img);
    carousel.appendChild(div);
    return div;
  });

  // 3. Prev / next arrow buttons
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel__arrow carousel__arrow--prev';
  prevBtn.setAttribute('aria-label', 'Previous photo');
  prevBtn.innerHTML = '&#8249;';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel__arrow carousel__arrow--next';
  nextBtn.setAttribute('aria-label', 'Next photo');
  nextBtn.innerHTML = '&#8250;';

  carousel.appendChild(prevBtn);
  carousel.appendChild(nextBtn);

  // 4. Dot indicators (rendered just after the carousel element)
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel__dots';
  dotsContainer.setAttribute('aria-hidden', 'true');

  const dots = images.map((_, idx) => {
    const btn = document.createElement('button');
    btn.className = 'carousel__dot' + (idx === 0 ? ' active' : '');
    btn.setAttribute('aria-label', `Go to photo ${idx + 1}`);
    dotsContainer.appendChild(btn);
    return btn;
  });

  // Insert dots after the carousel div
  carousel.parentNode.insertBefore(dotsContainer, carousel.nextSibling);

  // 5. State + helpers
  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  // 6. Auto-advance
  let timer = setInterval(() => goTo(current + 1), 4000);

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(current + 1), 4000);
  });

  // 7. Arrow button handlers (stop propagation so click doesn't navigate)
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goTo(current - 1);
    resetTimer();
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goTo(current + 1);
    resetTimer();
  });

  // 8. Dot handlers
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(idx);
      resetTimer();
    });
  });

  // 9. Click carousel body → gallery page
  carousel.addEventListener('click', () => {
    window.location.href = 'gallery.html';
  });
}

/* ---- Nav highlight on scroll ------------------------------- */

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---- Bootstrap -------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // Hero: generous star count + avoid center content area
  const hero = document.getElementById('hero');
  if (hero) generateStars(hero, 22, true);

  // Other sections: fewer, no center avoidance needed
  ['story', 'schedule', 'photos', 'registry', 'rsvp', 'faq'].forEach((id) => {
    const section = document.getElementById(id);
    if (section) generateStars(section, 8, false);
  });

  initConstellations();
  initMobileNav();
  initFAQ();
  initScrollSpy();
  initCarousel();
});
