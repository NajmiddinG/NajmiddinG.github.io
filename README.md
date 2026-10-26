# Portfolio

Personal portfolio of **Najmiddin Giyosiddinov**, Senior Backend Engineer (Python / Django). Static HTML, CSS and JavaScript, with no backend, no build step and no dependencies.

Sections: hero, about with key stats, what I bring, experience timeline, skills, projects, achievements and education, and contact.

## Features

- **4 languages:** English, Русский, Oʻzbekcha (Latin) and Ўзбекча (Cyrillic). The first visit picks the browser's language, and the choice is remembered.
- **Light and dark themes:** the site follows the system setting by default, and the toggle in the nav overrides it. The choice is remembered.
- **Apple-style design:** frosted-glass nav, large tight headlines, gradient "chip" hero, bento skill tiles, rounded project cards and scroll-reveal animations. Animations are turned off for users who set "reduce motion".
- **Responsive:** works from phone to desktop, with a collapsible menu on small screens.

## Structure

```
site/
├── index.html        # page structure, skills, project cards, links
├── style.css         # design; theme colors are tokens at the top
├── translations.js   # all page text in every language
└── script.js         # language switcher, theme toggle, mobile menu, animations
```

## Run locally

Open `site/index.html` in a browser, or serve it:

```bash
cd site
python3 -m http.server
# then open http://localhost:8000
```

## Customize

**Text** (name, intro, about, job bullets, dates, project and award descriptions) lives in `site/translations.js`. Edit the value for each language.

**In `site/index.html`:**
- **Experience:** each job is one `<article class="job">`. Job titles and company names are written directly in the HTML; bullets and dates use `exp.<id>.*` keys.
- **Skills:** edit the tags in each `.panel` of the `.bento` grid. A `.wide` panel spans two columns.
- **Projects:** each project is one `<article class="card">` with an inline SVG icon. The first card is `.featured` and spans two columns. To add a project, copy a card and add its `pN.title` and `pN.desc` keys to every language.
- **Contact:** email, phone, LinkedIn, GitHub, LeetCode and Robocontest links are at the bottom of the page.
- **Hero:** the "Now at …" badge text is the `hero.now` key, and the chip label (`Py`) is in `.chip`.

**Colors:** change the tokens at the top of `site/style.css`. The light theme is defined in `:root` and the dark theme in the two dark blocks below it, which must stay identical. The hero and chip gradient is `--gradient`.

### Add a language

1. Add an object to `translations.js` with the same keys as `en`. Any key you leave out falls back to English.
2. Add an `<option>` to the `#lang` select in `index.html`.

## Deploy

The site is plain files in `site/`, so any static host works:

- **Netlify / Vercel:** import the repo and set the publish (output) directory to `site`.
- **GitHub Pages:** Pages only serves from the repo root or `/docs`. Either deploy `site/` with a GitHub Actions "Static HTML" workflow (set its `path` to `site`), or push the contents of `site/` to their own repo.

## Development guidelines

[`CLAUDE.md`](CLAUDE.md) contains coding guidelines for AI assistants working on this repo, from [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) (MIT). `EXAMPLES.md`, `CURSOR.md`, `.cursor/`, `.claude-plugin/` and `skills/` come from the same project.
