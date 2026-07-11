// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import BriefPage from "./page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/brief",
  useSearchParams: () => new URLSearchParams(),
}));

afterEach(cleanup);

describe("Brief Interest page", () => {
  it("presents the campaign visual beside the existing interest form journey", () => {
    render(<BriefPage />);

    expect(
      screen.getByRole("heading", {
        name: "Take an early role in shaping what comes next in your sector.",
      }),
    ).not.toBeNull();
    expect(
      screen
        .getByTitle("ATF Brief Interest form")
        .getAttribute("src"),
    ).toBe("/forms/mailchimp-brief-interest.html");
  });
});
