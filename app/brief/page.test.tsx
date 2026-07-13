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
  it("presents the campaign visual beside the native Brief Interest form", () => {
    render(<BriefPage />);

    expect(
      screen.getByRole("heading", {
        name: "Take an early role in shaping what comes next in your sector.",
      }),
    ).not.toBeNull();
    const form = screen.getByRole("form", { name: "Brief Interest" });

    expect(form.getAttribute("method")).toBe("post");
    expect(form.getAttribute("target")).toBe("_top");
    expect(form.getAttribute("action")).toBe(
      "https://africantechnologyforum.us20.list-manage.com/subscribe/post?u=42625c20297b34e120b6e10e5&id=4110193ca4&f_id=00ee9eeef0",
    );
  });
});
