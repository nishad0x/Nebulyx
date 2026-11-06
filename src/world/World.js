import {
  AdditiveBlending, BackSide, BufferAttribute, BufferGeometry, CanvasTexture, CatmullRomCurve3, EdgesGeometry, ExtrudeGeometry, LineBasicMaterial, Shape, ShapeGeometry, Sprite, SpriteMaterial, Clock, Color,
  DirectionalLight, DoubleSide, Euler, Fog, Group, LineSegments, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, Object3D,
  PerspectiveCamera, PlaneGeometry, PMREMGenerator, Points, PointsMaterial, Quaternion, Scene,
  ShaderMaterial, SphereGeometry, SRGBColorSpace, ACESFilmicToneMapping, TubeGeometry, Vector3,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CELL, createSheet, sheetHeight } from './grid';
import { iconTexture, SERVICE_ICONS, EXTRA_ICONS } from './icons';
import { CHAPTERS, SERVICE_COUNT, TILE_COUNT } from './formations';
import { DEFAULTS, LAYOUTS, createTimeline } from './frames';
import { worldState } from './store';
import { LOW_POWER } from './quality';

const DARK = new Color('#05060a');
const LIGHT_BG = new Color('#eceef3');
const LINE_DARK = new Color('#ffffff');
const LINE_LIGHT = new Color('#11131a');
const TILE_BLUE = new Color('#1f3dff');
const DEG = Math.PI / 180;
const TAU = Math.PI * 2;
const N = TILE_COUNT;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt));
const hash = (i, k) => ((Math.sin(i * 127.1 + k * 311.7) * 43758.5453) % 1 + 1) % 1;

const FLOOR = [
  [-3, 1], [-1, -1], [1, 0], [3, -2],
  [-5, -2], [-2, 3], [0, -4], [2, 3], [4, 1], [-4, -5], [5, -4], [-6, 2],
  [6, 3], [-1, 5], [3, -6], [-3, -3], [1, -7], [-6, -6],
];
const STATIONS = FLOOR.slice(0, 4);

const LOGO_CX = 54;
const LOGO_CY = 53;
const LOGO_SIZE = 0.046;
const LOGO_DROP = 0.7;
const LOGO_GLOW = 300;
const STAR_COUNT = LOW_POWER ? 900 : 2200;
const MAX_DPR = LOW_POWER ? 1.5 : 1.75;
const MIN_DPR = LOW_POWER ? 0.85 : 1;
const QUALITY_WINDOW = LOW_POWER ? 45 : 90;
const INTRO_ROLL = LOW_POWER ? 110 : 220;
const INTRO_FOV = 52;
const INTRO_SPIN = 7.85;
const TUNNEL_COUNT = LOW_POWER ? 8 : 16;
const TUNNEL_GAP = LOW_POWER ? 14 : 7;
const TUNNEL_SCALE = 0.13;
const TUNNEL_TWIST = 0.14;
const TUNNEL_SPEED = 0.42;

function logoShape(points) {
  const s = new Shape();
  points.forEach(([x, y], i) => (i ? s.lineTo(x - LOGO_CX, LOGO_CY - y) : s.moveTo(x - LOGO_CX, LOGO_CY - y)));
  s.closePath();
  return s;
}

function landingKick(intro) {
  return intro > 0.82 && intro < 1 ? Math.sin((Math.PI * (intro - 0.82)) / 0.18) : 0;
}
const LOGO_GLOW_ALPHA = 0.55;
const LOGO_LEFT = [[12, 20], [36, 6], [36, 74], [12, 88]];
const LOGO_DIAGONAL = [[36, 28], [76, 80], [76, 100], [36, 48]];
const LOGO_RIGHT = [[76, 34], [96, 20], [96, 88], [76, 100]];

const UP = new Vector3(0, 1, 0);
const X_AXIS = new Vector3(1, 0, 0);
const FACE_UP = new Quaternion().setFromAxisAngle(X_AXIS, -Math.PI / 2);

const skyVertex = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const skyFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uSun;
  uniform float uStrength;
  varying vec3 vDir;
  void main() {
    float d = max(dot(normalize(vDir), uSun), 0.0);
    float glow = pow(d, 3.0) * 0.85 + pow(d, 14.0) * 0.6;
    gl_FragColor = vec4(uColor * glow * uStrength, 1.0);
  }
`;

export default class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new WebGLRenderer({ canvas, antialias: !LOW_POWER, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.92;

    this.scene = new Scene();
    this.scene.background = DARK.clone();
    this.scene.fog = new Fog(DARK.clone(), 22, 72);

    const pmrem = new PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    this.camera = new PerspectiveCamera(40, 1, 0.1, 220);

    const key = new DirectionalLight('#ffffff', 1.1);
    key.position.set(-4, 6, 8);
    const rim = new DirectionalLight('#5c78ff', 1.6);
    rim.position.set(8, 2, -2);
    this.scene.add(key, rim);

    this.buildSky();
    this.buildDust();
    this.sheet = createSheet();
    this.scene.add(this.sheet);
    this.buildTiles();
    this.buildPath();
    this.buildLogo();
    this.buildTunnel();

    this.timeline = createTimeline();
    this.target = { ...DEFAULTS };
    this.state = { ...DEFAULTS };
    this.info = { from: DEFAULTS, to: DEFAULTS, t: 0, drift: 0, dir: 1 };
    this.ringAngle = 0;
    this.travel = 0;
    this.vel = 0;
    this.pointer = { x: 0, y: 0 };
    this.first = true;

    this.clock = new Clock();
    this.visible = true;
    this.resize();
  }

  buildSky() {
    const material = new ShaderMaterial({
      vertexShader: skyVertex,
      fragmentShader: skyFragment,
      side: BackSide,
      depthWrite: false,
      depthTest: false,
      fog: false,
      blending: AdditiveBlending,
      transparent: true,
      uniforms: {
        uColor: { value: new Color('#2a56ff') },
        uSun: { value: new Vector3(0.75, 0.22, -0.62).normalize() },
        uStrength: { value: 0 },
      },
    });
    this.sky = new Mesh(new SphereGeometry(150, 32, 16), material);
    this.sky.renderOrder = -2;
    this.sky.frustumCulled = false;
    this.scene.add(this.sky);
  }

  buildDust() {
    const count = STAR_COUNT;
    const seeds = new Float32Array(count * 3);
    const lineSeeds = new Float32Array(count * 6);
    const tails = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      for (let k = 0; k < 3; k++) {
        const v = hash(i, 21 + k);
        seeds[i * 3 + k] = v;
        lineSeeds[i * 6 + k] = v;
        lineSeeds[i * 6 + 3 + k] = v;
      }
      tails[i * 2 + 1] = 1;
    }
    const uniforms = {
      uTravel: { value: 0 },
      uStreak: { value: 0 },
      uOpacity: { value: 0 },
      uTime: { value: 0 },
      uScale: { value: 400 },
      uYaw: { value: 0 },
      uPitch: { value: 0 },
    };
    const common = /* glsl */ `
      attribute vec3 seed;
      uniform float uTravel;
      uniform float uStreak;
      uniform float uTime;
      uniform float uYaw;
      uniform float uPitch;
      varying float vA;
      varying float vTint;
      const float L = 90.0;
      vec3 star(float tail) {
        vec3 p;
        p.z = mod(seed.z * L + uTravel, L) - (L - 2.0);
        p.x = (fract(seed.x + uYaw * 0.5) - 0.5) * 64.0;
        p.y = (fract(seed.y * 1.37 + uPitch * 0.5) - 0.5) * 46.0;
        float r = length(p.xy);
        p.xy += normalize(p.xy + 1e-4) * max(0.0, 2.2 - r);
        p.z -= uStreak * tail;
        float far = smoothstep(-(L - 2.0), -(L - 2.0) * 0.55, p.z);
        float near = 1.0 - smoothstep(-2.5, 0.8, p.z);
        vA = far * near * (0.55 + 0.45 * sin(uTime * 1.7 + seed.x * 61.0));
        vTint = fract(seed.z * 7.13);
        return p;
      }
    `;
    const frag = /* glsl */ `
      uniform float uOpacity;
      varying float vA;
      varying float vTint;
      vec3 tint() { return mix(vec3(0.78, 0.84, 1.0), vec3(0.42, 0.55, 1.0), step(0.7, vTint)); }
    `;
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(count * 3), 3));
    geometry.setAttribute('seed', new BufferAttribute(seeds, 3));
    this.dust = new Points(geometry, new ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexShader: common + /* glsl */ `
        uniform float uScale;
        void main() {
          vec3 p = star(0.0);
          gl_Position = projectionMatrix * vec4(p, 1.0);
          gl_PointSize = clamp(uScale * (0.07 + seed.x * 0.1) / -p.z, 1.4, 7.0);
        }
      `,
      fragmentShader: frag + /* glsl */ `
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = (1.0 - smoothstep(0.15, 0.5, d)) * vA * uOpacity * 1.3;
          if (a < 0.004) discard;
          gl_FragColor = vec4(tint() * a, a);
        }
      `,
    }));
    this.dust.frustumCulled = false;
    this.dust.renderOrder = -1;

    const lines = new BufferGeometry();
    lines.setAttribute('position', new BufferAttribute(new Float32Array(count * 6), 3));
    lines.setAttribute('seed', new BufferAttribute(lineSeeds, 3));
    lines.setAttribute('tail', new BufferAttribute(tails, 1));
    this.streaks = new LineSegments(lines, new ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexShader: common + /* glsl */ `
        attribute float tail;
        varying float vTail;
        void main() {
          vec3 p = star(tail);
          vTail = tail;
          gl_Position = projectionMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: frag + /* glsl */ `
        varying float vTail;
        void main() {
          float a = vA * uOpacity * (1.0 - vTail) * 0.75;
          if (a < 0.004) discard;
          gl_FragColor = vec4(tint() * a, a);
        }
      `,
    }));
    this.streaks.frustumCulled = false;
    this.streaks.renderOrder = -1;
    this.starUniforms = uniforms;
    this.starTravel = 0;
    this.scene.add(this.dust, this.streaks);
  }

  buildTiles() {
    const geometry = new RoundedBoxGeometry(1, 1, 0.22, LOW_POWER ? 2 : 4, 0.16);
    const faceGeometry = new PlaneGeometry(0.86, 0.86);
    const icons = [...SERVICE_ICONS, ...EXTRA_ICONS];
    const material = new MeshPhysicalMaterial({
      color: TILE_BLUE,
      metalness: 0,
      roughness: 0.42,
      clearcoat: LOW_POWER ? 0 : 1,
      clearcoatRoughness: 0.06,
      envMapIntensity: 0.32,
      emissive: new Color('#0a21c8'),
      emissiveIntensity: 0.38,
    });
    this.tiles = [];
    this.group = new Group();
    for (let i = 0; i < N; i++) {
      const mesh = new Mesh(geometry, material);
      const face = new Mesh(
        faceGeometry,
        new MeshBasicMaterial({ map: iconTexture(icons[i % icons.length]), transparent: true, depthWrite: false })
      );
      face.position.z = 0.112;
      mesh.add(face);
      mesh.scale.setScalar(0.001);
      this.group.add(mesh);
      this.tiles.push({
        mesh,
        weights: Object.fromEntries(LAYOUTS.map((k) => [k, 0])),
        scale: 0,
        focus: 0,
        delay: 0.5 * (0.75 * (i / (N - 1)) + 0.25 * hash(i, 31)),
        arc: 0.45 + hash(i, 32) * 0.75,
      });
    }
    this.scene.add(this.group);
    this.pose = { p: new Vector3(), q: new Quaternion(), scale: 1, show: 1 };
    this.tmp = { obj: new Object3D(), v: new Vector3(), v2: new Vector3(), q: new Quaternion(), e: new Euler(), acc: new Vector3(), v3: new Vector3(), qa: new Quaternion() };
  }

  buildLogo() {
    const shape = logoShape;
    const extrude = { depth: 9, bevelEnabled: true, bevelThickness: 1.2, bevelSize: 0.9, bevelSegments: LOW_POWER ? 1 : 3 };
    this.renderer.transmissionResolutionScale = 0.5;
    const solid = new MeshPhysicalMaterial(LOW_POWER ? {
      color: '#3a5bff', metalness: 0.2, roughness: 0.12, envMapIntensity: 1.6,
      emissive: new Color('#3a5bff'), emissiveIntensity: 0.4,
      transparent: true, opacity: 0.82,
    } : {
      color: '#dfe6ff', metalness: 0, roughness: 0.06, transmission: 1, ior: 1.5, thickness: 1.4,
      attenuationColor: new Color('#3a5bff'), attenuationDistance: 5,
      clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 1.6,
      emissive: new Color('#3a5bff'), emissiveIntensity: 0.34,
    });
    const light = new MeshPhysicalMaterial({
      color: '#e8edff', metalness: 1, roughness: 0.1, envMapIntensity: 1.8,
      clearcoat: LOW_POWER ? 0 : 1, clearcoatRoughness: 0.05,
    });
    this.logo = new Group();
    this.logo.add(
      new Mesh(new ExtrudeGeometry([shape(LOGO_LEFT), shape(LOGO_RIGHT)], extrude), solid),
      new Mesh(new ExtrudeGeometry(shape(LOGO_DIAGONAL), extrude), light),
    );
    this.logo.children.forEach((m) => m.geometry.translate(0, 0, -4.5));
    this.scene.add(this.logo);

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const glow = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    glow.addColorStop(0, 'rgba(90, 120, 255, 1)');
    glow.addColorStop(0.4, 'rgba(58, 91, 255, 0.35)');
    glow.addColorStop(1, 'rgba(58, 91, 255, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 256, 256);
    this.logoGlow = new Sprite(new SpriteMaterial({
      map: new CanvasTexture(canvas),
      blending: AdditiveBlending,
      transparent: true,
      depthWrite: false,
      fog: false,
    }));
    this.logoGlow.renderOrder = -1;
    this.scene.add(this.logoGlow);
  }

  buildTunnel() {
    const geometry = new ShapeGeometry([logoShape(LOGO_LEFT), logoShape(LOGO_DIAGONAL), logoShape(LOGO_RIGHT)]);
    const edges = new EdgesGeometry(geometry);
    const shared = { transparent: true, opacity: 0, depthWrite: false, depthTest: false, blending: AdditiveBlending, fog: false };
    this.tunnel = new Group();
    this.tunnelFrames = [];
    for (let i = 0; i < TUNNEL_COUNT; i++) {
      const fill = new Mesh(geometry, new MeshBasicMaterial({ ...shared, color: '#3a5bff', side: DoubleSide }));
      const line = new LineSegments(edges, new LineBasicMaterial({ ...shared, color: '#c4cfff' }));
      const frame = new Group();
      frame.add(fill, line);
      frame.rotation.z = i * TUNNEL_TWIST;
      frame.scale.setScalar(TUNNEL_SCALE);
      this.tunnel.add(frame);
      this.tunnelFrames.push({ frame, fill, line });
    }
    this.tunnel.visible = false;
    this.camera.add(this.tunnel);
    this.scene.add(this.camera);
  }

  updateTunnel(rush) {
    this.tunnel.visible = rush > 0.02;
    if (!this.tunnel.visible) return;
    const span = TUNNEL_COUNT * TUNNEL_GAP;
    this.tunnelFrames.forEach(({ frame, fill, line }, i) => {
      const depth = span - ((i * TUNNEL_GAP + this.starTravel * TUNNEL_SPEED) % span);
      const alpha = smooth(0.5, 7, depth) * (1 - smooth(span * 0.4, span, depth)) * rush;
      frame.position.z = -depth;
      fill.material.opacity = alpha * 0.2;
      line.material.opacity = alpha;
    });
  }

  buildPath() {
    const curve = new CatmullRomCurve3(
      STATIONS.map(([cx, cz]) => new Vector3((cx + 0.5) * CELL, 0.05, (cz + 0.5) * CELL))
    );
    const geometry = new TubeGeometry(curve, LOW_POWER ? 60 : 160, 0.035, LOW_POWER ? 5 : 8, false);
    this.pathCount = geometry.index.count;
    geometry.setDrawRange(0, 0);
    this.path = new Mesh(geometry, new MeshBasicMaterial({ color: '#7d95ff', transparent: true, opacity: 0 }));
    this.sheet.add(this.path);
  }

  resize() {
    const w = window.innerWidth;
    const h = LOW_POWER ? this.canvas.clientHeight || window.innerHeight : window.innerHeight;
    if (LOW_POWER && w === this.width && h === this.height) return;
    this.maxDpr = Math.min(window.devicePixelRatio, MAX_DPR);
    this.dpr = this.dpr ? Math.min(this.dpr, this.maxDpr) : this.maxDpr;
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.width = w;
    this.height = h;
    const narrow = h > w * 1.15;
    if (narrow !== this.narrow) {
      this.narrow = narrow;
      this.timeline?.measure(narrow);
    }
    this.camera.updateProjectionMatrix();
  }

  adaptQuality(dt) {
    this.frameTimes = this.frameTimes ?? [];
    this.frameTimes.push(dt);
    if (this.frameTimes.length < QUALITY_WINDOW) return;
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    this.frameTimes.length = 0;
    let next = this.dpr;
    if (avg > 1 / 45) next = Math.max(MIN_DPR, this.dpr - 0.25);
    else if (avg < 1 / 58) next = Math.min(this.maxDpr, this.dpr + 0.25);
    if (next !== this.dpr) {
      this.dpr = next;
      this.renderer.setPixelRatio(next);
      this.renderer.setSize(this.width, this.height, false);
    } else if (avg > 1 / 40 && this.dpr === MIN_DPR && !this.reducedStars) {
      this.reducedStars = true;
      this.dust.geometry.setDrawRange(0, Math.floor(STAR_COUNT / 2));
      this.streaks.geometry.setDrawRange(0, STAR_COUNT);
    }
  }

  onSheet(x, z, lift, time, out) {
    const S = this.state;
    out.p.set(x, sheetHeight(x, z, time, S.wave) + 0.15 + lift, z).applyMatrix4(this.sheet.matrixWorld);
    out.q.copy(this.sheet.quaternion).multiply(FACE_UP);
  }

  layout(kind, i, time, out) {
    const S = this.state;
    const { obj } = this.tmp;
    out.scale = 1;
    out.show = 1;
    switch (kind) {
      case 'orbit': {
        const a = (i / N) * TAU + this.ringAngle;
        const ring = S.ring * (1 - (this.fly ?? 0) * 0.92) * (1 + landingKick(worldState.intro ?? 1) * 0.3);
        this.tmp.q.setFromAxisAngle(X_AXIS, S.ringTilt * DEG);
        out.p
          .set(Math.cos(a) * ring, Math.sin(time * 0.7 + i * 1.3) * 0.2, Math.sin(a) * ring * S.ringDepth)
          .applyQuaternion(this.tmp.q)
          .add(this.tmp.v.set(S.tx, S.ty + S.ringY, S.tz));
        obj.position.copy(out.p);
        obj.lookAt(this.tmp.v);
        obj.rotateY(Math.PI);
        out.q.copy(obj.quaternion);
        obj.lookAt(this.camera.position);
        out.q.slerp(obj.quaternion, S.ringFace);
        out.scale = S.ringScale * (1 - (this.fly ?? 0) * 0.6);
        break;
      }
      case 'cloud': {
        out.p.set(
          S.tx + (hash(i, 1) - 0.5) * 13 + Math.sin(time * 0.17 + i) * 0.5,
          S.ty + (hash(i, 2) - 0.35) * 5.5 + Math.sin(time * 0.23 + i * 2.1) * 0.35,
          S.tz + (hash(i, 3) - 0.5) * 11 + Math.cos(time * 0.14 + i * 2.7) * 0.5
        );
        out.q.setFromEuler(this.tmp.e.set(
          (hash(i, 4) - 0.5) * 0.7 + Math.sin(time * 0.15 + i) * 0.15,
          (hash(i, 5) - 0.5) + Math.sin(time * 0.12 + i * 1.7) * 0.2,
          Math.sin(time * 0.13 + i * 1.3) * 0.15
        ));
        out.scale = 0.8 + hash(i, 6) * 0.45;
        break;
      }
      case 'floor': {
        const [cx, cz] = FLOOR[i % FLOOR.length];
        const station = i < STATIONS.length;
        this.onSheet((cx + 0.5) * CELL, (cz + 0.5) * CELL, station ? 0.12 : 0, time, out);
        out.scale = station ? 1.12 : 0.78;
        break;
      }
      case 'board': {
        if (i >= 16) {
          this.layout('cloud', i, time, out);
          out.show = 0;
          break;
        }
        const col = i % 4;
        const row = Math.floor(i / 4);
        const tile = this.tiles[i];
        this.onSheet((col - 1.5) * CELL, (row - 1.5) * CELL, tile.focus * 1.1, time, out);
        out.scale = 1 + tile.focus * 0.18;
        break;
      }
      case 'stack': {
        const layer = Math.floor(i / 6);
        const k = i % 6;
        this.onSheet(((k % 3) - 1) * CELL, (Math.floor(k / 3) - 0.5) * CELL, layer * 2.1 * S.layers, time, out);
        break;
      }
      case 'rise': {
        const e = ((time * 0.6 + (i / N) * 13) % 13) / 13;
        const a = i * 2.39996;
        const r = 1.4 + hash(i, 8) * 5;
        out.p.set(S.tx + Math.cos(a) * r, S.ty - 4.5 + e * 13, S.tz + Math.sin(a) * r * 0.7);
        obj.position.copy(out.p);
        obj.lookAt(this.camera.position);
        obj.rotateZ(Math.sin(time * 0.25 + i) * 0.2);
        out.q.copy(obj.quaternion);
        out.show = smooth(0, 0.15, e) * (1 - smooth(0.75, 1, e));
        break;
      }
      case 'tunnel': {
        const e = ((time * 0.07 + i / N) % 1);
        const a = i * 2.39996 + time * 0.08;
        const r = 2.4 + hash(i, 7) * 2;
        const dir = this.tmp.v.copy(this.viewDir);
        const side = this.tmp.v2.crossVectors(dir, UP).normalize();
        const up = this.tmp.v3.crossVectors(side, dir);
        out.p.copy(this.camera.position)
          .addScaledVector(dir, 34 - e * 31)
          .addScaledVector(side, Math.cos(a) * r)
          .addScaledVector(up, Math.sin(a) * r);
        obj.position.copy(out.p);
        obj.lookAt(this.camera.position);
        obj.rotateZ(a * 0.3);
        out.q.copy(obj.quaternion);
        out.scale = 1.1;
        out.show = smooth(0, 0.15, e) * (1 - smooth(0.82, 1, e));
        break;
      }
      default:
        break;
    }
  }

  updateTiles(time, dt, snap) {
    const { from, to, t } = this.info;
    let change = 0;
    for (const k of LAYOUTS) change += Math.abs(to[k] - from[k]);
    change = Math.min(1, change / 2);
    const active = worldState.serviceActive ?? 0;
    const { acc, qa } = this.tmp;
    const pose = this.pose;

    this.tiles.forEach((tile, i) => {
      const mix = smooth(0, 1, (t - tile.delay) / 0.5);
      tile.focus = snap ? (i < SERVICE_COUNT && i === active ? 1 : 0) : damp(tile.focus, i < SERVICE_COUNT && i === active ? 1 : 0, 6, dt);
      acc.set(0, 0, 0);
      let total = 0;
      let weightSum = 0;
      let scaleSum = 0;
      for (const k of LAYOUTS) {
        const goal = from[k] + (to[k] - from[k]) * mix;
        const w = (tile.weights[k] = snap ? goal : damp(tile.weights[k], goal, 3.5, dt));
        if (w < 1e-4) continue;
        this.layout(k, i, time, pose);
        const wv = w * Math.max(pose.show, 0.001);
        acc.addScaledVector(pose.p, wv);
        if (total === 0) qa.copy(pose.q);
        else qa.slerp(pose.q, wv / (total + wv));
        total += wv;
        weightSum += w;
        scaleSum += w * pose.scale * pose.show;
      }
      if (total > 0) acc.divideScalar(total);
      const lift = Math.sin(Math.PI * mix) * change;
      acc.y += lift * tile.arc;
      const scale = weightSum > 0 ? scaleSum / weightSum : 0;
      tile.scale = snap ? scale : damp(tile.scale, scale, 3, dt);
      const { mesh } = tile;
      mesh.position.copy(acc);
      mesh.quaternion.copy(qa).multiply(this.tmp.q.setFromAxisAngle(X_AXIS, lift * (i % 2 === 0 ? 0.3 : -0.3)));
      mesh.scale.setScalar(Math.max(tile.scale, 0.001));
      mesh.visible = tile.scale > 0.01;
    });
  }

  placeCamera(time, dt, speed, reduced) {
    const S = this.state;
    const tall = Math.max(0, (1.2 * this.height) / Math.max(this.width, 1) - 1);
    const alive = reduced ? 0 : 1 + S.light * 1.4;
    const hold = reduced ? 0 : Math.min(this.info.drift, 7) * this.info.dir * 3;
    const away = 1 - clamp(worldState.intro ?? 1, 0, 1);
    const fly = away * away * (3 - 2 * away);
    this.fly = fly;
    const rush = Math.sin(Math.PI * away);
    const azim = (S.azim + hold - fly * 40 + this.pointer.x * 2.5 + Math.sin(time * 0.17) * 1.4 * alive) * DEG;
    const elev = Math.min(89, S.elev + fly * 28 + this.pointer.y * 1.5 + Math.sin(time * 0.23) * 0.8 * alive) * DEG;
    const dist = S.dist * (1 + fly * 4.6) * (1 - landingKick(worldState.intro ?? 1) * 0.12) * (1 + tall * 0.12) * (1 + Math.sin(time * 0.31 + 0.5) * 0.03 * alive);
    const target = this.tmp.v2.set(S.tx, S.ty + Math.sin(time * 0.29) * 0.25 * alive, S.tz);
    this.camera.position
      .set(Math.cos(elev) * Math.sin(azim), Math.sin(elev), Math.cos(elev) * Math.cos(azim))
      .multiplyScalar(dist)
      .add(target);
    this.camera.lookAt(target);
    this.camera.rotateZ((S.roll - fly * INTRO_ROLL) * DEG);
    this.viewDir = this.viewDir ?? new Vector3();
    this.camera.getWorldDirection(this.viewDir);

    const fov = (2 * Math.atan(Math.tan(((S.fov + speed + rush * INTRO_FOV) * DEG) / 2) * (1 + tall * 0.35))) / DEG;
    const offX = -S.pan * Math.max(0, 1 - tall) * this.width * 0.5;
    const offY = S.panY * this.height * 0.5;
    if (
      Math.abs(this.camera.fov - fov) > 0.01 ||
      Math.abs((this.offX ?? 0) - offX) > 0.5 ||
      Math.abs((this.offY ?? 0) - offY) > 0.5 ||
      this.offW !== this.width || this.offH !== this.height
    ) {
      this.camera.fov = fov;
      this.offX = offX;
      this.offY = offY;
      this.offW = this.width;
      this.offH = this.height;
      this.camera.setViewOffset(this.width, this.height, offX, offY, this.width, this.height);
    }
  }

  update() {
    const raw = this.clock.getDelta();
    if (raw > 0 && raw < 0.25) this.adaptQuality(raw);
    const dt = Math.min(raw, 0.05);
    const time = this.clock.elapsedTime;
    const reduced = worldState.reduced;
    const snap = reduced || this.first;
    this.first = false;

    this.timeline.sample(window.scrollY, this.narrow, this.target, this.info);
    const S = this.state;
    for (const k in this.target) S[k] = snap ? this.target[k] : damp(S[k], this.target[k], 3.2, dt);

    const screens = window.scrollY / Math.max(1, this.height);
    const v = dt > 0 && this.lastScreens !== undefined ? (screens - this.lastScreens) / dt : 0;
    this.lastScreens = screens;
    this.vel = reduced ? 0 : damp(this.vel, clamp(v, -4, 4), 6, dt);
    const speed = Math.min(Math.abs(this.vel), 3) * 1.1;

    this.pointer.x = damp(this.pointer.x, reduced ? 0 : clamp(worldState.pointer.x, -1, 1), 2, dt);
    this.pointer.y = damp(this.pointer.y, reduced ? 0 : clamp(worldState.pointer.y, -1, 1), 2, dt);

    this.ringPace = reduced ? 0 : damp(this.ringPace ?? S.ringPace, S.ringPace + this.vel * 0.05, 1.8, dt);
    this.ringAngle = (this.ringAngle + this.ringPace * dt) % TAU;

    const settled = Math.min(1, S.floor + S.board + S.stack);
    if (!reduced) this.travel += (S.flow * 0.24 + this.vel * 3 * (1 - settled)) * dt;
    if (S.flow < 0.5 && Math.abs(this.vel) < 0.05) this.travel = damp(this.travel, Math.round(this.travel / 2) * 2, 3, dt);
    this.travel = ((this.travel % 12) + 12) % 12;

    this.sheet.position.set(S.gx, S.gy, S.gz);
    this.sheet.quaternion
      .setFromAxisAngle(UP, S.gYaw * DEG)
      .multiply(this.tmp.q.setFromAxisAngle(X_AXIS, S.gPitch * DEG))
      .multiply(this.tmp.qa.setFromAxisAngle(UP, S.gSpin * DEG));
    this.sheet.updateMatrixWorld();
    const u = this.sheet.userData.mesh.material.uniforms;
    u.uTime.value = reduced ? 0 : time;
    u.uWave.value = S.wave;
    u.uCurl.value = S.curl;
    u.uFlow.value = this.travel;
    u.uLight.value = S.light;
    u.uOpacity.value = S.grid;
    u.uLine.value.copy(LINE_DARK).lerp(LINE_LIGHT, S.light);

    this.placeCamera(time, dt, speed, reduced);
    this.updateTiles(reduced ? 0 : time, dt, snap);

    const size = S.logo * LOGO_SIZE;
    this.logo.visible = size > 0.002;
    this.logoGlow.visible = this.logo.visible;
    if (this.logo.visible) {
      const sway = reduced ? 0 : Math.sin(time * 0.35) * 0.32;
      this.logo.position.set(S.tx, S.ty + S.ringY - LOGO_DROP + (reduced ? 0 : Math.sin(time * 0.6) * 0.14), S.tz);
      this.logo.rotation.set(0.06, this.camera.rotation.y + sway + this.vel * 0.5 + this.fly * INTRO_SPIN, 0);
      this.logo.scale.setScalar(size);
      this.logoGlow.position.copy(this.logo.position).addScaledVector(this.viewDir, 2.5);
      this.logoGlow.scale.setScalar(size * LOGO_GLOW);
      this.logoGlow.material.opacity = clamp(S.logo, 0, 1) * LOGO_GLOW_ALPHA;
    }

    const bg = this.scene.background.copy(DARK).lerp(LIGHT_BG, S.light);
    this.scene.fog.color.copy(bg);
    if (Math.abs(S.light - (this.lastLight ?? -1)) > 0.005) {
      this.lastLight = S.light;
      document.documentElement.style.setProperty('--world-light', S.light.toFixed(3));
    }
    this.sky.position.copy(this.camera.position);
    const away = 1 - clamp(worldState.intro ?? 1, 0, 1);
    this.sky.material.uniforms.uStrength.value = Math.max(clamp((S.sky + 1.6) / 2.1, 0, 1) * (1 - S.light) * 0.9, away * 1.5);
    const su = this.starUniforms;
    if (!reduced) this.starTravel = (this.starTravel + (0.9 + this.vel * 13 + Math.sin(Math.PI * away) * 300 + away * 18) * dt) % 9000;
    su.uTravel.value = this.starTravel;
    su.uStreak.value = reduced ? 0 : clamp(this.vel * 0.8 + Math.sin(Math.PI * away) * 22, -22, 22);
    su.uTime.value = reduced ? 0 : time;
    su.uOpacity.value = Math.max((0.45 + S.dust * 0.55) * (1 - S.light), away * 1.6);
    su.uYaw.value = (S.azim + Math.min(this.info.drift, 7) * this.info.dir * 3) / 90;
    su.uPitch.value = S.elev / 90;
    su.uScale.value = (this.height * this.renderer.getPixelRatio() * 0.5) / Math.tan((this.camera.fov * DEG) / 2);
    this.updateTunnel(reduced ? 0 : Math.sin(Math.PI * away));
    this.dust.visible = su.uOpacity.value > 0.01;
    this.streaks.visible = this.dust.visible && Math.abs(su.uStreak.value) > 0.6;

    const w = Math.max(0, Math.min(worldState.w, CHAPTERS.length - 1));
    const k = Math.floor(w);
    const progress = CHAPTERS[k] === 'process' ? clamp((w - k) / 0.7, 0, 1) : CHAPTERS[k] === 'work' ? 1 : 0;
    const drawn = Math.floor(this.pathCount * progress);
    this.path.geometry.setDrawRange(0, drawn - (drawn % 3));
    this.path.material.opacity = S.path * 0.95;
    this.path.visible = drawn > 0 && S.path > 0.02;

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
    const seen = new Set();
    this.scene.traverse((o) => {
      if (o.geometry && !seen.has(o.geometry)) { seen.add(o.geometry); o.geometry.dispose(); }
      if (o.material && !seen.has(o.material)) {
        seen.add(o.material);
        o.material.map?.dispose();
        o.material.dispose();
      }
    });
    this.renderer.dispose();
  }
}
