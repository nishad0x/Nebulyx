import React from 'react';

const BLUE = 'var(--sv-blue)';
const DEEP = 'var(--sv-deep)';
const SOFT = 'var(--sv-soft)';
const LINE = 'var(--sv-line)';
const PANEL = 'var(--sv-panel)';
const PAPER = 'var(--sv-paper)';
const INK = 'var(--sv-ink)';
const ON = 'var(--sv-on)';

function paint(fill, stroke, extra) {
  return { fill: fill || 'none', stroke: stroke || 'none', ...extra };
}

function Mark({ x, y, s }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} style={paint(ON)}>
      <path d="M12 20 36 6V74L12 88Z" /><path d="M36 28 76 80V100L36 48Z" fillOpacity="0.8" /><path d="M76 34 96 20V88L76 100Z" />
    </g>
  );
}

function Websites() {
  return (
    <svg viewBox="0 0 400 400" className="sv-svg" aria-hidden="true">
      <defs>
        <linearGradient id="sv-web-hero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a5bff" />
          <stop offset="1" stopColor="#8a6bff" />
        </linearGradient>
        <linearGradient id="sv-web-thumb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c3ceff" />
          <stop offset="1" stopColor="#f1d9c4" />
        </linearGradient>
      </defs>
      <g className="sv-shadow">
        <rect x="40" y="62" width="290" height="262" rx="16" style={paint(PANEL, LINE)} />
        <rect x="40" y="62" width="290" height="34" rx="16" style={paint(PAPER)} />
        <rect x="40" y="84" width="290" height="12" style={paint(PAPER)} />
        <circle cx="58" cy="79" r="4" style={paint('#ff8a7a')} />
        <circle cx="72" cy="79" r="4" style={paint('#ffc76a')} />
        <circle cx="86" cy="79" r="4" style={paint('#6fd19a')} />
        <rect x="104" y="71" width="150" height="16" rx="8" style={paint(PANEL, LINE)} />
        <rect x="114" y="77" width="64" height="4" rx="2" style={paint(LINE)} className="sv-type sv-d1" />
      </g>
      <g className="sv-build sv-d1">
        <rect x="56" y="110" width="258" height="96" rx="12" fill="url(#sv-web-hero)" />
        <rect x="74" y="132" width="132" height="10" rx="5" style={paint(ON)} />
        <rect x="74" y="150" width="96" height="7" rx="3.5" style={paint(ON, null, { opacity: 0.65 })} />
        <rect x="74" y="172" width="64" height="20" rx="10" style={paint(ON)} />
        <circle cx="262" cy="158" r="30" style={paint(ON, null, { opacity: 0.14 })} />
        <circle cx="282" cy="140" r="14" style={paint(ON, null, { opacity: 0.18 })} />
      </g>
      <g className="sv-build sv-d2">
        <rect x="56" y="218" width="124" height="90" rx="12" style={paint(PAPER)} />
        <rect x="66" y="228" width="104" height="46" rx="8" fill="url(#sv-web-thumb)" />
        <rect x="66" y="284" width="70" height="6" rx="3" style={paint(LINE)} />
      </g>
      <g className="sv-build sv-d3">
        <rect x="190" y="218" width="124" height="90" rx="12" style={paint(PAPER)} />
        <rect x="200" y="228" width="104" height="46" rx="8" fill="url(#sv-web-thumb)" />
        <rect x="200" y="284" width="56" height="6" rx="3" style={paint(LINE)} />
      </g>
      <circle cx="106" cy="182" r="22" className="sv-ripple" style={paint(ON)} />
      <g className="sv-cursor">
        <path d="M104 178v28l7-7 6 14 6-3-6-13h10z" style={paint(INK, ON, { strokeWidth: 1.5, strokeLinejoin: 'round' })} />
      </g>
      <g className="sv-phone">
        <g className="sv-shadow">
          <rect x="282" y="188" width="86" height="158" rx="16" style={paint(PANEL, LINE)} />
          <rect x="314" y="196" width="22" height="5" rx="2.5" style={paint(LINE)} />
          <rect x="292" y="210" width="66" height="50" rx="9" fill="url(#sv-web-hero)" />
          <rect x="300" y="226" width="40" height="6" rx="3" style={paint(ON)} />
          <rect x="300" y="240" width="24" height="9" rx="4.5" style={paint(ON)} />
          <rect x="292" y="268" width="66" height="30" rx="8" fill="url(#sv-web-thumb)" />
          <rect x="292" y="306" width="46" height="5" rx="2.5" style={paint(LINE)} />
          <rect x="292" y="318" width="34" height="5" rx="2.5" style={paint(LINE)} />
        </g>
      </g>
      <g className="sv-build sv-d4">
        <circle cx="70" cy="44" r="19" style={paint(PANEL, LINE)} />
        <circle cx="70" cy="44" r="13" style={paint(null, SOFT, { strokeWidth: 4 })} />
        <g transform="rotate(-90 70 44)">
          <circle cx="70" cy="44" r="13" className="sv-ring" style={paint(null, BLUE, { strokeWidth: 4, strokeLinecap: 'round' })} pathLength="120" />
        </g>
        <path d="M64 44l4 4 8-8" style={paint(null, INK, { strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' })} />
      </g>
    </svg>
  );
}

function Tile({ x, y, children, className }) {
  return (
    <g className={className}>
      <g className="sv-shadow">
        <rect x={x - 26} y={y - 26} width="52" height="52" rx="15" style={paint(PANEL, LINE)} />
      </g>
      <g transform={`translate(${x - 12} ${y - 12})`}>{children}</g>
    </g>
  );
}

function Automation() {
  const nodes = [
    { x: 72, y: 112, path: 'M200 200C150 200 120 112 72 112', icon: (
      <><rect x="0" y="4" width="24" height="17" rx="3" style={paint(null, BLUE, { strokeWidth: 2 })} /><path d="M1 6l11 8 11-8" style={paint(null, BLUE, { strokeWidth: 2, strokeLinejoin: 'round' })} /></>
    ) },
    { x: 328, y: 112, path: 'M200 200C250 200 280 112 328 112', icon: (
      <><rect x="1" y="1" width="22" height="22" rx="4" style={paint(null, BLUE, { strokeWidth: 2 })} /><path d="M1 9h22M1 16h22M9 1v22" style={paint(null, SOFT, { strokeWidth: 2 })} /></>
    ) },
    { x: 60, y: 260, path: 'M200 200C140 200 110 260 60 260', icon: (
      <path d="M2 4h20v13H10l-5 5v-5H2z" style={paint(SOFT, BLUE, { strokeWidth: 2, strokeLinejoin: 'round' })} />
    ) },
    { x: 340, y: 260, path: 'M200 200C260 200 290 260 340 260', icon: (
      <><rect x="2" y="1" width="20" height="22" rx="3" style={paint(null, BLUE, { strokeWidth: 2 })} /><path d="M7 8h10M7 13h10M7 18h6" style={paint(null, SOFT, { strokeWidth: 2, strokeLinecap: 'round' })} /></>
    ) },
    { x: 200, y: 64, path: 'M200 200V64', icon: (
      <><rect x="1" y="3" width="22" height="20" rx="4" style={paint(null, BLUE, { strokeWidth: 2 })} /><path d="M1 9h22M7 1v5M17 1v5" style={paint(null, BLUE, { strokeWidth: 2, strokeLinecap: 'round' })} /><rect x="6" y="13" width="5" height="5" rx="1" style={paint(SOFT)} /></>
    ) },
  ];
  return (
    <svg viewBox="0 0 400 400" className="sv-svg" aria-hidden="true">
      <defs>
        <linearGradient id="sv-auto-hub" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a5bff" />
          <stop offset="1" stopColor="#8a6bff" />
        </linearGradient>
      </defs>
      {nodes.map((n, i) => (
        <g key={n.path}>
          <path d={n.path} style={paint(null, LINE, { strokeWidth: 1.5 })} />
          <path d={n.path} pathLength="100" className={`sv-pulse-line sv-d${i + 1}`} style={paint(null, BLUE, { strokeWidth: 2.5, strokeLinecap: 'round' })} />
        </g>
      ))}
      {nodes.map((n, i) => (
        <Tile key={n.x + '-' + n.y} x={n.x} y={n.y} className={`sv-build sv-d${i + 1}`}>{n.icon}</Tile>
      ))}
      <circle cx="200" cy="200" r="48" className="sv-ring-pulse" style={paint(null, BLUE, { strokeWidth: 2 })} />
      <circle cx="200" cy="200" r="48" className="sv-ring-pulse sv-d3" style={paint(null, SOFT, { strokeWidth: 2 })} />
      <g className="sv-hub">
        <rect x="160" y="160" width="80" height="80" rx="24" fill="url(#sv-auto-hub)" />
        <Mark x={176} y={176} s={0.48} />
      </g>
      <g className="sv-toast">
        <g className="sv-shadow">
          <rect x="112" y="300" width="176" height="62" rx="16" style={paint(PANEL, LINE)} />
        </g>
        <circle cx="140" cy="331" r="13" style={paint(SOFT)} />
        <path d="M134 331.5l4 4 8-8" style={paint(null, BLUE, { strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} />
        <rect x="164" y="320" width="90" height="7" rx="3.5" style={paint(INK)} />
        <rect x="164" y="334" width="64" height="6" rx="3" style={paint(LINE)} />
      </g>
    </svg>
  );
}

function Social() {
  return (
    <svg viewBox="0 0 400 400" className="sv-svg" aria-hidden="true">
      <defs>
        <linearGradient id="sv-social-reel" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#8a6bff" />
          <stop offset="0.55" stopColor="#3a5bff" />
          <stop offset="1" stopColor="#1f2fbf" />
        </linearGradient>
        <linearGradient id="sv-social-post" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c3ceff" />
          <stop offset="1" stopColor="#f1d9c4" />
        </linearGradient>
      </defs>
      <g className="sv-float sv-d1">
        <g transform="rotate(-9 104 196)">
          <g className="sv-shadow">
            <rect x="46" y="96" width="116" height="150" rx="16" style={paint(PANEL, LINE)} />
            <rect x="56" y="106" width="96" height="84" rx="10" fill="url(#sv-social-post)" />
            <rect x="56" y="202" width="70" height="7" rx="3.5" style={paint(INK)} />
            <rect x="56" y="216" width="50" height="6" rx="3" style={paint(LINE)} />
          </g>
        </g>
      </g>
      <g className="sv-float sv-d3">
        <g transform="rotate(8 300 230)">
          <g className="sv-shadow">
            <rect x="240" y="150" width="120" height="150" rx="16" style={paint(PANEL, LINE)} />
            <circle cx="262" cy="174" r="10" style={paint(SOFT)} />
            <rect x="278" y="168" width="56" height="6" rx="3" style={paint(INK)} />
            <rect x="278" y="180" width="38" height="5" rx="2.5" style={paint(LINE)} />
            <rect x="252" y="198" width="96" height="70" rx="10" fill="url(#sv-social-post)" />
            <rect x="252" y="278" width="60" height="6" rx="3" style={paint(LINE)} />
          </g>
        </g>
      </g>
      <g className="sv-float sv-d2">
        <g className="sv-shadow">
          <rect x="138" y="48" width="124" height="252" rx="24" style={paint(INK)} />
          <rect x="145" y="55" width="110" height="238" rx="18" fill="url(#sv-social-reel)" />
        </g>
        <rect x="186" y="62" width="28" height="6" rx="3" style={paint(INK)} />
        <circle cx="200" cy="160" r="24" style={paint(ON, null, { opacity: 0.22 })} />
        <path d="M193 147v26l21-13z" style={paint(ON)} />
        <g className="sv-like"><path d="M236 200c-4-6-14-3-10 5l10 10 10-10c4-8-6-11-10-5z" style={paint(ON)} /></g>
        <rect x="231" y="222" width="10" height="4" rx="2" style={paint(ON, null, { opacity: 0.7 })} />
        <circle cx="236" cy="244" r="6" style={paint(ON, null, { opacity: 0.85 })} />
        <rect x="157" y="252" width="62" height="7" rx="3.5" style={paint(ON)} />
        <rect x="157" y="265" width="44" height="5" rx="2.5" style={paint(ON, null, { opacity: 0.6 })} />
        <rect x="157" y="280" width="86" height="3" rx="1.5" style={paint(ON, null, { opacity: 0.3 })} />
        <rect x="157" y="280" width="86" height="3" rx="1.5" style={paint(ON)} className="sv-progress" />
      </g>
      <g className="sv-rise sv-d1"><path d="M290 122c-5-7-17-4-12 6l12 12 12-12c5-10-7-13-12-6z" style={paint(BLUE)} /></g>
      <g className="sv-rise sv-d3"><path d="M312 140c-4-5-12-3-9 4l9 9 9-9c3-7-5-9-9-4z" style={paint(SOFT)} /></g>
      <g className="sv-rise sv-d5"><rect x="268" y="132" width="20" height="15" rx="4" style={paint(DEEP)} /><path d="M273 147v7l7-7z" style={paint(DEEP)} /></g>
      <g className="sv-toast">
        <g className="sv-shadow">
          <rect x="70" y="316" width="164" height="54" rx="27" style={paint(PANEL, LINE)} />
        </g>
        <rect x="84" y="329" width="28" height="28" rx="8" style={paint(SOFT)} />
        <path d="M90 337h16M90 343h10" style={paint(null, BLUE, { strokeWidth: 2.5, strokeLinecap: 'round' })} />
        <rect x="122" y="333" width="80" height="7" rx="3.5" style={paint(INK)} />
        <rect x="122" y="346" width="54" height="5" rx="2.5" style={paint(LINE)} />
      </g>
    </svg>
  );
}

function AiSearch() {
  return (
    <svg viewBox="0 0 400 400" className="sv-svg" aria-hidden="true">
      <defs>
        <linearGradient id="sv-ai-spark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a5bff" />
          <stop offset="1" stopColor="#8a6bff" />
        </linearGradient>
      </defs>
      <g className="sv-shadow">
        <rect x="40" y="52" width="320" height="54" rx="27" style={paint(PANEL, SOFT, { strokeWidth: 1.5 })} />
      </g>
      <circle cx="70" cy="79" r="9" style={paint(null, LINE, { strokeWidth: 2.5 })} />
      <path d="M76.5 85.5l6 6" style={paint(null, LINE, { strokeWidth: 2.5, strokeLinecap: 'round' })} />
      <rect x="92" y="75" width="168" height="8" rx="4" className="sv-type sv-d1" style={paint(INK)} />
      <rect x="266" y="70" width="3" height="18" style={paint(BLUE)} className="sv-blink" />
      <rect x="316" y="63" width="32" height="32" rx="16" fill="url(#sv-ai-spark)" />
      <path d="M332 72v14M325 79h14" style={paint(null, ON, { strokeWidth: 2.5, strokeLinecap: 'round' })} />
      <g className="sv-build sv-d2">
        <g className="sv-shadow">
          <rect x="40" y="128" width="268" height="224" rx="22" style={paint(PANEL, LINE)} />
        </g>
        <g className="sv-spark"><path d="M72 146c2 10 6 14 16 16-10 2-14 6-16 16-2-10-6-14-16-16 10-2 14-6 16-16z" fill="url(#sv-ai-spark)" /></g>
        <rect x="98" y="156" width="80" height="7" rx="3.5" style={paint(LINE)} />
      </g>
      <rect x="60" y="192" width="220" height="8" rx="4" className="sv-type sv-d2" style={paint(LINE)} />
      <rect x="60" y="210" width="196" height="8" rx="4" className="sv-type sv-d3" style={paint(LINE)} />
      <g className="sv-type sv-d3">
        <rect x="60" y="230" width="150" height="34" rx="17" style={paint(BLUE)} />
        <rect x="66" y="236" width="22" height="22" rx="11" style={paint(ON, null, { opacity: 0.2 })} />
        <Mark x={69} y={238} s={0.17} />
        <rect x="96" y="243" width="96" height="8" rx="4" style={paint(ON)} />
      </g>
      <rect x="60" y="278" width="208" height="8" rx="4" className="sv-type sv-d4" style={paint(LINE)} />
      <rect x="60" y="296" width="150" height="8" rx="4" className="sv-type sv-d4" style={paint(LINE)} />
      <g className="sv-type sv-d5">
        <rect x="60" y="318" width="52" height="18" rx="9" style={paint(SOFT)} />
        <rect x="118" y="318" width="52" height="18" rx="9" style={paint(SOFT)} />
        <rect x="176" y="318" width="40" height="18" rx="9" style={paint(SOFT)} />
      </g>
      <g className="sv-toast">
        <g className="sv-shadow">
          <rect x="258" y="196" width="112" height="126" rx="18" style={paint(PANEL, LINE)} />
        </g>
        <rect x="270" y="208" width="88" height="52" rx="10" fill="url(#sv-ai-spark)" />
        <rect x="270" y="270" width="70" height="7" rx="3.5" style={paint(INK)} />
        <rect x="270" y="284" width="52" height="5" rx="2.5" style={paint(LINE)} />
        <path d="M272 304h12m-4-4 4 4-4 4" style={paint(null, BLUE, { strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} />
      </g>
    </svg>
  );
}

function Cube({ x, y, s }) {
  const h = s * 0.577;
  return (
    <g>
      <polygon points={`${x},${y} ${x + s},${y - h} ${x + 2 * s},${y} ${x + s},${y + h}`} style={paint(SOFT)} />
      <polygon points={`${x},${y} ${x + s},${y + h} ${x + s},${y + h + s} ${x},${y + s}`} style={paint(BLUE)} />
      <polygon points={`${x + s},${y + h} ${x + 2 * s},${y} ${x + 2 * s},${y + s} ${x + s},${y + h + s}`} style={paint(DEEP)} />
      <line x1={x + s * 0.5} y1={y - h * 0.5} x2={x + s * 1.5} y2={y + h * 0.5} style={paint(null, ON, { strokeWidth: 3, opacity: 0.55 })} />
    </g>
  );
}

function Stores() {
  return (
    <svg viewBox="0 0 400 400" className="sv-svg" aria-hidden="true">
      <defs>
        <linearGradient id="sv-store-img" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c3ceff" />
          <stop offset="1" stopColor="#f1d9c4" />
        </linearGradient>
      </defs>
      <polygon points="150,318 270,250 390,318 270,386" style={paint(null, LINE)} />
      <line x1="180" y1="335" x2="300" y2="267" style={paint(null, LINE)} />
      <line x1="210" y1="352" x2="330" y2="284" style={paint(null, LINE)} />
      <g className="sv-slide sv-d2"><Cube x={196} y={296} s={36} /></g>
      <g className="sv-slide sv-d4"><Cube x={266} y={270} s={36} /></g>
      <g className="sv-drop sv-d3"><Cube x={232} y={234} s={36} /></g>
      <g className="sv-build sv-d1">
        <g className="sv-shadow">
          <rect x="34" y="52" width="196" height="262" rx="22" style={paint(PANEL, LINE)} />
        </g>
        <rect x="48" y="66" width="168" height="132" rx="14" fill="url(#sv-store-img)" />
        <g className="sv-float sv-d2">
          <rect x="96" y="96" width="72" height="72" rx="18" style={paint(BLUE)} />
          <path d="M116 124h32l-4 22h-24z" style={paint(null, ON, { strokeWidth: 3, strokeLinejoin: 'round' })} />
          <path d="M124 124v-6a8 8 0 0 1 16 0v6" style={paint(null, ON, { strokeWidth: 3 })} />
        </g>
        <rect x="48" y="212" width="112" height="9" rx="4.5" style={paint(INK)} />
        <rect x="48" y="228" width="72" height="7" rx="3.5" style={paint(LINE)} />
        <rect x="48" y="258" width="168" height="40" rx="20" style={paint(BLUE)} />
        <rect x="104" y="274" width="56" height="8" rx="4" style={paint(ON)} />
      </g>
      <circle cx="132" cy="278" r="26" className="sv-ripple" style={paint(ON)} />
      <g className="sv-cursor">
        <path d="M130 274v28l7-7 6 14 6-3-6-13h10z" style={paint(INK, ON, { strokeWidth: 1.5, strokeLinejoin: 'round' })} />
      </g>
      <g className="sv-badge">
        <g className="sv-shadow">
          <rect x="262" y="58" width="104" height="54" rx="27" style={paint(PANEL, LINE)} />
        </g>
        <path d="M282 76h4l4 16h16l3-11h-21" style={paint(null, INK, { strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} />
        <circle cx="292" cy="98" r="2.5" style={paint(INK)} />
        <circle cx="304" cy="98" r="2.5" style={paint(INK)} />
        <circle cx="340" cy="85" r="13" style={paint(BLUE)} />
        <path d="M335 85.5l3.5 3.5 7-7" style={paint(null, ON, { strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} />
      </g>
    </svg>
  );
}

const VISUALS = {
  'web-building': Websites,
  'platform-automation': Automation,
  'social-enhancement': Social,
  'aeo-geo-marketing': AiSearch,
  'dropshipping-models': Stores,
};

export default function ServiceVisual({ id }) {
  const Visual = VISUALS[id];
  return (
    <div className="service-visual">
      <Visual />
    </div>
  );
}
