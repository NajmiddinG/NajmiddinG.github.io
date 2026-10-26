const root = document.documentElement;

// localStorage can throw in private mode or with blocked site data
const store = {
  get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch (e) {} },
};

// ---- Language ----
const langSelect = document.getElementById('lang');

function detectLang() {
  const saved = store.get('lang');
  if (saved && translations[saved]) return saved;
  const browser = navigator.language || 'en';
  if (/^uz-Cyrl/i.test(browser)) return 'uz-Cyrl';
  const base = browser.slice(0, 2).toLowerCase();
  return translations[base] ? base : 'en';
}

function setLang(lang) {
  const t = translations[lang];
  const text = (key) => t[key] ?? translations.en[key];

  root.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = text(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', text(el.dataset.i18nAria));
  });
  document.title = `${text('name')} — ${text('role')}`;
  document.querySelector('meta[name="description"]').content = text('meta.description');
  langSelect.value = lang;
}

langSelect.addEventListener('change', () => {
  setLang(langSelect.value);
  store.set('lang', langSelect.value);
});

setLang(detectLang());

// ---- Theme ----
const themeBtn = document.querySelector('.theme-toggle');
const darkQuery = matchMedia('(prefers-color-scheme: dark)');

const isDark = () => (root.dataset.theme || (darkQuery.matches ? 'dark' : 'light')) === 'dark';

function syncThemeIcon() {
  themeBtn.querySelector('.icon-sun').hidden = !isDark();
  themeBtn.querySelector('.icon-moon').hidden = isDark();
}

themeBtn.addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  store.set('theme', next);
  syncThemeIcon();
});

darkQuery.addEventListener('change', syncThemeIcon);
syncThemeIcon();

// ---- Mobile menu ----
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Close the mobile menu after picking a section
links.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }
});

// ---- Reveal on scroll ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
