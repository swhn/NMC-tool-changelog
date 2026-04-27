/* WBLS Engineering — changelog page interactions.
   Two effects:
     1. IntersectionObserver scroll-reveal so cards fade in as they enter view.
     2. Pointer-tracked highlight on each release card (cursor-following glow). */

(() => {
  // ── reveal-on-scroll ────────────────────────────────────
  const targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );
    targets.forEach((el) => io.observe(el));
  } else {
    // Old browser? Just show everything.
    targets.forEach((el) => el.classList.add('is-visible'));
  }

  // ── pointer-tracked highlight ───────────────────────────
  // Drives `--mx` / `--my` so the card's radial-gradient highlight follows
  // the cursor. Pure CSS handles the actual painting.
  document.querySelectorAll('.release-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${mx}%`);
      card.style.setProperty('--my', `${my}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });
  });

  // ── animate the hero pill version with a fresh fetch hook ──
  // Lets us upgrade `v1.2.0-beta.1` from a JSON manifest later without
  // touching the HTML. For now it's a no-op when no manifest is present.
  fetch('version.json', { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (!data) return;
      const verEl = document.querySelector('.hero__pill strong');
      const codeEl = document.querySelector('.hero__pill em');
      if (data.version && verEl) verEl.textContent = data.version;
      if (data.codename && codeEl) codeEl.textContent = data.codename;
    })
    .catch(() => {});
})();
