---
name: Nebulyx
description: Websites, AI automation and growth for founders, built by one team in fixed-length sprints.
colors:
  nebulyx-blue: "#3a5bff"
  nebulyx-blue-hover: "#4f6dff"
  tile-blue: "#1f3dff"
  path-blue: "#7d95ff"
  focus-blue: "#8fa2ff"
  void: "#05060a"
  dialog-surface: "#0b0d14"
  grid-room: "#eceef3"
  diagram-well: "#f1f3f8"
  paper-white: "#ffffff"
  room-ink: "#0b0d12"
  line-ink: "#11131a"
  room-body: "#454b5a"
  mist: "#d5d9e3"
  haze: "#b6bccb"
  slate-muted: "#9aa1b2"
  dim: "#8a91a3"
  dusk: "#7f8799"
  error-rose: "#ff8a8a"
typography:
  display:
    fontFamily: "Chakra Petch, General Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(3rem, 6.9vw, 8.4rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Chakra Petch, General Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 5.6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Chakra Petch, General Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title-card:
    fontFamily: "General Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "General Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "General Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.625
  nav:
    fontFamily: "General Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.12em"
  wordmark:
    fontFamily: "General Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(5rem, 24vw, 30rem)"
    fontWeight: 500
    lineHeight: 0.78
    letterSpacing: "-0.06em"
rounded:
  none: "0px"
  sm: "2px"
spacing:
  gutter: "20px"
  gutter-wide: "32px"
  gap: "24px"
  gap-lg: "40px"
  section: "128px"
  section-lg: "176px"
components:
  button-primary:
    backgroundColor: "{colors.nebulyx-blue}"
    textColor: "{colors.paper-white}"
    typography: "{typography.nav}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.nebulyx-blue-hover}"
  button-primary-nav:
    backgroundColor: "{colors.nebulyx-blue}"
    textColor: "{colors.paper-white}"
    typography: "{typography.nav}"
    rounded: "{rounded.sm}"
    padding: "0 16px"
    height: "40px"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "rgba(255, 255, 255, 0.12)"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.haze}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
  chip-selected:
    backgroundColor: "{colors.nebulyx-blue}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
  field:
    backgroundColor: "{colors.void}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
  dialog:
    backgroundColor: "{colors.dialog-surface}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.none}"
    padding: "32px"
    width: "512px"
  sample-card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.room-ink}"
    rounded: "{rounded.none}"
    padding: "28px"
  sample-tag:
    backgroundColor: "{colors.room-ink}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  chapter-tag-number:
    backgroundColor: "{colors.nebulyx-blue}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    width: "40px"
---

# Design System: Nebulyx

## Overview

**Creative North Star: "The Endless Tile Field"**

Nebulyx lives inside one persistent 3D world. An endless perspective grid of fine lines and plus-shaped markers curves away to a fogged horizon, and eighteen glossy blue service tiles, each carrying one white line icon, float above it. As the visitor scrolls, the same tiles regroup per chapter: an arc across the first viewport, a ring, a row with one tile lifted forward for the active service, stations joined by a lit path for the sprint, a cluster for the work. The page never cuts to a new scene; the world keeps moving underneath flat, quiet type.

The default room is a near-black void with one soft electric-blue light field bleeding in from the right edge. For the work chapter the whole world turns into a light grid room: the background, fog and grid lines blend toward pale grey and dark ink, and every piece of chrome that reads the world-light value flips with it. Density is low. Headlines are large and light-weight, body copy is short, and the interface over the scene is thin: square containers, 2px controls, hairline borders and one blue.

The system rejects the stacked-sections agency template and the glowing-orb hero. Depth belongs to the 3D world, not to cards, gradients or glows painted on the interface.

**Key Characteristics:**
- One continuous WebGL scene behind every section, with a flat 56px CSS grid as the no-WebGL fallback.
- Glossy rounded blue tiles with a single white line icon are the recurring signature object.
- One chromatic hue, Nebulyx Blue, across CTAs, active states, chapter numbers and tiles.
- A dark void by default and a light grid room for the work chapter, switched by the world, not by section backgrounds.
- Large, squared Chakra Petch display type over minimal chrome.
- One corner language: 2px on controls, square on containers, soft radius only on the 3D tiles and the logo mark.

## Colors

A monochrome void-and-ink palette carrying a single electric blue, with a pale grey room as the only alternate ground.

### Primary
- **Nebulyx Blue** (#3a5bff): The one interactive and identity color. Primary buttons, the chapter-tag number block, active service and step indicators, selected chips, highlight bullets, the final node of sample flow diagrams, sample tag lines and the text selection. Brightens to **Nebulyx Blue Hover** (#4f6dff) on button hover.
- **Tile Blue** (#1f3dff): The base color of the 3D tile material only. Under ACES tone mapping, a deeper blue emissive and clearcoat reflections it renders close to Nebulyx Blue; never use it as a flat UI fill.
- **Path Blue** (#7d95ff): The lit tube that draws between stations in the sprint chapter.
- **Focus Blue** (#8fa2ff): Focus outlines (2px, 3px offset), the focused field border and the open-state FAQ chevron. Lighter than Nebulyx Blue so it reads on the void.

### Neutral
- **Void** (#05060a): The default world background, fog color, field background and page base.
- **Dialog Surface** (#0b0d14): The booking dialog panel, one step above the void.
- **Grid Room** (#eceef3): The light world background for the work chapter and its no-WebGL fallback.
- **Diagram Well** (#f1f3f8): The inset behind flow diagrams inside sample cards.
- **Paper White** (#ffffff): Text on the void, sample-card surface, grid lines in the dark room.
- **Room Ink** (#0b0d12): Headings and sample tags in the light room.
- **Line Ink** (#11131a): Grid lines and interface ink in the light room; the dark end of the world-light ink blend.
- **Room Body** (#454b5a): Body copy in the light room.
- **Mist** (#d5d9e3): Form labels and highlighted list items on dark.
- **Haze** (#b6bccb): Default body copy on dark.
- **Slate Muted** (#9aa1b2): Footer text, capability descriptions, helper lines.
- **Dim** (#8a91a3): Inactive service-list items and inactive step labels.
- **Dusk** (#7f8799): Placeholders, the secondary line of a two-line statement, inactive step body.
- **Error Rose** (#ff8a8a): Form submission errors only.

### Named Rules
**The One Blue Rule.** Nebulyx Blue is the only chromatic color in the interface. There is no second accent; hierarchy comes from white, the grey steps and the blue, nothing else.

**The Two Rooms Rule.** The world has two rooms: the dark void and the light grid room. The room is changed by the world-light value blending background, fog, grid lines and interface ink together, never by painting a section background on its own.

## Typography

**Display Font:** Chakra Petch (with General Sans, -apple-system, BlinkMacSystemFont, sans-serif)
**Body Font:** General Sans (with -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif)
**Label/Mono Font:** ui-monospace (with SFMono-Regular, Menlo, Monaco, Consolas, monospace)

**Character:** One clean grotesk at light weight does everything from the 8vw headline to the 13px nav, tracked tight at large sizes so headlines read as solid shapes. A small uppercase mono marks numbers and chapters, the only place type becomes technical.

### Hierarchy
- **Display** (400, clamp(3rem, 6.9vw, 8.4rem), 0.94): The first-viewport headline, two lines, bottom-left, revealed line by line from a mask.
- **Headline** (400, clamp(2.4rem, 5.6vw, 5.6rem), 0.98, -0.04em): Section headlines, usually two short lines with a forced break. Sizes flex between clamp(2.2rem, 4.2vw, 4rem) and clamp(2.6rem, 6.2vw, 6.4rem) per chapter.
- **Title** (400, 28px, -0.02em): The active service tagline; 30px for the dialog heading.
- **Title Card** (500, 22px, -0.02em): Sample-card titles; the one place body-scale type takes medium weight.
- **Body** (400, 17px, 1.625): Supporting paragraphs, held to roughly 28-36rem (max-w-md to max-w-xl).
- **Body Small** (400, 14-15px, 1.625): Step descriptions, capability descriptions, card copy.
- **Nav** (500, 13px): Top-bar links and the compact CTA.
- **Label** (mono 400, 12px, 0.12em, uppercase): Chapter names, step numbers and step keys. The "Chapter" caption is 10px at 0.16em, 60% opacity; the SAMPLE tag is 11px at 0.14em.
- **Wordmark** (500, clamp(5rem, 24vw, 30rem), 0.78, -0.06em): The closing NEBULYX wordmark, bleeding off the bottom edge.

### Named Rules
**The Light Display Rule.** Display and headline type stays at weight 400 with negative tracking (-0.04em to -0.045em). Size carries the emphasis; weight never does. Medium (500) is reserved for card titles, nav and the wordmark.

**The Mono Is for Numbers Rule.** The mono face only marks chapter numbers, chapter names, step keys and the SAMPLE tag. It never sets a headline, a sentence or a caption above a heading.

## Layout

Every chapter is a full-viewport stage over the fixed canvas. The content container is 1600px wide with 20px side gutters on phones and 32px from 640px. Long chapters (About 180vh, Services 520vh, Process 360vh, Studio 150vh) pin a 100svh sticky stage and map scroll progress onto state: the active service, the lit step, the tile formation. The Work and FAQ chapters scroll normally with 128px vertical padding (176px from 640px).

Composition anchors to the edges, not the centre: the first-viewport headline sits bottom-left with the supporting sentence and two CTAs bottom-right; the services chapter uses a 12-column grid with the headline and service list in columns 1-5 and the active detail in columns 6-9, leaving the right side to the lifted tile; the closing wordmark spans the full width at the bottom. About and Process centre their headline over the scene. Gaps are 24px between cards and steps and 40px between major columns.

Under 768px the world narrows its camera (fov 52, pulled back), compresses tile spread to 55%, and uses phone-specific formations so tiles sit above or below text instead of behind it. The service list collapses to the active detail only, and step grids drop to two columns.

## Elevation & Depth

Depth lives in the 3D scene and nowhere else. The tiles are physical: a clearcoated, slightly rough blue material with a low environment reflection and a deep blue emissive, lit by a white key light from the upper left and a blue rim light from the right, tone-mapped with ACES Filmic at 0.92 exposure. The grid recedes through distance fade and fog and bends slightly downward with distance, so the floor reads as endless. The blue light field is a radial gradient anchored past the right edge, screen-blended over the canvas, and fades out entirely in the light room.

The interface over the scene is flat. Containers are separated by hairline borders (white at 14-18% on dark), translucency and blur (the nav band at 82% with 14px blur, the ghost button with 8px blur), not by shadow.

### Shadow Vocabulary
- **Sample lift** (`box-shadow: 0 30px 60px -30px rgba(17, 19, 26, 0.35)`): The one DOM shadow, under sample cards in the light room, where the cards also tilt in perspective (rotateY -4deg, 0, 4deg) and straighten and lift 6px on hover.

### Named Rules
**The World Carries Depth Rule.** Only the 3D world and the sample cards in the light room have depth. Buttons, fields, chips, the nav and the dialog stay flat at rest and on hover; state is shown by color, border and a 1px lift, never a glow.

## Shapes

One deliberate corner language. Buttons, fields and chips use a 2px corner: almost square, just softened. Containers are fully square: the dialog, sample cards, the diagram well, the SAMPLE tag, the chapter tag and step number boxes, and the boxes inside flow diagrams. Active indicators are 6px squares in the services list.

The only soft shapes are the world's own objects. Tiles are rounded boxes (corner radius 0.16 in a 1-unit tile, 0.22 deep) with an 0.86 icon face, and the logo mark repeats them as a 32-unit rounded tile (radius 8) with a top gloss band, a white N and four short plus-marker ticks. The grid itself is the third shape: 1.4-unit cells with plus markers on every second intersection.

## Components

### Buttons
Rectangular, quiet, blue or glass, always with a short label and, where it moves the visitor, a 16px line arrow.
- **Shape:** Nearly square (2px).
- **Primary:** Nebulyx Blue fill, white 500-weight text, 48px tall with 20px side padding; 40px tall with 16px padding and 13px text in the top bar; full width at 15px for the dialog submit.
- **Hover / Focus:** Background brightens to Nebulyx Blue Hover and the button lifts 1px over 0.3s on cubic-bezier(0.16, 1, 0.3, 1). Focus shows a 2px Focus Blue outline at 3px offset. Disabled drops to 60% opacity with a wait cursor.
- **Ghost:** White at 6% over an 8px backdrop blur with a 1px white 18% border; hover raises fill to 12% and border to 32%. Used for the secondary first-viewport action and per-service booking.

### Chips
- **Style:** Transparent with a 1px white 18% border, Haze 14px text, 2px corners, 10px by 12px padding, laid out in equal-width grids.
- **State:** Selected chips fill with Nebulyx Blue and white text (aria-pressed). Unselected hover lifts text to white and the border to 40%.

### Cards / Containers
- **Corner Style:** Square (0px).
- **Background:** Sample cards are Paper White in the light room with a Diagram Well inset; the dialog is Dialog Surface with a 1px white 16% border.
- **Shadow Strategy:** Only sample cards carry the Sample Lift shadow (see Elevation & Depth).
- **Border:** Hairlines only; capability lists and FAQ rows use a 1px white 14% rule.
- **Internal Padding:** 24px, 28px from 640px for cards; 24px, 32px from 640px for the dialog.

### Inputs / Fields
- **Style:** Void background, 1px white 18% border, 2px corners, 12px by 14px padding, 16px white text, Dusk placeholder. Labels sit above in Mist at 13px.
- **Focus:** The border turns Focus Blue; no glow.
- **Error / Disabled:** A single Error Rose line under the form at 14px.

### Navigation
- **Style:** A 64px fixed top bar: logo left, four 13px medium links centre, compact primary CTA right. Transparent over the first viewport; after 24px of scroll it becomes a band blending void or grid room at 82% with a 14px blur and a 10% ink hairline.
- **States:** Links sit at 60% opacity and go to 100% on hover and for the current chapter. Ink follows the world-light value, so the bar turns dark-on-light in the work room.
- **Mobile:** A 44px menu toggle opens a void panel at 95% with 18px links separated by white 10% hairlines.

### Chapter Tag
A fixed wayfinder at the bottom-left: a 40px Nebulyx Blue block with the two-digit chapter number in mono, joined to a bordered box holding a 10px "Chapter" caption and the chapter name. Both roll up from below on change (0.6s). It follows the world ink, hides on the final chapter, and shows the number only on phones.

### Service Tile
The signature object. A glossy blue rounded box with one white Lucide line icon (stroke 1.75, about 46% of the face). The first five carry the service icons in order: web window, workflow, chat, search, shopping bag; the rest carry supporting line icons. Tiles drift with a slow bob and sway and ease toward each chapter's formation; the pointer shifts the camera slightly. Reduced motion removes the bob, sway and pointer parallax and snaps formations.

### Sample Card
Illustrative work in the light room: a square white card tilted in perspective, a black SAMPLE tag in the top-right corner, a flow diagram of square boxes joined by blue arrows with the final step filled blue, then a 22px title, a blue service line and short copy.

## Do's and Don'ts

### Do:
- **Do** use Nebulyx Blue (#3a5bff) as the only accent, and Focus Blue (#8fa2ff) for every focus outline at 2px with a 3px offset.
- **Do** keep controls at 2px corners and containers square; save rounded forms for the 3D tiles and the logo mark.
- **Do** put one white line icon on each tile face, never text or a filled glyph.
- **Do** label every illustrative project, mockup or diagram with the black mono SAMPLE tag.
- **Do** switch to the light grid room through the world-light value so background, grid, nav and chapter tag change together.
- **Do** ease state changes on cubic-bezier(0.16, 1, 0.3, 1) and honour reduced motion by removing line reveals, tile drift, card transitions and tag rolls.
- **Do** keep the flat 56px CSS grid fallback in step with the world when WebGL is unavailable.

### Don't:
- **Don't** introduce a second accent hue, a gradient fill on interface elements, or the old cyan.
- **Don't** use pill-shaped buttons or chips, or rounded cards.
- **Don't** add glows or coloured box-shadows to buttons, cards or the nav; the only DOM shadow is the sample card's.
- **Don't** place a centred glowing orb or blob behind headlines; the only light is the blue field anchored at the right edge.
- **Don't** set kickers or eyebrow labels above headings, mono or otherwise.
- **Don't** present client logos, metrics, testimonials or case studies as real proof; illustrative work is labelled SAMPLE.
- **Don't** stack the page as boxed sections over a plain background; every chapter sits on the shared world.
