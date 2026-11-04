export const TILE_COUNT = 18;
export const SERVICE_COUNT = 5;

export const CHAPTERS = ['welcome', 'about', 'services', 'process', 'work', 'studio', 'faq', 'contact'];
export const HOLD = { services: 0.88, process: 0.85, work: 0.8 };

export const STATIONS = [
  [-4.6, -1.3, -0.8],
  [-1.6, -1.3, -3.2],
  [1.6, -1.3, -1.4],
  [4.6, -1.3, -3.4],
];

const tile = (x, y, z, rx = 0, ry = 0, rz = 0, s = 1) => ({ x, y, z, rx, ry, rz, s });
const hash = (i, k) => ((Math.sin(i * 127.1 + k * 311.7) * 43758.5453) % 1 + 1) % 1;

const HERO_SLOTS = (() => {
  const order = [];
  const mid = (TILE_COUNT - 1) / 2;
  const slots = [...Array(TILE_COUNT).keys()].sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
  for (let i = 0; i < TILE_COUNT; i++) order[i] = slots[i];
  return order;
})();

function welcome(narrow) {
  return [...Array(TILE_COUNT)].map((_, i) => {
    const slot = HERO_SLOTS[i];
    const a = -1.3 + (slot / (TILE_COUNT - 1)) * 2.6;
    const c = Math.cos(a);
    const x = Math.sin(a) * 8.6;
    const y = 0.2 + c * 3.1 + (slot % 2) * 0.3;
    const z = 1.2 - c * 8.5;
    const s = 0.8 + (1 - c) * 0.6;
    return tile(x, y + (narrow ? 2.4 : 0), z, 0.18, -a * 0.9, a * 0.12, s);
  });
}

function about() {
  return [...Array(TILE_COUNT)].map((_, i) => {
    const a = (i / TILE_COUNT) * Math.PI * 2 + 0.3;
    const x = Math.cos(a) * 7.4;
    const y = 0.5 + Math.sin(a) * 2.9;
    const z = -3.6 + Math.sin(a * 2) * 1.4;
    return tile(x, y, z, 0.1, -Math.cos(a) * 0.55, 0, 0.72);
  });
}

function services(active, narrow) {
  return [...Array(TILE_COUNT)].map((_, i) => {
    if (narrow && i < SERVICE_COUNT) {
      const isActive = i === active;
      return tile((i - 2) * 0.95, isActive ? -2.55 : -2.85, isActive ? 4.4 : 3.8, 0.45, 0, 0, isActive ? 0.7 : 0.5);
    }
    if (i < SERVICE_COUNT) {
      const isActive = i === active;
      const x = 4.5 + (i - 2) * 0.95;
      return isActive
        ? tile(3.7, 0.8, 2.6, 0.05, -0.32, 0, 1.4)
        : tile(x, -0.9, -0.8, 0.2, -0.15 * (i - 2), 0, 0.72);
    }
    if (narrow) return tile((hash(i, 1) - 0.5) * 10, 30, -24, 0, 0, 0, 0.4);
    const x = 2 + hash(i, 1) * 11;
    const y = 2.8 + hash(i, 2) * 3;
    const z = -9 - hash(i, 3) * 8;
    return tile(x, y, z, hash(i, 4), hash(i, 5) * 2, 0, 0.55);
  });
}

function process() {
  return [...Array(TILE_COUNT)].map((_, i) => {
    if (i < STATIONS.length) {
      const [x, y, z] = STATIONS[i];
      return tile(x, y + 0.35, z, -Math.PI / 2 + 0.35, 0, 0, 1.15);
    }
    const x = (hash(i, 6) - 0.5) * 20;
    const z = -3 - hash(i, 7) * 12;
    return tile(x, -1.25, z, -Math.PI / 2 + 0.25, 0, hash(i, 8) * 0.6, 0.6);
  });
}

function work() {
  return [...Array(TILE_COUNT)].map((_, i) => {
    if (i < 6) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      return tile(3.4 + col * 1.35, 2.9 - row * 1.35, -5.5, 0.08, -0.35, 0, 0.95);
    }
    return tile((hash(i, 15) - 0.5) * 30, 10 + hash(i, 16) * 4, -28, 0, 0, 0, 0.4);
  });
}

function faq(narrow) {
  return [...Array(TILE_COUNT)].map((_, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const k = Math.floor(i / 2);
    const x = side * (narrow ? 4.5 : 7.6 + (k % 3) * 0.9);
    const y = -0.6 + (k % 5) * 0.9;
    const z = (narrow ? -12 : -2.5) - (k % 3) * 1.8;
    return tile(x, y, z, 0.1, side * -0.6, 0, 0.75);
  });
}

function studio() {
  const ry = 0.62;
  const cos = Math.cos(ry);
  const sin = Math.sin(ry);
  return [...Array(TILE_COUNT)].map((_, i) => {
    const layer = Math.floor(i / 6);
    const k = i % 6;
    const lx = ((k % 3) - 1) * 1.2;
    const lz = (Math.floor(k / 3) - 0.5) * 1.2;
    const x = 3.2 + lx * cos + lz * sin;
    const z = 0.4 - lx * sin + lz * cos;
    const y = -1.1 + layer * 1.15;
    return tile(x, y, z, -Math.PI / 2 + 0.62, ry, 0, 0.92);
  });
}

function contact() {
  const hero = [
    tile(3.6, 1.6, 1.6, 0.1, -0.45, 0.05, 1.7),
    tile(6.0, 0.4, -0.6, 0.15, -0.7, 0, 1.5),
    tile(4.4, -0.9, 2.6, 0.2, -0.3, -0.06, 1.25),
  ];
  return [...Array(TILE_COUNT)].map((_, i) => {
    if (i < hero.length) return hero[i];
    const x = (hash(i, 10) - 0.5) * 26;
    const y = 3 + hash(i, 11) * 4;
    const z = -14 - hash(i, 12) * 8;
    return tile(x, y, z, hash(i, 13), hash(i, 14), 0, 0.5);
  });
}

export function formationFor(chapter, sub = 0, narrow = false) {
  switch (chapter) {
    case 'welcome': return welcome(narrow);
    case 'about': return about();
    case 'services': return services(sub, narrow);
    case 'faq': return faq(narrow);
    case 'process': return process();
    case 'work': return work();
    case 'studio': return studio();
    default: return contact();
  }
}

export const LIGHT = { work: 1 };
