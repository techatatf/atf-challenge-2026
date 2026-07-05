import { describe, expect, it } from "vitest";
import { buildPrimaryCtaHref, primaryCta } from "./application-status";

describe("buildPrimaryCtaHref", () => {
  it("preserves channel attribution only for apply links", () => {
    expect(buildPrimaryCtaHref("AAAABHHBKA", "/apply")).toBe(
      "/apply?channel=AAAABHHBKA",
    );

    expect(buildPrimaryCtaHref("AAAABHHBKA", "/subscribe")).toBe(
      "/subscribe",
    );
  });

  it("uses the configured primary CTA destination", () => {
    expect(buildPrimaryCtaHref(undefined)).toBe(primaryCta.href);
  });
});
