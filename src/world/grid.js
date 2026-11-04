import { Color, Mesh, PlaneGeometry, ShaderMaterial, Vector3 } from 'three';

const vertex = /* glsl */ `
  varying vec3 vWorld;
  uniform vec3 uCamera;
  uniform float uCurve;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec2 d = world.xz - uCamera.xz;
    world.y -= dot(d, d) * uCurve;
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vWorld;
  uniform vec3 uLine;
  uniform vec3 uCamera;
  uniform float uCell;
  uniform float uOpacity;
  uniform float uFar;

  float gridLine(vec2 p, float width) {
    vec2 g = abs(fract(p - 0.5) - 0.5) / fwidth(p);
    return 1.0 - min(min(g.x, g.y) / width, 1.0);
  }

  float plusMark(vec2 p, float size, float thickness) {
    vec2 c = abs(fract(p + 0.5) - 0.5);
    vec2 px = c / fwidth(p);
    float h = step(c.y * 1.0, size) * (1.0 - min(px.x / thickness, 1.0));
    float v = step(c.x * 1.0, size) * (1.0 - min(px.y / thickness, 1.0));
    return max(h, v);
  }

  void main() {
    vec2 p = vWorld.xz / uCell;
    float line = gridLine(p, 1.0) * 0.35;
    float plus = plusMark(p / 2.0, 0.09, 1.6);
    float dist = distance(vWorld.xz, uCamera.xz);
    float fade = smoothstep(uFar, 4.0, dist);
    float a = max(line, plus) * fade * uOpacity;
    if (a < 0.003) discard;
    gl_FragColor = vec4(uLine, a);
  }
`;

export function createGrid() {
  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    extensions: { derivatives: true },
    uniforms: {
      uLine: { value: new Color('#ffffff') },
      uCamera: { value: new Vector3() },
      uCell: { value: 1.4 },
      uOpacity: { value: 0.9 },
      uFar: { value: 46 },
      uCurve: { value: 0.0045 },
    },
  });
  const mesh = new Mesh(new PlaneGeometry(260, 260, 160, 160), material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -1.8;
  mesh.renderOrder = -1;
  return mesh;
}
