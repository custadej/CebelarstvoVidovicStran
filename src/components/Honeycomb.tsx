import { HoneycombCanvas } from "@/components/HoneycombCanvas";

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

// The honeycomb colour scale: SVG for everyone, replaced by the three.js canvas on wide screens with motion allowed.
export function Honeycomb({ colors, className = "" }: { colors: string[]; className?: string }) {
  const R = 46;
  const w = Math.sqrt(3) * R;
  const cols = 9;
  const rows = 3;
  const cells = Array.from({ length: rows * cols }, (_, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const t = (c + (r % 2 ? 0.5 : 0)) / (cols - 0.5);
    return { x: 60 + c * w + (r % 2 ? w / 2 : 0), y: 60 + r * 1.5 * R, color: colors[Math.min(colors.length - 1, Math.round(t * (colors.length - 1)))] };
  });
  const width = 60 * 2 + (cols - 0.5) * w;
  const height = 60 * 2 + (rows - 1) * 1.5 * R;

  return (
    <div className={`honeycomb relative w-full ${className}`}>
      <svg
        viewBox={`0 0 ${width.toFixed(0)} ${height.toFixed(0)}`}
        className="honeycomb-svg absolute inset-0 h-full w-full"
        role="img"
        aria-label="Satnica, obarvana v odtenkih šestih vrst medu od svetlega akacijevega do temnega hojevega"
      >
        {cells.map((cell, i) => (
          <g key={i}>
            <polygon points={hexPoints(cell.x, cell.y, R - 2)} fill="#f0d9a0" />
            <polygon points={hexPoints(cell.x, cell.y, R - 8)} fill={cell.color} />
            <polygon points={hexPoints(cell.x - 6, cell.y - 8, R * 0.34)} fill="#fff" opacity="0.14" />
          </g>
        ))}
      </svg>
      <HoneycombCanvas colors={colors} />
    </div>
  );
}
