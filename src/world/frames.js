export const LAYOUTS = ['orbit', 'cloud', 'floor', 'board', 'stack', 'rise', 'tunnel'];

export const DEFAULTS = {
  tx: 0, ty: 1.2, tz: -3, azim: 0, elev: 6, dist: 12, roll: 0, fov: 40, pan: 0, panY: 0,
  light: 0, sky: 0, dust: 0.3, grid: 1,
  gx: 0, gy: -1.6, gz: -6, gYaw: 0, gPitch: 0, gSpin: 0, wave: 0.5, curl: 0, flow: 0,
  ring: 4, ringY: 0, ringTilt: 20, ringDepth: 0.7, ringScale: 1, ringPace: 0.08, ringFace: 0,
  layers: 0, path: 0, logo: 0,
  orbit: 0, cloud: 0, floor: 0, board: 0, stack: 0, rise: 0, tunnel: 0,
};

const frame = (values) => ({ ...DEFAULTS, ...values });

const FRAMES = {
  welcome: frame({
    tx: 2.6, ty: 1.1, tz: -3, azim: 16, elev: 9, dist: 15, pan: 0.34, panY: 0.34, sky: 0.5, dust: 0.25,
    gx: 2, gy: -2.2, gz: -9, gYaw: -14, gPitch: 34, wave: 0.8, flow: 2.4,
    orbit: 1, ring: 5.6, ringY: 1.4, ringTilt: 22, ringDepth: 1, ringScale: 1.1, ringPace: 0.12, logo: 0.86,
  }),
  about: frame({
    tx: 0, ty: 1.5, tz: 0, azim: 5, elev: 4, dist: 11, roll: -2, fov: 42, sky: -0.5, dust: 1,
    gx: 0, gy: 1.4, gz: -8, gPitch: 90, gSpin: 16, wave: 1, flow: 1.6, grid: 0.6,
    orbit: 1, ring: 6.2, ringTilt: 84, ringDepth: 0.62, ringScale: 0.8, ringFace: 1, ringPace: 0.1,
  }),
  'about-wide': frame({
    tx: 0, ty: 1.2, tz: 0, azim: -12, elev: 11, dist: 16, fov: 42, sky: -0.9, dust: 1,
    gx: 0, gy: 1.4, gz: -10, gPitch: 90, gSpin: -10, wave: 1, flow: 1.2, grid: 0.4,
    orbit: 1, ring: 7.6, ringTilt: 88, ringDepth: 0.62, ringScale: 1.1, ringFace: 1, ringPace: 0.06,
  }),
  services: frame({
    tx: 1.8, ty: 1.9, tz: -6.5, azim: 12, elev: 6, dist: 17.5, pan: 0.74, sky: -1.2, dust: 0.3,
    gx: 1.8, gy: 1.7, gz: -7.6, gYaw: -18, gPitch: 90, wave: 0.3, board: 1,
  }),
  'services-turn': frame({
    tx: 1.8, ty: 1.7, tz: -6.5, azim: -6, elev: 12, dist: 16.5, pan: 0.74, sky: -1, dust: 0.3,
    gx: 1.8, gy: 1.7, gz: -7.6, gYaw: -6, gPitch: 90, wave: 0.3, board: 1,
  }),
  process: frame({
    tx: 0, ty: -2, tz: -2, azim: 10, elev: 56, dist: 14.5, sky: -1.6, dust: 0.15,
    gx: 0, gy: -2, gz: -2, wave: 0.2, floor: 1, path: 1, panY: -0.08,
  }),
  'process-turn': frame({
    tx: 0, ty: -2, tz: -2, azim: -14, elev: 44, dist: 13, sky: -1.5, dust: 0.15,
    gx: 0, gy: -2, gz: -2, wave: 0.25, floor: 1, path: 1, panY: -0.08,
  }),
  work: frame({
    tx: 0, ty: -0.4, tz: -3, azim: -16, elev: 24, dist: 14, light: 1, sky: -1.6, dust: 0,
    gx: 0, gy: -1.5, gz: -3, wave: 0.45, floor: 1,
  }),
  'work-fly': frame({
    tx: 0, ty: 0, tz: -7, azim: 24, elev: 12, dist: 9, fov: 46, light: 1, sky: -1.6, dust: 0,
    gx: 0, gy: -1.5, gz: -3, gSpin: 18, wave: 0.6, flow: 1.4, floor: 1,
  }),
  studio: frame({
    tx: 0, ty: 0.4, tz: -5, azim: 28, elev: 30, dist: 16, pan: 0.46, sky: 0.2, dust: 0.3,
    gx: 0, gy: -1.2, gz: -5, gSpin: 45, wave: 0.3, layers: 1, stack: 1,
  }),
  'studio-orbit': frame({
    tx: 0, ty: -0.4, tz: -5, azim: 66, elev: 40, dist: 14, pan: 0.46, sky: 0.2, dust: 0.3,
    gx: 0, gy: -1.2, gz: -5, gSpin: 45, wave: 0.3, layers: 1, stack: 1,
  }),
  faq: frame({
    tx: 0, ty: 1, tz: -4, azim: -8, elev: 8, dist: 15, pan: 0.55, sky: -0.9, dust: 0.8,
    gx: 0, gy: -2.4, gz: -6, wave: 0.55, flow: 1, grid: 0.7, cloud: 1,
  }),
  contact: frame({
    tx: 0, ty: 1, tz: -24, azim: 4, elev: 2, dist: 24, fov: 44, pan: 0.2, panY: 0.2, sky: 0.3, dust: 1,
    gx: 0, gy: -2, gz: -10, wave: 0.4, grid: 0, tunnel: 1, logo: 1.5,
  }),
};

const NARROW = {
  welcome: { pan: 0, panY: 0.5, ringScale: 0.95, ring: 5, dist: 17, logo: 0.72 },
  about: { panY: 0.78, ring: 2.6, ringTilt: 20, ringY: 0.4, ringScale: 0.62, ringFace: 0.6, roll: 0 },
  'about-wide': { panY: -0.72, ring: 3.2, ringTilt: 30, ringScale: 0.7 },
  services: { pan: 0, panY: -0.66, dist: 21 },
  'services-turn': { pan: 0, panY: -0.66, dist: 20 },
  process: { panY: 0.1, elev: 68, dist: 18 },
  'process-turn': { panY: 0.1, elev: 60, dist: 17 },
  work: { panY: -0.25 },
  studio: { pan: 0, panY: -1 },
  'studio-orbit': { pan: 0, panY: -0.95 },
  faq: { pan: 0, panY: -0.5 },
  contact: { pan: 0, panY: 0.5 },
};

const HOLD_SCREENS = 1.7;
const ease = (t) => t * 0.7 + t * t * (3 - 2 * t) * 0.3;

export function createTimeline() {
  let keys = [{ top: 0, frame: FRAMES.welcome, dir: 1 }];
  let height = -1;
  let checked = 0;

  function measure(narrow) {
    height = document.documentElement.scrollHeight;
    const marks = [...document.querySelectorAll('[data-kf]')]
      .map((el) => ({ name: el.dataset.kf, top: el.getBoundingClientRect().top + window.scrollY }))
      .sort((a, b) => a.top - b.top);
    const out = [];
    for (const { name, top } of marks) {
      const base = FRAMES[name];
      if (!base) continue;
      const f = narrow ? { ...base, ...NARROW[name] } : base;
      const prev = out[out.length - 1];
      const swing = prev ? f.azim - prev.frame.azim : 0;
      const dir = Math.abs(swing) > 1 ? Math.sign(swing) : prev ? -prev.dir : 1;
      out.push({ top, frame: f, dir });
    }
    if (out.length) keys = out;
  }

  function sample(y, narrow, state, info) {
    const now = performance.now();
    if (now - checked > 500) {
      checked = now;
      if (document.documentElement.scrollHeight !== height) measure(narrow);
    }
    const screen = window.innerHeight;
    const first = keys[0];
    const last = keys[keys.length - 1];
    const hold = (k, drift) => {
      Object.assign(state, k.frame);
      info.from = k.frame; info.to = k.frame; info.t = 0; info.drift = drift; info.dir = k.dir;
    };
    if (y <= first.top) return hold(first, 0);
    if (y >= last.top) return hold(last, (y - last.top) / screen);
    let i = 0;
    while (i < keys.length - 2 && keys[i + 1].top <= y) i++;
    const a = keys[i];
    const b = keys[i + 1];
    const span = Math.min(b.top - a.top, HOLD_SCREENS * screen);
    const start = b.top - span;
    const t = Math.min(1, Math.max(0, (y - start) / Math.max(1, span)));
    const e = ease(t);
    for (const key in a.frame) state[key] = a.frame[key] + (b.frame[key] - a.frame[key]) * e;
    info.from = a.frame; info.to = b.frame; info.t = t; info.dir = a.dir;
    info.drift = ((Math.min(y, start) - a.top) / screen) * (1 - e);
  }

  return { measure, sample };
}
