// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  BRIEF_INTEREST_POPUP_DELAY_MS,
  BriefInterestPopup,
} from "./brief-interest-popup";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("Brief Interest popup", () => {
  function renderOpenPopup() {
    vi.useFakeTimers();
    render(<BriefInterestPopup />);
    act(() => vi.advanceTimersByTime(BRIEF_INTEREST_POPUP_DELAY_MS));
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

  it("presents the Brief Interest campaign with one CTA to the interest form", () => {
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
      screen.getByText(
        "Be among the first organizations to participate. Limited early access.",
      ),
    ).not.toBeNull();

    const ctas = screen.getAllByRole("link");
    expect(ctas).toHaveLength(1);
    expect(ctas[0].textContent).toBe("Go to Interest Form");
    expect(ctas[0].getAttribute("href")).toBe("/brief");
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
