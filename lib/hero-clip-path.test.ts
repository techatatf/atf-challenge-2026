import { describe, expect, it } from "vitest";
import { heroRedClipPathCss } from "./hero-clip-path";

describe("heroRedClipPathCss", () => {
  it("returns even-odd path with outer rect and triangle", () => {
    const css = heroRedClipPathCss(400, 800, 0.5, 0.4, 1, 0, 0.12);
    expect(css.startsWith('path(evenodd, "M 0 0 H')).toBe(true);
    expect(css).toContain(" Z M ");
    expect(css).toContain(" L ");
    expect(css.endsWith(' Z")')).toBe(true);
  });

  it("moves triangle with anchor and scale", () => {
    const a = heroRedClipPathCss(100, 100, 0.1, 0.1, 0.5, 0, 0.2);
    const b = heroRedClipPathCss(100, 100, 0.9, 0.9, 2, 0, 0.2);
    expect(a).not.toBe(b);
  });
});
