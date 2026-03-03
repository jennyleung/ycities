/* yCITIES — main.js: Mobile nav + dropdown + active state */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Hamburger toggle ----------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open', !expanded);
    });

    // Close on outside click / Escape
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        closeAllDropdowns();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        closeAllDropdowns();
        toggle.focus();
      }
    });
  }

  /* ---- Mobile dropdown toggles --------------------------- */
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1000) {
        e.preventDefault();
        const dropdown = link.nextElementSibling;
        if (dropdown) {
          const isOpen = dropdown.classList.contains('open');
          closeAllDropdowns();
          if (!isOpen) {
            dropdown.classList.add('open');
            link.setAttribute('aria-expanded', 'true');
          }
        }
      }
    });
  });

  /* ---- Mark active nav item ------------------------------ */
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href && href === filename) {
      const li = a.closest('li');
      if (li) li.classList.add('active');
      // Also highlight parent if in dropdown
      const parentLi = li && li.closest('.has-dropdown');
      if (parentLi) parentLi.classList.add('active');
    }
  });

  /* ---- Smooth scroll for on-page anchors ----------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ---- Helpers ------------------------------------------- */
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('[aria-expanded="true"]').forEach(el => {
      if (!el.classList.contains('nav-toggle')) {
        el.setAttribute('aria-expanded', 'false');
      }
    });
  }

});
