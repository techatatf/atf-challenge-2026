// @vitest-environment jsdom

import { act, cleanup, render, screen } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import BriefPage from "./page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/brief",
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

let resizeCallback: ResizeObserverCallback;

beforeEach(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback;
      }

      observe() {}
      disconnect() {}
      unobserve() {}
    },
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Brief Interest page", () => {
  it("presents the production composition and supplemental campaign copy beside the native Brief Interest form", () => {
    const { container } = render(<BriefPage />);

    const composition = container.querySelector(
      '[data-brief-interest-composition="true"]',
    ) as HTMLElement;
    Object.defineProperties(composition, {
      clientWidth: { configurable: true, value: 640 },
      clientHeight: { configurable: true, value: 900 },
    });
    act(() => {
      resizeCallback([], {} as ResizeObserver);
    });

    expect(
      screen.getByText(
        "Take an early role in shaping what comes next in your sector.",
      ),
    ).not.toBeNull();
    expect(
      screen.getByText(
        "Share your organization's interest in contributing sector-specific input. Our team will guide you through the next step.",
      ),
    ).not.toBeNull();
    const form = screen.getByRole("form", { name: "Brief Interest" });

    expect(form.getAttribute("method")).toBeNull();
    expect(form.getAttribute("target")).toBeNull();
    expect(form.getAttribute("action")).toBeNull();
  });
});
