import {
  ACESFilmicToneMapping, CatmullRomCurve3, Clock, Color, DirectionalLight, Fog, Group,
  Mesh, MeshBasicMaterial, MeshPhysicalMaterial, PerspectiveCamera, PlaneGeometry,
  PMREMGenerator, Scene, SRGBColorSpace, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createGrid } from './grid';
import { iconTexture, SERVICE_ICONS, EXTRA_ICONS } from './icons';
import { CHAPTERS, HOLD, LIGHT, STATIONS, TILE_COUNT, formationFor } from './formations';
import { worldState } from './store';

const DARK = new Color('#05060a');
const LIGHT_BG = new Color('#eceef3');
const LINE_DARK = new Color('#ffffff');
const LINE_LIGHT = new Color('#11131a');
const TILE_BLUE = new Color('#1f3dff');

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (a, b, v) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a, b, t) => a + (b - a) * t;

export default class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.92;

    this.scene = new Scene();
    this.scene.background = DARK.clone();
    this.scene.fog = new Fog(DARK.clone(), 14, 48);

    const pmrem = new PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    this.camera = new PerspectiveCamera(36, 1, 0.1, 200);
    this.cameraBase = new Vector3(0, 1.3, 11);
    this.lookAt = new Vector3(0, 0.5, 0);

    const key = new DirectionalLight('#ffffff', 1.1);
    key.position.set(-4, 6, 8);
    const rim = new DirectionalLight('#5c78ff', 1.6);
    rim.position.set(8, 2, -2);
    this.scene.add(key, rim);

    this.grid = createGrid();
    this.scene.add(this.grid);

    this.buildTiles();
    this.buildPath();

    this.clock = new Clock();
    this.xScale = 1;
    this.visible = true;
    this.resize();
  }

  buildTiles() {
    const geometry = new RoundedBoxGeometry(1, 1, 0.22, 4, 0.16);
    const faceGeometry = new PlaneGeometry(0.86, 0.86);
    const icons = [...SERVICE_ICONS, ...EXTRA_ICONS];
    this.tiles = [];
    this.group = new Group();
    for (let i = 0; i < TILE_COUNT; i++) {
      const material = new MeshPhysicalMaterial({
        color: TILE_BLUE,
        metalness: 0.0,
        roughness: 0.42,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 0.32,
        emissive: new Color('#0a21c8'),
        emissiveIntensity: 0.38,
      });
      const mesh = new Mesh(geometry, material);
      const face = new Mesh(
        faceGeometry,
        new MeshBasicMaterial({ map: iconTexture(icons[i % icons.length]), transparent: true, depthWrite: false })
      );
      face.position.z = 0.112;
      mesh.add(face);
      const start = formationFor('welcome')[i];
      mesh.position.set(start.x, start.y, start.z);
      mesh.rotation.set(start.rx, start.ry, start.rz);
      mesh.scale.setScalar(start.s);
      this.group.add(mesh);
      this.tiles.push({ mesh, seed: i * 1.7 });
    }
    this.scene.add(this.group);
  }

  buildPath() {
    const curve = new CatmullRomCurve3(STATIONS.map(([x, y, z]) => new Vector3(x, y + 0.02, z)));
    const geometry = new TubeGeometry(curve, 160, 0.035, 8, false);
    this.pathCount = geometry.index.count;
    geometry.setDrawRange(0, 0);
    this.path = new Mesh(geometry, new MeshBasicMaterial({ color: '#7d95ff', transparent: true, opacity: 0.95 }));
    this.scene.add(this.path);
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.maxDpr = Math.min(window.devicePixelRatio, 1.75);
    this.dpr = this.dpr ? Math.min(this.dpr, this.maxDpr) : this.maxDpr;
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    const narrow = w < 768;
    this.narrow = narrow;
    this.camera.fov = narrow ? 52 : 36;
    this.cameraBase.set(0, narrow ? 1.6 : 1.3, narrow ? 13 : 11);
    this.xScale = narrow ? 0.55 : Math.min(1, w / 1440 + 0.15);
    this.zShift = narrow ? -3 : 0;
    this.camera.updateProjectionMatrix();
  }

  targets() {
    const w = Math.max(0, Math.min(worldState.w, CHAPTERS.length - 1));
    const k = Math.floor(w);
    const f = w - k;
    const name = CHAPTERS[k];
    const next = CHAPTERS[Math.min(k + 1, CHAPTERS.length - 1)];
    const hold = HOLD[name] ?? 0.55;
    const morph = smooth(hold, 1, f);
    const local = clamp01(f / hold);

    const activeService = worldState.serviceActive ?? Math.min(4, Math.floor(local * 5));
    const from = formationFor(name, activeService, this.narrow);
    const to = formationFor(next, 0, this.narrow);
    const blended = from.map((a, i) => {
      const b = to[i];
      return {
        x: lerp(a.x, b.x, morph), y: lerp(a.y, b.y, morph), z: lerp(a.z, b.z, morph),
        rx: lerp(a.rx, b.rx, morph), ry: lerp(a.ry, b.ry, morph), rz: lerp(a.rz, b.rz, morph),
        s: lerp(a.s, b.s, morph),
      };
    });

    const light = lerp(LIGHT[name] ?? 0, LIGHT[next] ?? 0, morph);
    const pathWeight = name === 'process' ? 1 - morph : 0;
    const pathProgress = name === 'process' ? local : 0;
    return { blended, light, pathWeight, pathProgress };
  }

  adaptQuality(dt) {
    this.frameTimes = this.frameTimes ?? [];
    this.frameTimes.push(dt);
    if (this.frameTimes.length < 90) return;
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    this.frameTimes.length = 0;
    let next = this.dpr;
    if (avg > 1 / 45) next = Math.max(1, this.dpr - 0.25);
    else if (avg < 1 / 58) next = Math.min(this.maxDpr, this.dpr + 0.25);
    if (next !== this.dpr) {
      this.dpr = next;
      this.renderer.setPixelRatio(next);
      this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    }
  }

  update() {
    const raw = this.clock.getDelta();
    if (raw > 0 && raw < 0.25) this.adaptQuality(raw);
    const dt = Math.min(raw, 0.05);
    const t = this.clock.elapsedTime;
    const reduced = worldState.reduced;
    const ease = reduced ? 1 : 1 - Math.exp(-dt * 4.5);
    const { blended, light, pathWeight, pathProgress } = this.targets();

    this.tiles.forEach(({ mesh, seed }, i) => {
      const g = blended[i];
      const bob = reduced ? 0 : Math.sin(t * 0.7 + seed) * 0.07;
      mesh.position.x += (g.x * this.xScale - mesh.position.x) * ease;
      mesh.position.y += (g.y + bob - mesh.position.y) * ease;
      mesh.position.z += (g.z + this.zShift - mesh.position.z) * ease;
      mesh.rotation.x += (g.rx - mesh.rotation.x) * ease;
      mesh.rotation.y += (g.ry + (reduced ? 0 : Math.sin(t * 0.4 + seed) * 0.05) - mesh.rotation.y) * ease;
      mesh.rotation.z += (g.rz - mesh.rotation.z) * ease;
      const s = mesh.scale.x + (g.s - mesh.scale.x) * ease;
      mesh.scale.setScalar(s);
    });

    this.lightAmount = (this.lightAmount ?? 0) + (light - (this.lightAmount ?? 0)) * ease;
    const bg = DARK.clone().lerp(LIGHT_BG, this.lightAmount);
    this.scene.background.copy(bg);
    if (Math.abs(this.lightAmount - (this.lastLight ?? -1)) > 0.005) {
      this.lastLight = this.lightAmount;
      document.documentElement.style.setProperty('--world-light', this.lightAmount.toFixed(3));
    }
    this.scene.fog.color.copy(bg);
    this.grid.material.uniforms.uLine.value.copy(LINE_DARK).lerp(LINE_LIGHT, this.lightAmount);
    this.grid.material.uniforms.uOpacity.value = lerp(0.9, 0.55, this.lightAmount);

    const drawn = Math.floor(this.pathCount * pathProgress * pathWeight);
    this.path.geometry.setDrawRange(0, drawn - (drawn % 3));
    this.path.visible = drawn > 0;

    const px = reduced ? 0 : worldState.pointer.x * 0.35;
    const py = reduced ? 0 : worldState.pointer.y * 0.2;
    this.camera.position.set(this.cameraBase.x + px, this.cameraBase.y + py, this.cameraBase.z);
    this.camera.lookAt(this.lookAt);
    this.grid.material.uniforms.uCamera.value.copy(this.camera.position);

    this.renderer.render(this.scene, this.camera);
  }

  start() {
    const loop = () => {
      this.raf = requestAnimationFrame(loop);
      if (this.visible) this.update();
    };
    loop();
    this.onVisibility = () => {
      this.visible = document.visibilityState === 'visible';
      this.clock.getDelta();
    };
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.scene.traverse((o) => {
      o.geometry?.dispose();
      if (o.material) {
        o.material.map?.dispose();
        o.material.dispose();
      }
    });
    this.renderer.dispose();
  }
}
