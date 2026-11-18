// Honeycomb behind the hero photo: real cells (honey-filled, wax-capped, empty) in a loose cluster that fades out.
// Deterministic, so server and client draw the same comb.

const R = 30;
const W = Math.sqrt(3) * R;
const COLS = 13;
const ROWS = 10;

const hexPath = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${i ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join("") + "Z";

// small deterministic noise in [0, 1)
const noise = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const width = W * (COLS + 0.5);
const height = R * 1.5 * (ROWS - 1) + R * 2;

const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const cx = W / 2 + col * W + (row % 2 ? W / 2 : 0);
  const cy = R + row * 1.5 * R;
  // two clusters: lower left and upper right of the photo, so the comb peeks out around it
  const d1 = Math.hypot((cx - width * 0.18) / width, (cy - height * 0.78) / height);
  const d2 = Math.hypot((cx - width * 0.86) / width, (cy - height * 0.16) / height);
  const d = Math.min(d1, d2);
  const n = noise(i);
  if (n > 1.15 - d * 1.6) return null;
  const kind = n < 0.42 ? "honey" : n < 0.7 ? "cap" : "empty";
  return { cx, cy, kind, o: Math.max(0.25, 1 - d * 1.5) };
}).filter((c) => c !== null);

export function HeroComb() {
  return (
    <div className="hero-comb" aria-hidden="true">
      <svg viewBox={`0 0 ${width.toFixed(0)} ${height.toFixed(0)}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="comb-honey" cx="38%" cy="32%" r="75%">
            <stop offset="0" stopColor="#ffd36e" />
            <stop offset="0.45" stopColor="#e39a24" />
            <stop offset="1" stopColor="#9c5609" />
          </radialGradient>
          <radialGradient id="comb-cap" cx="40%" cy="35%" r="75%">
            <stop offset="0" stopColor="#f7e3ad" />
            <stop offset="1" stopColor="#d3ad5e" />
          </radialGradient>
          <radialGradient id="comb-empty" cx="50%" cy="40%" r="70%">
            <stop offset="0" stopColor="#3a2a1a" />
            <stop offset="1" stopColor="#1a120c" />
          </radialGradient>
        </defs>
        {cells.map((c) => (
          <g key={`${c.cx.toFixed(0)}-${c.cy.toFixed(0)}`} opacity={c.o}>
            <path d={hexPath(c.cx, c.cy, R - 1)} fill="#c99236" />
            <path d={hexPath(c.cx, c.cy, R - 5)} fill={`url(#comb-${c.kind})`} />
            {c.kind === "honey" ? <path d={hexPath(c.cx - 5, c.cy - 7, R * 0.32)} fill="#fff6dc" opacity="0.35" /> : null}
          </g>
        ))}
      </svg>
    </div>
  );
}
