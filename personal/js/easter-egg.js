// =============================================================
// EASTER-EGG.JS — Konami code unlocks a hidden dev-console note
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
  const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let cursor = 0;

  window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === sequence[cursor]) {
      cursor++;
      if (cursor === sequence.length) {
        unlock();
        cursor = 0;
      }
    } else {
      cursor = (key === sequence[0]) ? 1 : 0;
    }
  });

  function unlock() {
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.bottom = '1.6rem';
    banner.style.left = '1.6rem';
    banner.style.zIndex = '999';
    banner.style.background = '#1C2333';
    banner.style.border = '1px solid #5EEAD4';
    banner.style.color = '#E8E6DF';
    banner.style.fontFamily = "'JetBrains Mono', monospace";
    banner.style.fontSize = '.78rem';
    banner.style.padding = '.9rem 1.2rem';
    banner.style.borderRadius = '10px';
    banner.style.maxWidth = '300px';
    banner.style.boxShadow = '0 12px 30px rgba(0,0,0,.45)';
    banner.textContent = '> access granted: thanks for poking around the code — that curiosity is exactly what makes a good security engineer. — Gowthami';
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 6000);
  }

  // Quiet console hint for anyone who opens devtools out of habit.
  console.log('%cLooking for vulnerabilities, or just curious?', 'color:#5EEAD4; font-family:monospace; font-size:13px;');
  console.log('%cTry the Konami code on this page.', 'color:#9CA3B8; font-family:monospace; font-size:12px;');
});
