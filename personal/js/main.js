// =============================================================
// MAIN.JS — boot sequence, navigation, scroll choreography
// =============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Boot sequence ---------- */
  const boot = document.getElementById('boot');
  if (boot) {
    const dismiss = () => boot.classList.add('hidden');
    setTimeout(dismiss, 2200);
    boot.addEventListener('click', dismiss);
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Thread rail progress + node lighting ---------- */
  const rail = document.querySelector('.thread-rail');
  const nodes = document.querySelectorAll('.thread-node');

  function updateThread() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    if (rail) rail.style.setProperty('--thread-progress', scrolled + '%');

    nodes.forEach(node => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.7) {
        node.classList.add('lit');
      }
    });
  }

  window.addEventListener('scroll', updateThread, { passive: true });
  updateThread();

  /* ---------- Active timeline marker ---------- */
  const tlItems = document.querySelectorAll('.tl-item');
  if ('IntersectionObserver' in window && tlItems.length) {
    const tlIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.4 });
    tlItems.forEach(item => tlIo.observe(item));
  }

  /* ---------- Contact form (static demo) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      if (status) {
        status.textContent = 'Message captured locally — connect this form to a backend or service like Formspree to send it for real.';
        status.classList.add('show');
      }
      form.reset();
    });
  }

});
