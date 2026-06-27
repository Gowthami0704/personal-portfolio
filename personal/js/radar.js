// =============================================================
// RADAR.JS — lightweight canvas radar chart for skill domains
// No charting library dependency; pure canvas 2D.
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('skill-radar');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = 320;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);

  const data = [
    { label: 'Cyber Security', value: 0.85 },
    { label: 'Applied AI / LLMs', value: 0.8 },
    { label: 'Frontend Dev', value: 0.75 },
    { label: 'Networking', value: 0.7 },
    { label: 'IoT Systems', value: 0.65 },
    { label: 'Databases', value: 0.6 },
  ];

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.34;
  const count = data.length;
  const signal = '#5EEAD4';
  const thread = '#C2542E';
  const grid = '#2A3349';
  const textColor = '#9CA3B8';

  function pointFor(i, value) {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const r = radius * value;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  }

  function draw() {
    ctx.clearRect(0, 0, size, size);

    // grid rings
    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    [0.25, 0.5, 0.75, 1].forEach(scale => {
      ctx.beginPath();
      for (let i = 0; i <= count; i++) {
        const angle = (Math.PI * 2 * (i % count)) / count - Math.PI / 2;
        const r = radius * scale;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    // spokes
    data.forEach((_, i) => {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
      ctx.strokeStyle = grid;
      ctx.stroke();
    });

    // data polygon
    ctx.beginPath();
    data.forEach((d, i) => {
      const p = pointFor(i, d.value);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, 'rgba(94,234,212,0.28)');
    grad.addColorStop(1, 'rgba(194,84,46,0.22)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = signal;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // points
    data.forEach((d, i) => {
      const p = pointFor(i, d.value);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = thread;
      ctx.fill();
    });

    // labels
    ctx.font = '10.5px "JetBrains Mono", monospace';
    ctx.fillStyle = textColor;
    data.forEach((d, i) => {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      const lx = cx + (radius + 28) * Math.cos(angle);
      const ly = cy + (radius + 28) * Math.sin(angle);
      ctx.textAlign = Math.cos(angle) > 0.3 ? 'left' : Math.cos(angle) < -0.3 ? 'right' : 'center';
      ctx.textBaseline = 'middle';
      wrapLabel(d.label, lx, ly, ctx);
    });
  }

  function wrapLabel(text, x, y, ctx) {
    const words = text.split(' ');
    if (words.length === 1) {
      ctx.fillText(text, x, y);
      return;
    }
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(' ');
    const line2 = words.slice(mid).join(' ');
    ctx.fillText(line1, x, y - 6);
    ctx.fillText(line2, x, y + 6);
  }

  draw();
  window.addEventListener('resize', draw);
});
