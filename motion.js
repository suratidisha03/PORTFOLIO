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
