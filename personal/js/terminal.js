// =============================================================
// TERMINAL.JS — typed console lines in the hero console widget
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementById('console-body');
  if (!body) return;

  const lines = [
    { prompt: 'whoami', value: 'Gowthami S — Cyber Security Engineering' },
    { prompt: 'status --focus', value: 'Secure AI · LLM Security · Frontend' },
    { prompt: 'role --current', value: 'Studying · Building · Securing' },
  ];

  let lineIndex = 0;

  function typeLine(line, container, onDone) {
    const row = document.createElement('div');
    row.className = 'console-line';
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = '>';
    const cmdSpan = document.createElement('span');
    const valSpan = document.createElement('span');
    valSpan.className = 'val';

    row.appendChild(promptSpan);
    row.appendChild(cmdSpan);
    container.appendChild(row);

    let i = 0;
    const full = line.prompt;
    const typer = setInterval(() => {
      cmdSpan.textContent = full.slice(0, i + 1);
      i++;
      if (i >= full.length) {
        clearInterval(typer);
        setTimeout(() => {
          row.appendChild(valSpan);
          valSpan.textContent = '  ' + line.value;
          onDone();
        }, 250);
      }
    }, 38);
  }

  function runSequence() {
    if (lineIndex >= lines.length) {
      const cursorRow = document.createElement('div');
      cursorRow.className = 'console-line';
      cursorRow.innerHTML = '<span class="prompt">></span><span class="console-cursor"></span>';
      body.appendChild(cursorRow);
      return;
    }
    typeLine(lines[lineIndex], body, () => {
      lineIndex++;
      setTimeout(runSequence, 350);
    });
  }

  setTimeout(runSequence, 2400); // start after boot sequence clears
});
