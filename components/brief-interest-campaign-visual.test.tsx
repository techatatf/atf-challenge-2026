// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  BRIEF_INTEREST_WOMAN_OPTIONS,
  BRIEF_INTEREST_WOMAN_SRC,
  BriefInterestCampaignVisual,
} from "./brief-interest-campaign-visual";

afterEach(cleanup);

describe("Brief Interest campaign visual", () => {
  it("presents the campaign with the selected reusable portrait", () => {
    render(<BriefInterestCampaignVisual />);

    expect(
      screen.getByRole("heading", {
        name: "Take an early role in shaping what comes next in your sector.",
      }),
    ).not.toBeNull();
    expect(
      screen
        .getByAltText("ATF Brief Interest representative")
        .getAttribute("src"),
    ).toContain(encodeURIComponent(BRIEF_INTEREST_WOMAN_SRC));
    expect(BRIEF_INTEREST_WOMAN_SRC).toBe(
      "/brief-interest/brief-interest-woman-original.png",
    );
  });

  it("keeps both campaign portraits available at the asset selection seam", () => {
    expect(BRIEF_INTEREST_WOMAN_OPTIONS).toEqual({
      original: "/brief-interest/brief-interest-woman-original.png",
      referenceAligned:
        "/brief-interest/brief-interest-woman-reference-aligned.png",
    });
  });

  it("renders the responsive arrow as decorative vector geometry", () => {
    const { container } = render(<BriefInterestCampaignVisual />);

    const arrow = container.querySelector(
      'svg[data-campaign-arrow="true"]',
    );
    expect(arrow?.getAttribute("aria-hidden")).toBe("true");
    expect(arrow?.querySelectorAll("path")).toHaveLength(1);
  });
});
