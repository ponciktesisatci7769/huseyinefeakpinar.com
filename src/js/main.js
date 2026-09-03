// Footer year.
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Mobile navigation.
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  nav.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  });
}

// CV print button.
document.querySelectorAll('[data-print]').forEach((el) => {
  el.addEventListener('click', () => window.print());
});
