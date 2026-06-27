// =============================================================
// TIMELINE.JS — small enhancement layer for timeline items
// (active-state handling lives in main.js IntersectionObserver;
// this file is reserved for timeline-specific extras, e.g.
// expand/collapse on mobile, kept separate per project structure)
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.tl-item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      // On narrow viewports, allow tapping a timeline entry to
      // toggle a subtle highlighted state for readability.
      if (window.innerWidth <= 600) {
        item.classList.toggle('active');
      }
    });
  });
});
