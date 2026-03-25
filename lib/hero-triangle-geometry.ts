/**
 * Equilateral triangle geometry for the hero SVG stroke overlay.
 *
 * Construction: centroid at normalized anchor in the section border box;
 * circumradius = `baseRadiusFrac * min(w,h) * scale`; rotation in degrees.
 * Vertices use the same equilateral layout as the retired clip-path hole (one vertex
 * at local “north”, others at 120° steps).
 *
 * SVG stroke (applied in `Hero`, not here):
 * - Default stroke is **centered** on the polygon edge; inner/outer halves sit on
 *   either side of the mathematical boundary (matches the old hole silhouette).
 * - **`vector-effect: non-scaling-stroke`** (see hero `<polygon>`) keeps stroke width
 *   in **CSS pixels** while the triangle grows or the SVG viewBox resizes.
 * - **`stroke-linejoin: miter`** gives sharp corners; very large stroke widths vs
 *   short edges can produce visible miter spikes — accepted tradeoff unless we add
 *   a stroke cap / join limit later.
 *
 * Extreme geometry: this module does **not** clamp radius for thick strokes or tiny
 * viewports. Coordinates stay finite; visual overlap or spiky miters are possible
 * and are an explicit product choice until mitigations ship (see tests).
 */

export type HeroTriangleVertex = { x: number; y: number };

/**
 * Vertices in SVG polygon order (consistent winding for the equilateral triangle).
 */
export function heroEquilateralTriangleVertices(
  w: number,
  h: number,
  anchorX: number,
  anchorY: number,
  scale: number,
  rotateDeg: number,
  baseRadiusFrac: number
): [HeroTriangleVertex, HeroTriangleVertex, HeroTriangleVertex] {
  const m = Math.min(w, h);
  const cx = anchorX * w;
  const cy = anchorY * h;
  const radius = baseRadiusFrac * m * scale;

  const rad = (rotateDeg * Math.PI) / 180;
  const angles = [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6] as const;

  const pts = angles.map((a) => {
    const x = cx + radius * Math.cos(a + rad);
    const y = cy + radius * Math.sin(a + rad);
    return { x, y };
  });

  return [pts[0], pts[1], pts[2]];
}

/**
 * `points` attribute string for `<polygon>` (two decimal places for stable DOM diffs).
 */
export function heroEquilateralTrianglePointsAttr(
  w: number,
  h: number,
  anchorX: number,
  anchorY: number,
  scale: number,
  rotateDeg: number,
  baseRadiusFrac: number
): string {
  const [a, b, c] = heroEquilateralTriangleVertices(
    w,
    h,
    anchorX,
    anchorY,
    scale,
    rotateDeg,
    baseRadiusFrac
  );
  return `${fmt(a.x)},${fmt(a.y)} ${fmt(b.x)},${fmt(b.y)} ${fmt(c.x)},${fmt(c.y)}`;
}

function fmt(n: number): string {
  return Number.isFinite(n) ? n.toFixed(2) : "0";
}
