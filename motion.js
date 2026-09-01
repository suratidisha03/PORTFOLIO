// =========================================================
// Disha Surati — Editorial Portfolio
// Minimal motion: one reveal style, section headings only.
// No parallax, no scroll libraries, no per-element choreography.
// =========================================================

(function () {
  function revealAll(els) {
    els.forEach(function (el) { el.classList.add('is-revealed'); });
  }

  function init() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    // Safety net: no matter what goes wrong below (JS error, observer
    // never firing, etc.), force every reveal element visible after a
    // short delay so content is never permanently hidden.
    var fallback = window.setTimeout(function () { revealAll(els); }, 1200);

    try {
      var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced || !('IntersectionObserver' in window)) {
        window.clearTimeout(fallback);
        revealAll(els);
        return;
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

      els.forEach(function (el) { observer.observe(el); });
    } catch (err) {
      window.clearTimeout(fallback);
      revealAll(els);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// =========================================================
// Signature device: oversized DISHA SURATI name reveal + a
// quiet scroll-linked handoff toward the nav-logo scale.
// Editorial, not flashy: one reveal, one threshold toggle.
// =========================================================
(function () {
  function init() {
    var sig = document.querySelector('.signature-name');
    if (!sig) return;

    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      sig.classList.add('is-revealed');
      return;
    }

    window.requestAnimationFrame(function () {
      window.setTimeout(function () { sig.classList.add('is-revealed'); }, 120);
    });

    var hero = document.querySelector('.hero');
    if (!hero) return;
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var passed = window.scrollY > hero.offsetHeight * 0.5;
        document.body.classList.toggle('scrolled-past-hero', passed);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// =========================================================
// Contextual hover cursor: shows "VIEW ↗" / "READ ↗" / "EXPLORE ↗"
// next to the pointer over [data-cursor] elements. Desktop / mouse
// only — never attaches on touch devices, and never interferes
// with keyboard focus or screen-reader behavior (purely decorative,
// aria-hidden, no focus trapping).
// =========================================================
(function () {
  function init() {
    var isTouch = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var targets = document.querySelectorAll('[data-cursor]');
    if (isTouch || prefersReduced || !targets.length) return;

    var bubble = document.createElement('div');
    bubble.className = 'hover-cursor';
    bubble.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bubble);

    var active = null;
    function move(e) {
      bubble.style.transform = 'translate(' + (e.clientX + 18) + 'px,' + (e.clientY + 18) + 'px)';
    }
    window.addEventListener('mousemove', move, { passive: true });

    targets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        active = el;
        bubble.textContent = el.getAttribute('data-cursor');
        bubble.classList.add('is-active');
      });
      el.addEventListener('mouseleave', function () {
        if (active === el) { bubble.classList.remove('is-active'); active = null; }
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
