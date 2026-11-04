# Awwwards 3D Research and Nebulyx 3D PRD

Researched 2026-11-03. Sources: awwwards.com listings and site pages, the Awwwards evaluation page, and runtime inspection of 13 live winning or nominated sites in a browser.

---

## 1. Method

| Source | What was collected |
|---|---|
| Sites of the Year list (30 sites, the all-time best) | Awwwards tags, jury score, Developer Award score, palette size |
| Recent Sites of the Day (30 sites) | Same |
| Current 3D nominees (30 sites) | "Built with" tags |
| 13 live sites, inspected in a browser | 3D engine and version, framework, scroll and animation libraries, 3D asset formats, page weight, fonts |
| Awwwards evaluation page | How sites are scored |

Caveats:
- Awwwards tags are self-reported: only 51 of 90 sites listed any technology, so tag counts undercount.
- The runtime checks are more reliable, but libraries bundled without a global (GSAP is the common case) can be missed.
- Page weights are lower bounds, because cross-origin CDN files often report 0 bytes.

---

## 2. How Awwwards judges

- **Site of the Day:** Design 40%, Usability 30%, Creativity 20%, Content 10%. At least 18 jurors vote; the 3 scores furthest from the average are dropped.
- **Honorable Mention:** a jury score of 6.5 or more.
- **Developer Award:** a separate developer jury re-scores every SOTD winner on the Developer Guidelines; above 7.0 wins. The guidelines cover semantics/SEO, animations and transitions, accessibility, performance, responsive design and markup.
- **Bar in this sample:** the average SOTD score was **7.75** and the average Developer Award score **7.55**.

**Implication:** 3D wins attention, but usability and content are 40% of the score. A beautiful scene that is slow, confusing or empty loses.

---

## 3. What the winners have in common

### 3.1 Design

| Pattern | Evidence |
|---|---|
| Tiny palettes | Sites using 2 colours: 24. Using 3: 10. Using 1: 5. Average: 2.1. One background, one ink, maybe one accent. |
| Strong custom type | Every inspected site uses licensed or custom display faces (Aeonik, Mona Sans, Neue Machina, PP Neue Montreal, Panchang, Ivar Headline). No default system or Google sans for the headline voice. |
| One idea per site | Each site has one memorable concept: a planet you deliver mail on (Messenger), a car you drive through a portfolio (Bruno Simon), a racing helmet (Lando Norris), an icy mountain (Igloo), aliens in a nightclub (Hoyo). |
| Storytelling over sections | "Storytelling" is the 3rd most common tag (17). Scroll is a narrative, not a stack of feature cards. |

### 3.2 UX and interaction

| Tag | Sites |
|---|---|
| 3D | 34 |
| Animation | 30 |
| Storytelling | 17 |
| Interaction design | 15 |
| Transitions | 14 |
| Scrolling | 13 |
| Experimental | 12 |
| Typography | 10 |
| Micro-interactions | 8 |
| Sound / audio | 8 |
| Parallax | 5 |
| Gestures | 4 |

Recurring mechanics:
- **Scroll-driven camera:** the camera moves through one persistent 3D scene as you scroll (Lando Norris, Igloo, Lusion).
- **Page transitions** that keep the WebGL canvas alive between pages.
- **Cursor-reactive scenes:** objects lean, light or distort toward the pointer.
- **Optional sound with a visible toggle**, off by default.
- **A preloader** that turns loading into an intro moment, since heavy scenes need several seconds.
- **Game-like exploration** on the most-awarded portfolios (Bruno Simon, Messenger, Don't Look Up).

### 3.3 Tech stack (live inspection)

| Site | Award | 3D engine | Framework | Scroll / animation | 3D assets | Weight* |
|---|---|---|---|---|---|---|
| Lusion v3 | SOTY | three.js r158 | Astro | custom | matcap EXR | ~0.5 MB |
| Igloo Inc | SOTY | three.js r165 | custom | custom | Draco-compressed meshes (.drc) | ~9.5 MB |
| Lando Norris | SOTY | three.js r174 | Webflow | Lenis | KTX2 textures | ≥0.2 MB |
| Bruno Simon | SOTY | three.js r183 **WebGPU** | custom | n/a | compressed GLB | ~2.7 MB |
| Active Theory v4 | SOTY | in-house engine | custom | custom | n/a (plus 2 videos) | ~0.7 MB |
| Messenger | SOTY | three.js r180 | custom | n/a | Draco + KTX2 | ~5.7 MB |
| Opal Tadpole | SOTY | WebGL canvas | Next.js | n/a | n/a | ~1.1 MB |
| Noomo Agency | SOTY | three.js r156 | Nuxt | n/a | GLB plus video | ~8 MB |
| Spyker Cars | SOTD | none (5 videos) | Next.js | Lenis | video | ~1.6 MB |
| Don't Look Up | SOTD | three.js r170 | custom | n/a | GLB | ~24 MB |
| A24 concept | SOTD | three.js r178 | Astro | GSAP + Lenis | n/a | ~0.7 MB |
| Overworld Audio | SOTD | three.js r184 | Nuxt | n/a | glTF | ~3.7 MB |
| Hoyo | Nominee | three.js r184 | Astro | Lenis | GLB | ~17 MB |

\* Weights are lower bounds, measured after about 5 seconds.

Tag counts from Awwwards (self-reported):

| Technology | Sites |
|---|---|
| Three.js | 21 |
| WebGL | 20 |
| GSAP | 20 |
| Nuxt | 7 |
| Webflow | 5 |
| GLSL | 4 |
| Sanity CMS | 4 |
| Next.js | 3 |
| Figma | 3 |
| PixiJS | 2 |
| Locomotive Scroll | 2 |
| After Effects | 2 |
| Blender | 1 (but evidently used for the GLB/Draco assets almost everywhere) |

**Conclusions:**
1. **Three.js is the default engine.** 11 of 13 inspected sites run it, all on recent versions (r156–r184). The newest already use the **WebGPU** renderer (Bruno Simon, r183).
2. **GSAP + Lenis is the default motion stack.** GSAP (ScrollTrigger, SplitText) choreographs; Lenis smooths the scroll.
3. **The framework barely matters.** Winners ship on Astro, Nuxt, Next.js, Webflow and hand-rolled setups. What matters is one persistent canvas layer and careful asset loading.
4. **Asset compression is universal:** Draco or Meshopt geometry, KTX2/Basis textures, HDR/EXR environment maps. Nobody ships raw GLB/PNG.
5. **Weight varies 50×** (0.5 MB to 24 MB). Lighter sites (Lusion, A24, Active Theory) win on creativity through shaders and type, not polygon count.
6. **Blender is the hidden constant:** models are authored and lighting is baked into textures in Blender, then exported as compressed glTF.

---

## 4. Skills needed vs. installed

### 4.1 Already installed and directly useful

| Need | Installed skill(s) |
|---|---|
| Art direction, avoiding a generic look | `design-taste-frontend`, `impeccable` (shape, critique, bolder, overdrive, polish, typeset, layout) |
| Design system | `impeccable document` (DESIGN.md written), `ui-design`, `ux-theory` |
| Planning 3D work | `threejs-skill-router` |
| WebGPU / TSL shaders | `webgpu-threejs-tsl` |
| Lighting, bloom, tone mapping, image pipeline | `threejs-bloom`, `threejs-exposure-color-grading`, `threejs-image-pipeline`, `threejs-screen-space-ambient-occlusion`, `threejs-shadow-systems` |
| Camera choreography | `threejs-camera-direction`, `threejs-procedural-animation` |
| Signature visual effects | `threejs-procedural-vfx`, `threejs-procedural-materials`, `threejs-procedural-fields`, `threejs-volumetric-clouds`, `threejs-raymarched-space-effects`, `threejs-water-optics`, `threejs-temporal-surfaces`, `nixie-fx-*` (particles) |
| Procedural models (no Blender) | `threejs-procedural-geometry`, `threejs-procedural-architecture`, `threejs-procedural-planets`, `threejs-procedural-vegetation` |
| Generated assets | `threejs-3d-generator` (Tripo text/image-to-3D), `threejs-image-generator` (Gemini), `threejs-audio-generator` (ElevenLabs); each needs its API key |
| Game-like exploration | `threejs-game-director`, `threejs-gameplay-systems`, `threejs-game-ui-designer` |
| UI motion | `motion` (Motion for React, CSS springs, MotionScore audits), `impeccable animate` |
| Performance and QA | `threejs-debug-profiler`, `threejs-visual-validation`, `threejs-qa-release`, `perf-audit`, `optimize-assets`, `responsive-check`, `e2e-scaffold`, `impeccable audit` / `harden` / `optimize` |

### 4.2 Gaps (nothing installed covers these well)

| Gap | Why it matters | Option |
|---|---|---|
| **GSAP + ScrollTrigger + SplitText choreography** | Used by about 1 in 4 winners. The standard for scroll-scrubbed timelines and text reveals. | Find or install a GSAP skill (`find-skills`), or I write it directly. GSAP is free, including the former paid plugins. |
| **Smooth scroll + page transitions** (Lenis, the View Transitions API, Barba) | The persistent-canvas + transition pattern behind most winners. | Small enough to implement directly; no skill needed. |
| **3D asset pipeline** (glTF-Transform, Draco/Meshopt, KTX2/Basis, gltfjsx) | Every winner compresses assets; this is where load times are won. | Partly covered by `optimize-assets`. A glTF-Transform CLI step in the build fills the rest. |
| **React ↔ three integration** (React Three Fiber + drei) | Nebulyx is React; R3F is the idiomatic bridge. | No skill; well documented. |
| **Authored cinematic timelines** (Theatre.js) | Lets you keyframe camera moves visually instead of in code. | Optional. |
| **Blender modelling and baking** | Hand-made hero models and baked lighting. | Can't be done by AI inside the repo. Use procedural geometry, Tripo-generated models, or a 3D artist. |

---

## 5. PRD: Nebulyx 3D site

### 5.1 Problem
The current site is a well-made but generic dark agency template (critique score 13/36). It tells founders about speed and ownership instead of showing it. The one idea nobody else has, the interactive Service Simulators, is buried in section 3 of 14.

### 5.2 Goal
A site good enough to be nominated on Awwwards, which also converts founders into scoping calls.

| Metric | Target |
|---|---|
| Awwwards | Honorable Mention (≥ 6.5) as the floor; SOTD (≥ 7.5) as the stretch |
| Conversion | Scoping-call requests per visitor up from the current baseline (needs analytics, see §5.9) |
| Core Web Vitals (mobile, 4G) | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 |
| Weight budget | ≤ 300 KB JS (gzip) before the 3D scene. 3D assets ≤ 4 MB, loaded after first paint |
| Accessibility | WCAG 2.2 AA on all DOM content; full experience without WebGL |

### 5.3 Audience
Founders and early-stage startups (see PRODUCT.md). They are mostly non-technical, judge on clarity, speed and ownership, and browse alone on a laptop or phone before talking to anyone.

### 5.4 Concept
**"The Midnight Workshop"** (DESIGN.md), made literal: one persistent 3D workshop scene behind the page. As the visitor scrolls, the camera moves between five workbenches, one per service. Each bench is the matching Service Simulator, made playable in 3D. The scroll is one sprint, from scoping to handover, and ends at the call to action.

### 5.5 Scope (in)
1. **Persistent WebGL canvas** behind DOM content. Three.js through React Three Fiber, WebGPU renderer with automatic WebGL2 fallback.
2. **Hero:** the workshop scene at rest. Signal Cyan used only as the "working light". Cursor-reactive. Replaces `OrbitalHeroArtifact`.
3. **Scroll-driven camera path** (GSAP ScrollTrigger + Lenis) through 5 service stations, with DOM copy alongside each.
4. **Simulators as the main story:** each existing sandbox becomes an interactive object at its station, plus a plain DOM version on mobile and when WebGL is unavailable.
5. **"How a sprint works"** as a scroll timeline: 4 steps, with the camera pulling back to show the whole workshop at handover.
6. **Page and section transitions** that keep the canvas alive. One authored motion signature, not effects scattered everywhere.
7. **Preloader** with real progress, which doubles as the intro.
8. **Optional ambient sound**, off by default, with a labelled toggle.
9. **One scoping-call flow** (from the founder-first copy pass), as an accessible native `<dialog>`.

### 5.6 Out of scope (for v1)
- A CMS (content stays in code).
- Multi-page case studies (no real proof exists yet; see PRODUCT.md).
- Hand-modelled Blender hero assets (v1 is procedural and generated; can be swapped later).
- Free-roam game controls.

### 5.7 Non-functional requirements
- **Progressive enhancement:** no WebGL or low-power device → a static image of the scene plus all DOM content. Respects `prefers-reduced-motion`: no scroll-scrubbed camera, crossfades instead.
- **Adaptive quality:** device-pixel-ratio cap of 1.5–2, dynamic resolution if frames slow down, lower-detail models on mobile.
- **Assets:** glTF with Meshopt or Draco geometry, KTX2 textures, one HDR environment map ≤ 1 MB. Loaded lazily after first paint.
- **Accessibility:**
  - all meaning available in DOM text
  - the canvas is hidden from screen readers
  - visible Signal Cyan focus ring
  - 44 px minimum tap targets
  - a keyboard path through every simulator
- **SEO:** real headings and text in HTML; the canvas is decoration.
- **Ownership:** no paid runtime services; GSAP and three.js are free.

### 5.8 Stack decision

| Layer | Choice | Why |
|---|---|---|
| Framework | Keep React 18 + Vite (later React 19) | Winners prove the framework doesn't matter; avoids a rewrite |
| 3D | `three` (latest), `@react-three/fiber`, `@react-three/drei` | Three.js is the default engine; R3F is the React bridge |
| Renderer | `WebGPURenderer` with WebGL2 fallback, TSL shaders | Matches the newest winners; covered by `webgpu-threejs-tsl` |
| Scroll / motion | GSAP (ScrollTrigger, SplitText) + Lenis; `motion` for small UI springs | The winners' default |
| Assets | glTF-Transform CLI (Meshopt, KTX2) in an `assets:build` script | Universal among winners |
| Models | Procedural (`threejs-procedural-*`) plus Tripo-generated props | No Blender needed |
| Audio | Web Audio (existing `audio.js`) or Howler | Optional layer |

### 5.9 Phases

| Phase | Work | Skills |
|---|---|---|
| 0. Foundations | Merge the build fix; finish critique steps 2–3 (fake proof out, page shortened to about 7 sections); add analytics and the form endpoint | `impeccable clarify`, `impeccable distill` |
| 1. Direction | Shape the workshop concept, style frames, motion grammar; update DESIGN.md | `impeccable shape`, `design-taste-frontend`, `threejs-skill-router` |
| 2. Engine | Persistent canvas, renderer fallback, adaptive quality, preloader, Lenis + ScrollTrigger camera rig | `webgpu-threejs-tsl`, `threejs-camera-direction`, `threejs-image-pipeline`, `threejs-exposure-color-grading` |
| 3. World | Workshop geometry, materials, Signal Cyan light, bloom, particles | `threejs-procedural-geometry/-materials/-vfx`, `threejs-bloom`, `nixie-fx-*`, `threejs-3d-generator` |
| 4. Stations | Five interactive simulators in 3D, with DOM fallbacks | `threejs-gameplay-systems`, `threejs-procedural-animation`, `motion` |
| 5. Hardening | Reduced motion, keyboard, dialog, focus, tap targets, contrast | `impeccable harden`, `impeccable audit`, `responsive-check` |
| 6. Performance & QA | Profiling, asset compression, visual regression, device matrix | `threejs-debug-profiler`, `optimize-assets`, `perf-audit`, `threejs-visual-validation`, `threejs-qa-release` |
| 7. Polish & submit | Final polish, re-run the critique, submit to Awwwards | `impeccable polish`, `impeccable critique` |

### 5.10 Acceptance criteria
- The critique scores ≥ 28/36 (Good), with no P0 or P1 issues open.
- Core Web Vitals targets are met on a mid-range Android phone over 4G.
- The site works fully with WebGL disabled and with reduced motion on.
- Visual regression baselines pass at 375, 768, 1024 and 1440 px.
- Every claim on the site is true (PRODUCT.md "Evidence on Hand").

### 5.11 Risks

| Risk | Mitigation |
|---|---|
| The 3D concept overwhelms the founder message | Copy stays in the DOM; the scene illustrates it and never replaces it |
| Mobile performance | Budgets enforced in CI, adaptive quality, static fallback |
| Generated models look generic | Procedural geometry first; generated props only as secondary detail |
| Scope creep | v1 has one scene and one scroll story; free-roam and case studies wait for v2 |
