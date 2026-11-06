# Scroll world motion study (puture.co.kr/en, inspected 2026-11-05)

Observed in a live 1440×900 session and in the shipped bundle. Techniques only; no code, assets, copy or preset values are reused.

## Stack
React + react-three-fiber, Three r18x, Lenis 1.3, GSAP. One fixed canvas, `frameloop: always`, dpr ≤ 1.75 with an FPS-driven step-down.

## The scroll model
- Page is ~112,000 px (~125 screens). Long sticky scenes hold the camera on one composition while text scrolls.
- DOM elements carry `data-kf="<frame>"`. Each frame is a flat record of ~40 numbers (camera, grid sheet, layouts, light).
- Sampling: hold the previous frame, then transition only during the last `min(gap, 2.2 screens)` before the next marker. Ease = `0.7·t + 0.3·smoothstep(t)` (mostly linear: motion tracks the scroll, it never "snaps").
- Every sampled value is then damped (`damp(λ≈3.2, dt)`) into the live state. One smoothing stage only.

## Camera rig
- Orbit around a target: azimuth, elevation, distance, roll, fov.
- Always alive: slow sine drift on azimuth/elevation/distance (periods 25–50 s), pointer parallax (±2.5° / ±1.5°).
- While holding inside a frame, azimuth keeps orbiting ~3°/screen scrolled (capped), direction alternating per frame, and fades out as the next transition takes over.
- Scroll speed widens fov a few degrees.
- Composition via lens shift (`setViewOffset`), not by moving objects: the subject sits right of or above the text.

## Grid sheet
- Finite sheet (36×36) with a rounded fade, plus-marks every other cell.
- Fully transformable: position, yaw, pitch, spin. Pitch 90 turns the floor into a wall behind the text.
- Vertex wave, optional curl (sheet bends into a valley), conveyor `flow` that advances with time and scroll velocity, settling to a whole cell when idle.

## Tiles
- ~18 icon tiles. Each tile has a weight per layout (ring orbit, drifting cloud, settled on the sheet, board, stack, rise, tunnel stream).
- Layouts are alive (rings revolve, streams loop, rises climb); a tile's pose is the weighted blend of its layouts, rotation by slerp.
- Transitions stagger: per-tile delay (0–0.5 of the window, mostly ordered + some noise), arc lift proportional to how much the layout changes.
- Tiles placed "on the sheet" inherit its transform, so they ride the floor as it tilts into a wall.

## Light
- A `light` value cross-fades the whole world from night to a pale room for the work chapter; DOM tone follows it.
- A soft blue sky glow and a star dust field fade per frame.

## Nebulyx mapping
Implemented in `src/world/frames.js`, `src/world/grid.js`, `src/world/World.js`, markers in `src/components/site/Sections.jsx`.
