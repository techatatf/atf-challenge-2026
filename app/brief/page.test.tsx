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

    expect(form.getAttribute("method")).toBe("post");
    expect(form.getAttribute("target")).toBe("_top");
    expect(form.getAttribute("action")).toBe(
      "https://africantechnologyforum.us20.list-manage.com/subscribe/post?u=42625c20297b34e120b6e10e5&id=4110193ca4&f_id=00ee9eeef0",
    );
  });
});
