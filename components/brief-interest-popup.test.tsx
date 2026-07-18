// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  BRIEF_INTEREST_POPUP_DELAY_MS,
  BriefInterestPopup,
} from "./brief-interest-popup";
import {
  BRIEF_INTEREST_COMPOSITION_OFFICE_SRC,
  BRIEF_INTEREST_COMPOSITION_WOMAN_SRC,
} from "./brief-interest-composition";

class ResizeObserverMock {
  observe() {}
  disconnect() {}
  unobserve() {}
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Brief Interest popup", () => {
  function renderOpenPopup() {
    vi.useFakeTimers();
    const result = render(<BriefInterestPopup />);
    act(() => vi.advanceTimersByTime(BRIEF_INTEREST_POPUP_DELAY_MS));
    return result;
  }

  it("opens only after the configured landing-page delay", () => {
    vi.useFakeTimers();
    render(<BriefInterestPopup />);

    expect(screen.queryByRole("dialog")).toBeNull();

    act(() => vi.advanceTimersByTime(BRIEF_INTEREST_POPUP_DELAY_MS - 1));
    expect(screen.queryByRole("dialog")).toBeNull();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("dialog")).not.toBeNull();
  });

  it("starts loading the selected campaign portrait during the delay", () => {
    const requestedSources: string[] = [];
    const NativeImage = window.Image;

    class PreloadImage {
      set src(value: string) {
        requestedSources.push(value);
      }
    }

    try {
      window.Image = PreloadImage as unknown as typeof window.Image;
      vi.useFakeTimers();
      render(<BriefInterestPopup />);

      expect(screen.queryByRole("dialog")).toBeNull();
      expect(requestedSources).toContain(BRIEF_INTEREST_COMPOSITION_WOMAN_SRC);
    } finally {
      window.Image = NativeImage;
    }
  });

  it("presents the approved split campaign composition with one CTA", () => {
    renderOpenPopup();

    expect(
      screen.getByRole("heading", {
        name: "Shape What Comes Next in Your Sector",
      }),
    ).not.toBeNull();
    expect(
      screen.getByText(
        "Take an early role in shaping the future of work and innovation in your sector.",
      ),
    ).not.toBeNull();
    expect(
      screen.getByText(
        "Submit your interest and our team will guide you through the next step of the ATF AI Challenge.",
      ),
    ).not.toBeNull();
    expect(
      screen.getByText("Be among the first organizations to participate."),
    ).not.toBeNull();
    expect(screen.getByText("Limited early access.")).not.toBeNull();

    const ctas = screen.getAllByRole("link");
    expect(ctas).toHaveLength(1);
    expect(ctas[0].textContent).toBe("Go to Interest Form");
    expect(ctas[0].getAttribute("href")).toBe("/brief");
    expect(ctas[0].querySelector("svg")).not.toBeNull();

    expect(screen.getByAltText("African Technology Forum")).not.toBeNull();
    expect(
      document.querySelector('[data-brief-interest-challenge-brand="true"]')
        ?.textContent,
    ).toBe("ATF AI Challenge");
    expect(
      document.querySelector('[data-brief-interest-heading-accent="true"]')
        ?.textContent,
    ).toBe("in Your Sector");
    expect(
      document.querySelector('[data-brief-interest-early-access="true"]'),
    ).not.toBeNull();

    const composition = document.querySelector(
      '[data-brief-interest-popup-composition="true"]',
    );
    expect(composition).not.toBeNull();

    const visual = composition?.querySelector(
      '[data-brief-interest-composition="true"]',
    );
    expect(visual).not.toBeNull();
    expect(visual?.getAttribute("aria-hidden")).toBe("true");
    const artworkSources = Array.from(
      visual?.querySelectorAll('img[alt=""]') ?? [],
    ).map((image) => image.getAttribute("src"));
    expect(artworkSources).toHaveLength(2);
    expect(artworkSources[0]).toContain(
      encodeURIComponent(BRIEF_INTEREST_COMPOSITION_OFFICE_SRC),
    );
    expect(artworkSources[1]).toContain(
      encodeURIComponent(BRIEF_INTEREST_COMPOSITION_WOMAN_SRC),
    );
    expect(
      visual?.querySelector(
        '[data-brief-interest-composition-copy="true"]',
      ),
    ).toBeNull();

    expect(visual?.contains(screen.getByRole("heading"))).toBe(false);
    expect(visual?.contains(ctas[0])).toBe(false);
  });

  it("dismisses through the close icon", () => {
    renderOpenPopup();

    fireEvent.click(
      screen.getByRole("button", { name: "Close Brief Interest popup" }),
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("dismisses when Escape is pressed", () => {
    renderOpenPopup();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("dismisses when the overlay is clicked", () => {
    renderOpenPopup();

    const overlay = screen.getByTestId("brief-interest-popup-overlay");
    fireEvent.pointerDown(overlay);
    fireEvent.click(overlay);

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("moves initial focus to the sole CTA", () => {
    renderOpenPopup();

    expect(document.activeElement).toBe(
      screen.getByRole("link", { name: "Go to Interest Form" }),
    );
  });

  it("schedules the popup again for a fresh landing-page mount", () => {
    vi.useFakeTimers();
    const firstPage = render(<BriefInterestPopup />);
    act(() => vi.advanceTimersByTime(BRIEF_INTEREST_POPUP_DELAY_MS));
    fireEvent.click(
      screen.getByRole("button", { name: "Close Brief Interest popup" }),
    );
    firstPage.unmount();

    render(<BriefInterestPopup />);
    act(() => vi.advanceTimersByTime(BRIEF_INTEREST_POPUP_DELAY_MS - 1));
    expect(screen.queryByRole("dialog")).toBeNull();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("dialog")).not.toBeNull();
  });
});
