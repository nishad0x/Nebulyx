# Changelog

## [1.6.1] — 2026-11-19

### Added
- SKROCK signature draws itself in on the About page; founders' knowsAbout added to schema

### Changed
- Founder cards redesigned: glossy corner-cut initial badges with a shine sweep, drifting aurora band, hover lift, focus tags and bold bios

## [1.6.0] — 2026-11-19

### Added
- Journal at /journal/ with four founder guides signed by Sonu Kumar (SKROCK), BlogPosting and Blog schema, per-article share images and links to the matching service
- Hand-drawn SKROCK signature in the article author box
- Founders section on the About page (Sonu Kumar and co-founder Hari Haran); both founders in ProfessionalService schema

### Changed
- Journal linked from headers, footers, llms.txt and the sitemap (14 URLs)

## [1.5.0] — 2026-11-19

### Added
- About page (/about/) with how-we-work principles, process, services and contact, plus AboutPage and BreadcrumbList schema
- Per-page Open Graph images for the five service pages and the About page

### Changed
- About linked from the service page header and every footer, and from llms.txt; sitemap now lists 9 URLs

## [1.4.3] — 2026-11-19

### Added
- Weekly Vercel cron that makes one read call to Brevo so the API key is not disabled after 90 days without use

## [1.4.2] — 2026-11-19

### Added
- Service pages: what we need from you, what affects the price, tools we often use, and two more FAQs each (711-792 words per page)
- Lead form logs the Brevo error status so delivery failures can be diagnosed

## [1.4.1] — 2026-11-19

### Added
- llms.txt summary for AI assistants and an IndexNow key
- favicon.ico, 48 px and 192 px icons, apple-touch-icon and a raster logo
- WebSite structured data; organisation logo now a PNG
- Security headers: frame-ancestors CSP, X-Frame-Options, Permissions-Policy

### Fixed
- Service page meta descriptions trimmed to 155 characters or fewer

## [1.4.0] — 2026-11-19

### Added
- Five service pages (websites, AI automation, social media, AI search, online stores) with Service, Breadcrumb and FAQ schema, pre-rendered and listed in the sitemap
- Google Labs-inspired service page design: dark hero with drifting cards, warm light body, spring entrances, scroll-filled statement text and animated service visuals
- Trailing-slash redirects on Vercel so each service page has one URL

### Changed
- Homepage footer reduced to one row; service page links moved into the Services section

## [1.3.0] — 2026-11-18

### Added
- Pre-rendered homepage HTML so search engines and AI crawlers can read the content
- robots.txt, sitemap.xml, FAQPage and ProfessionalService structured data, Open Graph image
- Privacy Policy and Terms pages, contact email and Instagram links
- Enquiry form delivered by email through a Vercel function

### Fixed
- All FAQ answers are now in the page HTML
- Hero text shows from first paint (LCP)

## [1.2.0] — 2026-11-13

### Added
- Hero N logo built from thousands of stars that scatter on scroll

### Changed
- Closing NEBULYX wordmark is a subtle hairline glass outline
- Smoother chapter handoffs, with the 3D world in step with the text

### Removed
- Blue slanted wipe banners between chapters

## [1.1.0] — 2026-11-06

### Added
- Scroll fly-through world, N logo intro dive, 3D glass logo and Work fly-by gallery
- Lighter render tier for phones and low-power devices

### Changed
- New N logo across the site and favicon
- Headings use Chakra Petch; chapters use angled motion and slanted wipes

### Fixed
- Pinned chapters and the 3D view no longer shift when a phone address bar collapses
