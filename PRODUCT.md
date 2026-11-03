# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Founders and early-stage startups who need digital infrastructure built quickly, often as their first engagement with an outside team. They arrive wanting a launch-ready website, automation that removes manual work, or a growth channel, and they judge the studio on speed, seniority and whether they keep ownership of what gets built.

## Product Purpose

Nebulyx is a digital engineering and growth studio. The site exists to explain what Nebulyx builds and to turn a qualified founder into a scoping conversation, through the consultation request ("Schedule a Scoping Call") or the project scope configurator. Success is a founder submitting either form with enough context to start a sprint.

## Positioning

Fixed-length production sprints instead of open-ended agency retainers, delivered by senior engineers directly, with full ownership of the code and IP passing to the client. Current site copy states a 21-day sprint, 100% IP transfer, and a 30-day post-launch optimisation window; the contractual terms behind these claims are not yet confirmed and must be checked before they are presented as guarantees.

## Operating Context

- Visitors usually evaluate Nebulyx alone on a laptop or phone before talking to anyone, so the site has to answer "what do you build, how fast, and what does it cost me in control" without a call.
- The site deliberately shows no prices. Engagements are scoped per project through the configurator and a call.
- Inquiries are sent as JSON to a form endpoint configured in `VITE_FORM_ENDPOINT` (Formspree-compatible). Without it, both forms show a "not configured" message.

## Capabilities and Constraints

All five disciplines are offered with equal priority:

1. High-performance website building
2. Platform automation and AI agent workflows
3. Social media growth and management
4. AEO / GEO (visibility in AI answer engines such as ChatGPT, Perplexity, Claude, Gemini)
5. Turnkey dropshipping and e-commerce setups

Technical constraints of this site:

- React 18 + Vite 5 single-page site, Tailwind CSS 3, Lucide icons, JavaScript only (no TypeScript). Static build to `dist/`.
- The README and some copy describe Next.js 15 / React 19; that is not what this site runs on.
- Interactive service simulators, a canvas background and generated Web Audio sound effects (off by default) are part of the current site.

Undecided: real pricing model, contract terms behind the sprint and IP claims, contact email and social profiles.

## Brand Commitments

- Name: Nebulyx.
- Existing logo and mark: `public/nebulyx-logo.jpg`, `public/logo-mark.svg`, `public/favicon.svg` (duplicated in `assets/`).

## Evidence on Hand

- Real: the service descriptions, the logo assets, the hero mockups (`public/nebulyx-hero-mockup.jpg`, `public/nebulyx-hero-display-mockup.jpg`) and the system diagram (`public/system-architecture.svg`).
- **Not real:** every case study and client in `src/data/caseStudies.js` (ChronoPulse, OmniSync, Velox, ApexHealth, Aurelia, Synthetix) and every result metric on the site and in the README (for example "42,000+ client hours saved", "$48M AUM", "28.5M+ impressions", "guaranteed 99+ Lighthouse", "sub-200ms global TTI") are placeholders. Future work must not present them, or new ones like them, as proof. There are no confirmed testimonials, client logos, press or benchmarks.

## Product Principles

1. Honest proof only: show what Nebulyx has actually shipped or can demonstrate, and label anything illustrative as such.
2. Speed and ownership are the promise: every surface should make the fixed sprint and client ownership clear.
3. Founder-first clarity: explain what gets built and what happens next in plain language a non-technical founder can act on.
4. One studio, five disciplines: no service is presented as an afterthought, and each leads to the same scoping conversation.
