<div align="center">

  <img src="public/logo.png" alt="Nebulyx" width="96" />

  # Nebulyx

  **Your whole launch, one team.**<br/>
  Websites, AI automation, social growth, AI search and online stores for founders.

  [nebulyx.live](https://www.nebulyx.live) · [Journal](https://www.nebulyx.live/journal/) · [About](https://www.nebulyx.live/about/)

  <br/>

  <img src="public/nebulyx-glass-effect.jpg" alt="Nebulyx Obsidian Glass Presentation" width="100%" style="border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);" />

</div>

---

## What this is

The source for **nebulyx.live**, the website of Nebulyx, a studio in Chandigarh, India that designs, builds and grows launches for founders worldwide.

- **Homepage:** a scroll-driven 3D world (Three.js) where a star-particle N logo, the five services, the process, sample work and the FAQ unfold chapter by chapter.
- **Service pages:** one page per service, in a lighter Google Labs–inspired style, with an animated visual for each.
- **About and Journal:** the studio, its founders, and articles signed by the founder.

Every page is pre-rendered to plain HTML at build time, so search engines and AI assistants can read it without running JavaScript.

## Pages

| Route | What it is |
|---|---|
| `/` | Homepage: 3D scroll world, services, process, work samples, FAQ, contact |
| `/services/websites/` | Website design and development |
| `/services/ai-automation/` | AI automation |
| `/services/social-media/` | Social media growth |
| `/services/ai-search/` | AI search optimization (AEO and GEO) |
| `/services/online-stores/` | Online store and dropshipping setup |
| `/about/` | How the studio works, founders, process |
| `/journal/` | Founder guides, one page per article |
| `/privacy.html`, `/terms.html` | Legal pages |

## Tech stack

| Area | Tools |
|---|---|
| App | React 18, Vite 5 |
| Styling | Tailwind CSS 3 plus `src/index.css` (design tokens and motion) |
| Motion | GSAP, Lenis smooth scroll, Motion |
| 3D | Three.js (homepage only, lazy-loaded) |
| Fonts | Chakra Petch (display), General Sans (body) |
| Hosting | Vercel (static output plus two serverless functions) |
| Email | Brevo transactional API for the enquiry form |

## Project structure

```
api/
  lead.js            Enquiry form → email via Brevo
  keepalive.js       Weekly cron that keeps the Brevo API key active
public/              Static files: robots.txt, llms.txt, icons, share images (og/), legal pages
scripts/
  prerender.mjs      Renders every route to HTML, injects meta + JSON-LD, writes sitemap.xml
src/
  App.jsx            Homepage app (3D world, chapters, booking drawer)
  entry-static.jsx   Server render entry: routes, titles, descriptions, structured data
  components/site/   Sections, ServicePage, AboutPage, JournalPages, ServiceVisual, labs (shared motion blocks)
  data/              Content: services, service pages, FAQs, journal articles, contact details
  world/             Three.js world, camera flight, quality tiers
index.html           Shell, fonts, site-wide meta and business structured data
vercel.json          Headers, trailing-slash redirects, cron
```

## Editing content

Most copy lives in plain data files, so text changes don't need component edits:

| To change | Edit |
|---|---|
| Service names, summaries, deliverables | `src/data/services.js` |
| Service page copy, FAQs, slugs, SEO titles | `src/data/servicePages.js` |
| Homepage FAQ | `src/data/faqs.js` |
| Journal articles and author | `src/data/journal.js` |
| Email, Instagram, location, founders | `src/data/contact.js` |

New journal articles are added to `ARTICLES` in `src/data/journal.js`. The build creates the page, its structured data and its sitemap entry. A share image goes in `public/og/journal-<slug>.png`.

## Getting started

Requires Node 18 or newer.

```bash
npm install
npm run dev        # dev server (homepage)
npm run build      # client build + server render + pre-render to dist/
npm run preview    # serve dist/ locally, including the pre-rendered pages
```

Service, About and Journal pages exist only in the build output, so check them with `npm run build && npm run preview`.

## Environment variables

Set these in Vercel (Project → Settings → Environment Variables). Never commit them.

| Variable | Used by | Purpose |
|---|---|---|
| `BREVO_API_KEY` | `api/lead.js`, `api/keepalive.js` | Brevo API key (starts `xkeysib-`, transactional email permission) |
| `CRON_SECRET` | `api/keepalive.js` | Lets only Vercel's scheduler call the keep-alive endpoint |
| `LEAD_TO`, `LEAD_FROM` | `api/lead.js` | Optional; both default to `hello@nebulyx.live` |

## Deployment

The Vercel project is connected to this repository:

- **Push or merge to `main`** → production deploy to [www.nebulyx.live](https://www.nebulyx.live).
- **Push any other branch** → a preview deploy with its own URL.

Work on a branch, check the preview, then merge to `main`.

## SEO and AI search

Built in, so keep it working when adding pages:

- Pre-rendered HTML for every route, with a unique title, description and canonical link.
- Structured data: ProfessionalService, WebSite, Service, FAQPage, AboutPage, Blog, BlogPosting, BreadcrumbList.
- A generated `sitemap.xml`, plus `robots.txt` that allows AI crawlers, and `llms.txt`.
- A per-page share image (`public/og/`) and IndexNow key for fast Bing indexing.

## Standards

Project conventions live in [`CLAUDE.md`](CLAUDE.md), [`DESIGN.md`](DESIGN.md) and [`coding-standards/`](coding-standards/). Versions and changes are tracked in [`CHANGELOG.md`](CHANGELOG.md), using conventional commits.

---

<div align="center">
  © 2026 Nebulyx · Chandigarh, India · <a href="mailto:hello@nebulyx.live">hello@nebulyx.live</a>
</div>
