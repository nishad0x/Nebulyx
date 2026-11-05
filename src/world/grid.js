import { Color, Group, Mesh, PlaneGeometry, ShaderMaterial } from 'three';

export const SHEET = 36;
export const CELL = 1.5;

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uWave;
  uniform float uCurl;
  varying vec2 vLocal;
  varying float vDepth;
  void main() {
    vec3 p = position;
    vLocal = p.xz;
    float h = sin(uTime * 0.8 + p.x * 0.21 + p.z * 0.17) * 0.42 * uWave;
    vec3 q = vec3(p.x, h, p.z);
    float k = uCurl * 6.2831853 / ${SHEET.toFixed(1)};
    if (abs(k) > 1e-4) {
      float a = p.x * k;
      q = vec3(sin(a) / k - sin(a) * h, (1.0 - cos(a)) / k + cos(a) * h, p.z);
    }
    vec4 mv = modelViewMatrix * vec4(q, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uLine;
  uniform float uOpacity;
  uniform float uLight;
  uniform float uFlow;
  varying vec2 vLocal;
  varying float vDepth;

  float lines(vec2 g) {
    vec2 w = fwidth(g) * 1.1;
    vec2 d = abs(fract(g) - 0.5);
    vec2 aa = smoothstep(0.5 - w, 0.5 - w * 0.5, d);
    return max(aa.x, aa.y);
  }

  float plusMark(vec2 g) {
    vec2 c = g - floor(g / 2.0 + 0.5) * 2.0;
    vec2 a = abs(c);
    float px = max(fwidth(g.x), 0.01) * 1.3;
    float h = step(a.x, 0.2) * (1.0 - smoothstep(0.0, px, a.y - 0.02));
    float v = step(a.y, 0.2) * (1.0 - smoothstep(0.0, px, a.x - 0.02));
    return max(h, v);
  }

  void main() {
    vec2 g = vLocal / ${CELL.toFixed(1)};
    g.y += uFlow;
    float r = length(vLocal / ${(SHEET / 2).toFixed(1)});
    float fade = 1.0 - smoothstep(0.35, 1.0, r);
    fade *= smoothstep(0.6, 3.0, vDepth);
    float a = max(lines(g) * mix(0.32, 0.14, uLight), plusMark(g) * mix(0.9, 0.55, uLight));
    a *= fade * uOpacity;
    if (a < 0.003) discard;
    gl_FragColor = vec4(uLine, a);
  }
`;

export function sheetHeight(x, z, time, wave) {
  return Math.sin(time * 0.8 + x * 0.21 + z * 0.17) * 0.42 * wave;
}

export function createSheet() {
  const geometry = new PlaneGeometry(SHEET, SHEET, 144, 144);
  geometry.rotateX(-Math.PI / 2);
  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uWave: { value: 0.5 },
      uCurl: { value: 0 },
      uFlow: { value: 0 },
      uLine: { value: new Color('#ffffff') },
      uOpacity: { value: 1 },
      uLight: { value: 0 },
    },
  });
  const mesh = new Mesh(geometry, material);
  mesh.renderOrder = -1;
  mesh.frustumCulled = false;
  const sheet = new Group();
  sheet.add(mesh);
  sheet.userData.mesh = mesh;
  return sheet;
}
