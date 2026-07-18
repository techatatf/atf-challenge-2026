// @vitest-environment jsdom

import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { recordBriefInterestCompletion } from "@/lib/brief-interest-completion";

import { BriefInterestCompletionGate } from "./brief-interest-completion-gate";

const { replace } = vi.hoisted(() => ({
  replace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

beforeEach(() => {
  vi.useFakeTimers();
  window.sessionStorage.clear();
  replace.mockClear();
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
      unobserve() {}
    },
  );
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Brief Interest completion", () => {
  it("presents the production composition beside the existing confirmation after a recent completion", () => {
    recordBriefInterestCompletion(window.sessionStorage);

    const { container } = render(<BriefInterestCompletionGate />);
    act(() => vi.runAllTimers());

    const composition = container.querySelector(
      '[data-brief-interest-composition="true"]',
    );
    const heading = screen.getByRole("heading", {
      name: "Thank you for your interest",
    });

    expect(composition).not.toBeNull();
    expect(
      composition?.querySelector(
        '[data-brief-interest-composition-copy="true"]',
      ),
    ).toBeNull();
    expect(composition?.contains(heading)).toBe(false);
    expect(
      screen.getByText(
        "Your form was sent to Mailchimp. The ATF team will review the details and guide you through the next step.",
      ),
    ).not.toBeNull();
    expect(screen.getByRole("link", { name: "Return to home" })).toHaveProperty(
      "pathname",
      "/",
    );
    expect(replace).not.toHaveBeenCalled();
  });

  it("redirects an invalid visit to the Brief Interest form without revealing a confirmation", () => {
    const { container } = render(<BriefInterestCompletionGate />);

    expect(replace).toHaveBeenCalledWith("/brief");
    expect(
      screen.queryByRole("heading", { name: "Thank you for your interest" }),
    ).toBeNull();
    expect(
      container.querySelector('[data-brief-interest-composition="true"]'),
    ).toBeNull();
  });
});
