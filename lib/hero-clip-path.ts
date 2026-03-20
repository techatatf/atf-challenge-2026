/**
 * Builds a CSS clip-path for the hero red sheet: full bleed with an equilateral
 * triangular hole (even-odd). Coordinates are px in the red layer’s border box.
 * Editor-tuned via anchor + scale + rotation.
 */
export function heroRedClipPathCss(
  w: number,
  h: number,
  anchorX: number,
  anchorY: number,
  scale: number,
  rotateDeg: number,
  baseRadiusFrac: number
): string {
  const m = Math.min(w, h);
  const cx = anchorX * w;
  const cy = anchorY * h;
  const radius = baseRadiusFrac * m * scale;

  const rad = (rotateDeg * Math.PI) / 180;
  const angles = [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6] as const;
  const pts = angles.map((a) => {
    const x = cx + radius * Math.cos(a + rad);
    const y = cy + radius * Math.sin(a + rad);
    return `${fmt(x)} ${fmt(y)}`;
  });

  return `path(evenodd, "M 0 0 H ${fmt(w)} V ${fmt(h)} H 0 Z M ${pts[0]} L ${pts[1]} L ${pts[2]} Z")`;
}

function fmt(n: number): string {
  return Number.isFinite(n) ? n.toFixed(2) : "0";
}
