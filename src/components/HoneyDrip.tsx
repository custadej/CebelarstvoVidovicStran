// Honey running over an edge. One SVG drawn at 1:1 (viewBox in pixels, "slice" so it is cropped, never stretched),
// with a "goo" filter (blur + alpha threshold) that melts the band, the stretching drips and the falling drops into one
// shape, and specular lighting for the glossy look. Narrow screens see the middle of the run.
// The shapes are complete without motion; with motion the drips grow, a drop falls and they pull back (CSS).

type Drip = { x: number; len: number; delay: number };

const presets: Record<"edge" | "photo", { width: number; drips: Drip[] }> = {
  edge: {
    width: 2560,
    drips: [
      { x: 260, len: 46, delay: 3.1 },
      { x: 700, len: 76, delay: 0 },
      { x: 1010, len: 40, delay: 4.6 },
      { x: 1210, len: 86, delay: 1.7 },
      { x: 1420, len: 54, delay: 0.9 },
      { x: 1690, len: 66, delay: 5.4 },
      { x: 2010, len: 38, delay: 2.4 },
      { x: 2330, len: 72, delay: 3.8 },
    ],
  },
  photo: {
    width: 720,
    drips: [
      { x: 110, len: 44, delay: 0.6 },
      { x: 300, len: 70, delay: 2.2 },
      { x: 450, len: 38, delay: 1.2 },
      { x: 620, len: 56, delay: 0 },
    ],
  },
};

const H = 220;
const BAND = 12;

export function HoneyDrip({ id, preset = "edge", className = "" }: { id: string; preset?: "edge" | "photo"; className?: string }) {
  const { width, drips } = presets[preset];
  const goo = `${id}-goo`;
  const fill = `${id}-fill`;
  return (
    <div className={`honey-drip honey-drip-${preset} ${className}`} aria-hidden="true">
      <svg className="honey-run" viewBox={`0 0 ${width} ${H}`} preserveAspectRatio="xMidYMin slice">
        <defs>
          <linearGradient id={fill} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="90">
            <stop offset="0" stopColor="#f0b244" />
            <stop offset="0.45" stopColor="#d98a1c" />
            <stop offset="1" stopColor="#a85f0c" />
          </linearGradient>
          <filter id={goo} filterUnits="userSpaceOnUse" x="-40" y="-20" width={width + 80} height={H + 40} colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
            <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo" />
            <feGaussianBlur in="goo" stdDeviation="2.2" result="bump" />
            <feSpecularLighting in="bump" surfaceScale="5" specularConstant="0.95" specularExponent="26" lightingColor="#fff4d1" result="spec">
              <feDistantLight azimuth="225" elevation="52" />
            </feSpecularLighting>
            <feComposite in="spec" in2="goo" operator="in" result="shine" />
            <feComposite in="goo" in2="shine" operator="arithmetic" k1="0" k2="1" k3="0.6" k4="0" />
          </filter>
        </defs>
        <g filter={`url(#${goo})`} fill={`url(#${fill})`}>
          <rect x="-40" y={-BAND} width={width + 80} height={BAND * 2} />
          {drips.map((d) => (
            <g key={d.x} style={{ "--len": d.len, "--delay": `${d.delay}s` } as React.CSSProperties}>
              <rect className="drip-stem" x={d.x - 6} y={4} width="12" height={d.len} rx="6" />
              <circle className="drip-bulb" cx={d.x} cy={4 + d.len} r="10" />
              <circle className="drip-fall" cx={d.x} cy={4 + d.len} r="7.5" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
