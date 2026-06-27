// =============================================================
// CHATBOT.JS — lightweight rule-based assistant about Gowthami
// No external API calls; pure front-end pattern matching.
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('bot-toggle');
  const panel = document.getElementById('bot-panel');
  const body = document.getElementById('bot-body');
  const input = document.getElementById('bot-input');
  const sendBtn = document.getElementById('bot-send');
  const chips = document.querySelectorAll('.bot-chip');

  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open') && input) input.focus();
  });

  const knowledge = [
    {
      keys: ['project', 'projects', 'built', 'build'],
      reply: "I've worked on a secure offline LLM chatbot, Weaver Connect (a marketplace for traditional weavers), Smart Silk Farm Automation with IoT, CyberSentinel AI (a multi-agent security platform), and JusticeFlow AI for court case prioritization. Check the Projects page for details."
    },
    {
      keys: ['intern', 'experience', 'work', 'job'],
      reply: "I interned as an LLM Security Intern at Cube AI Solutions, working on secure AI chatbots and privacy-focused architectures. Before that, I interned in Networking & Cybersecurity at United Soft Solutions."
    },
    {
      keys: ['skill', 'tech', 'stack', 'language'],
      reply: "My core stack spans Java, Python, JavaScript, and C; React/HTML/CSS/Bootstrap for the web; network security and ethical hacking fundamentals; and applied AI work with Ollama and Mistral for secure local LLMs."
    },
    {
      keys: ['cert', 'certification', 'certificate'],
      reply: "A few highlights: Certified Red Team Analyst (CWL), Advent of Cyber 2025 (TryHackMe), Ethical Hacking Virtual Internship (AICTE EduSkills), and a Cryptography certificate from Cybrary."
    },
    {
      keys: ['education', 'cgpa', 'college', 'study', 'degree'],
      reply: "I'm pursuing a B.E. in Computer Science & Engineering (Cyber Security) at K.S.R. Institute for Engineering and Technology, currently holding an 8.9 CGPA."
    },
    {
      keys: ['contact', 'email', 'reach', 'hire', 'linkedin', 'github'],
      reply: "You can reach me at princessgowthami3@gmail.com, or find me on GitHub at github.com/Gowthami0704 and LinkedIn — links are in the Contact section."
    },
    {
      keys: ['startup', 'innovation', 'weaver'],
      reply: "I presented Weaver Connect at the StartupTN Innovation Program and it placed in the Top 5 — it connects traditional weavers directly with buyers for fairer pricing."
    },
  ];

  function findReply(text) {
    const lower = text.toLowerCase();
    for (const entry of knowledge) {
      if (entry.keys.some(k => lower.includes(k))) return entry.reply;
    }
    return "I don't have a canned answer for that yet — try asking about projects, internships, skills, certifications, or how to get in touch.";
  }

  function addMsg(text, who) {
    const msg = document.createElement('div');
    msg.className = 'bot-msg ' + who;
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function handleSend(text) {
    if (!text.trim()) return;
    addMsg(text, 'user');
    setTimeout(() => addMsg(findReply(text), 'bot'), 400);
  }

  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => {
      handleSend(input.value);
      input.value = '';
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSend(input.value);
        input.value = '';
      }
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => handleSend(chip.textContent));
  });
});
