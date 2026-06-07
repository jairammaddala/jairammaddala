const portraitStyles = document.createElement('style');
portraitStyles.textContent = `
  .hero-visual {
    display: grid;
    gap: 22px;
  }

  .portrait-frame {
    position: relative;
    padding: 10px;
    border: 1px solid rgba(56, 189, 248, 0.32);
    border-radius: 26px;
    background: linear-gradient(135deg, rgba(56, 189, 248, 0.22), rgba(124, 58, 237, 0.24));
    box-shadow: 0 28px 90px rgba(0, 0, 0, 0.36), 0 0 42px rgba(56, 189, 248, 0.14);
    overflow: hidden;
  }

  .portrait-frame::before {
    content: "";
    position: absolute;
    inset: -40% auto auto -30%;
    width: 180px;
    height: 180px;
    border-radius: 999px;
    background: rgba(34, 211, 238, 0.28);
    filter: blur(22px);
  }

  .portrait-frame img {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    object-position: 48% 22%;
    border-radius: 18px;
    filter: saturate(1.04) contrast(1.04);
  }

  @media (max-width: 980px) {
    .hero-visual {
      max-width: 520px;
      margin-inline: auto;
    }
  }
`;
document.head.appendChild(portraitStyles);

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
