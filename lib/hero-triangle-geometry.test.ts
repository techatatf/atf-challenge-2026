import { describe, expect, it } from "vitest";
import {
  heroEquilateralTrianglePointsAttr,
  heroEquilateralTriangleVertices,
} from "./hero-triangle-geometry";

describe("heroEquilateralTriangleVertices", () => {
  it("returns three vertices in stable order", () => {
    const v = heroEquilateralTriangleVertices(400, 800, 0.5, 0.4, 1, 0, 0.12);
    expect(v).toHaveLength(3);
    v.forEach((p) => {
      expect(Number.isFinite(p.x)).toBe(true);
      expect(Number.isFinite(p.y)).toBe(true);
    });
  });

  it("moves triangle centroid with anchor", () => {
    const left = heroEquilateralTriangleVertices(100, 100, 0.1, 0.5, 1, 0, 0.2);
    const right = heroEquilateralTriangleVertices(100, 100, 0.9, 0.5, 1, 0, 0.2);
    const avgX = (tri: typeof left) =>
      (tri[0].x + tri[1].x + tri[2].x) / 3;
    expect(avgX(right)).toBeGreaterThan(avgX(left));
  });

  it("increases circumradius monotonically with scale", () => {
    const m = 100;
    const anchorX = 0.5;
    const anchorY = 0.5;
    const base = 0.2;
    const cx = anchorX * m;
    const cy = anchorY * m;
    const dist = (scale: number) => {
      const [a] = heroEquilateralTriangleVertices(
        m,
        m,
        anchorX,
        anchorY,
        scale,
        0,
        base
      );
      return Math.hypot(a.x - cx, a.y - cy);
    };
    expect(dist(2)).toBeGreaterThan(dist(1));
    expect(dist(1)).toBeGreaterThan(dist(0.5));
  });

  it("changes vertices with rotation", () => {
    const a = heroEquilateralTriangleVertices(100, 100, 0.5, 0.5, 1, 0, 0.15);
    const b = heroEquilateralTriangleVertices(100, 100, 0.5, 0.5, 1, 40, 0.15);
    expect(a[0].x).not.toBeCloseTo(b[0].x, 3);
    expect(a[0].y).not.toBeCloseTo(b[0].y, 3);
  });

  /**
   * QA / product: geometry does not clamp radius vs stroke. A thick CSS-pixel stroke
   * on a tiny triangle may visually overlap or show long miter extensions; that is
   * accepted unless a future phase adds limits (see module header in hero-triangle-geometry).
   */
  it("still yields finite vertices for a small viewport and large scale (no clamping)", () => {
    const v = heroEquilateralTriangleVertices(
      48,
      48,
      0.5,
      0.5,
      80,
      0,
      0.14
    );
    v.forEach((p) => {
      expect(Number.isFinite(p.x)).toBe(true);
      expect(Number.isFinite(p.y)).toBe(true);
    });
  });
});

describe("heroEquilateralTrianglePointsAttr", () => {
  it("serializes three comma-separated pairs", () => {
    const s = heroEquilateralTrianglePointsAttr(400, 800, 0.5, 0.4, 1, 0, 0.12);
    const parts = s.trim().split(/\s+/);
    expect(parts).toHaveLength(3);
    parts.forEach((p) => {
      expect(p).toMatch(/^-?\d+\.\d{2},-?\d+\.\d{2}$/);
    });
  });

  it("matches stable output for a fixed fixture", () => {
    const s = heroEquilateralTrianglePointsAttr(100, 100, 0.5, 0.5, 1, 0, 0.2);
    expect(s).toBe("50.00,30.00 67.32,60.00 32.68,60.00");
  });
});
