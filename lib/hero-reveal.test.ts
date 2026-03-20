import { describe, expect, it } from "vitest";
import { revealProgressFromScroll } from "./hero-reveal";

describe("revealProgressFromScroll", () => {
  it("maps 40% scroll fraction so full reveal at 0.4 of hero progress", () => {
    const f = 0.4;
    expect(revealProgressFromScroll(0, f)).toBe(0);
    expect(revealProgressFromScroll(0.2, f)).toBe(0.5);
    expect(revealProgressFromScroll(0.4, f)).toBe(1);
    expect(revealProgressFromScroll(0.8, f)).toBe(1);
  });

  it("clamps below zero", () => {
    expect(revealProgressFromScroll(-0.1, 0.4)).toBe(0);
  });

  it("treats non-positive fraction as immediately fully revealed", () => {
    expect(revealProgressFromScroll(0, 0)).toBe(1);
    expect(revealProgressFromScroll(0, -1)).toBe(1);
  });
});
