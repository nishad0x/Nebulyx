import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, '.ssr');
const EMPTY_ROOT = '<div id="root"></div>';

const { renderHome, SERVICE_ROUTES, EXTRA_ROUTES, STATIC_PAGES, SITE_URL } = await import(
  pathToFileURL(resolve(ssrDir, 'entry-static.js')).href
);
const template = await readFile(resolve(dist, 'index.html'), 'utf8');

if (!template.includes(EMPTY_ROOT)) {
  throw new Error('prerender: dist/index.html has no empty #root to fill');
}

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const jsonLd = (schemas) =>
  schemas.map((s) => `    <script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`).join('\n');

function setMeta(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`prerender: missing ${pattern}`);
  return html.replace(pattern, (match, before, _old, after) => `${before}${escapeAttr(value)}${after}`);
}

function servicePageHtml(route) {
  let html = template
    .replace(/\s*<script type="module"[^>]*><\/script>/g, '')
    .replace(/\s*<link rel="modulepreload"[^>]*>/g, '')
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(route.title)}</title>`);
  html = setMeta(html, /(<meta name="description" content=")([^"]*)(")/, route.description);
  html = setMeta(html, /(<link rel="canonical" href=")([^"]*)(")/, route.url);
  html = setMeta(html, /(<meta property="og:url" content=")([^"]*)(")/, route.url);
  html = setMeta(html, /(<meta property="og:title" content=")([^"]*)(")/, route.title);
  html = setMeta(html, /(<meta property="og:description" content=")([^"]*)(")/, route.description);
  html = setMeta(html, /(<meta name="twitter:title" content=")([^"]*)(")/, route.title);
  html = setMeta(html, /(<meta name="twitter:description" content=")([^"]*)(")/, route.description);
  html = setMeta(html, /(<meta property="og:image" content=")([^"]*)(")/, route.ogImage);
  html = setMeta(html, /(<meta property="og:image:alt" content=")([^"]*)(")/, route.title);
  html = setMeta(html, /(<meta name="twitter:image" content=")([^"]*)(")/, route.ogImage);
  return html
    .replace(EMPTY_ROOT, `<div id="root">${route.render()}</div>`)
    .replace('</head>', `${jsonLd(route.schemas)}\n  </head>`);
}

const home = renderHome();
await writeFile(
  resolve(dist, 'index.html'),
  template.replace(EMPTY_ROOT, `<div id="root">${home.html}</div>`).replace('</head>', `${jsonLd(home.schemas)}\n  </head>`),
);

const PAGE_ROUTES = [...SERVICE_ROUTES, ...EXTRA_ROUTES];

for (const route of PAGE_ROUTES) {
  const file = resolve(dist, `.${route.path}index.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, servicePageHtml(route));
}

const today = new Date().toISOString().slice(0, 10);
const urls = ['/', ...PAGE_ROUTES.map((r) => r.path), ...STATIC_PAGES];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${SITE_URL}${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
await writeFile(resolve(dist, 'sitemap.xml'), sitemap);
await rm(ssrDir, { recursive: true, force: true });
