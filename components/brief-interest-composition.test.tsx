// @vitest-environment jsdom

import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  BRIEF_INTEREST_COMPOSITION_OFFICE_SRC,
  BRIEF_INTEREST_COMPOSITION_WOMAN_SRC,
  BriefInterestComposition,
} from "./brief-interest-composition";

let resizeCallback: ResizeObserverCallback;

class ResizeObserverMock {
  constructor(callback: ResizeObserverCallback) {
    resizeCallback = callback;
  }

  observe() {}
  disconnect() {}
  unobserve() {}
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function resizeComposition(element: HTMLElement, width: number, height: number) {
  Object.defineProperties(element, {
    clientWidth: { configurable: true, value: width },
    clientHeight: { configurable: true, value: height },
  });

  act(() => {
    resizeCallback([], {} as ResizeObserver);
  });
}

describe("Brief Interest Composition", () => {
  it("exposes decorative production artwork and optional supplemental copy", () => {
    const { container } = render(
      <BriefInterestComposition copy={<p>Supplemental campaign copy</p>} />,
    );

    const composition = container.querySelector(
      '[data-brief-interest-composition="true"]',
    );

    expect(composition?.getAttribute("aria-hidden")).toBe("true");
    expect(composition?.querySelectorAll("img")).toHaveLength(2);
    expect(
      Array.from(composition?.querySelectorAll("img") ?? []).every(
        (image) => image.getAttribute("alt") === "",
      ),
    ).toBe(true);
    expect(BRIEF_INTEREST_COMPOSITION_OFFICE_SRC).toBe(
      "/brief-interest/brief-interest-office.jpg",
    );
    expect(BRIEF_INTEREST_COMPOSITION_WOMAN_SRC).toBe(
      "/brief-interest/brief-interest-woman-original.png",
    );
  });

  it("anchors a square aperture at the top-right and adapts copy to a safe remainder", () => {
    const { container } = render(
      <BriefInterestComposition copy={<p>Supplemental campaign copy</p>} />,
    );
    const composition = container.querySelector(
      '[data-brief-interest-composition="true"]',
    ) as HTMLElement;
    const aperture = container.querySelector(
      '[data-brief-interest-aperture="true"]',
    ) as HTMLElement;

    resizeComposition(composition, 640, 800);

    expect(aperture.style.width).toBe("640px");
    expect(aperture.style.height).toBe("640px");
    expect(aperture.className).toContain("top-0");
    expect(aperture.className).toContain("right-0");
    expect(screen.queryByText("Supplemental campaign copy")).toBeNull();

    resizeComposition(composition, 640, 900);
    expect(screen.getByText("Supplemental campaign copy")).not.toBeNull();

    resizeComposition(composition, 900, 640);
    expect(aperture.style.width).toBe("640px");
    expect(aperture.style.height).toBe("640px");
    expect(screen.getByText("Supplemental campaign copy")).not.toBeNull();
  });
});
