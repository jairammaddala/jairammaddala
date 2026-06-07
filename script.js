const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');
const typingTarget = document.querySelector('#typing-text');
const yearTarget = document.querySelector('#year');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-42% 0px -48% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const phrases = [
  'AI Application Engineering',
  'RAG and Semantic Retrieval',
  'LLM Evaluation Workflows',
  'Cloud Data Engineering',
  'Reliable ETL/ELT Pipelines'
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingTarget) return;

  const phrase = phrases[phraseIndex];
  typingTarget.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex < phrase.length) {
    charIndex += 1;
    window.setTimeout(typeLoop, 72);
    return;
  }

  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    window.setTimeout(typeLoop, 1200);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    window.setTimeout(typeLoop, 38);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  window.setTimeout(typeLoop, 220);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typeLoop();
}
