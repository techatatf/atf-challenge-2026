// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BriefInterestForm } from "./brief-interest-form";
import { consumeRecentBriefInterestCompletion } from "@/lib/brief-interest-completion";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Brief Interest form", () => {
  it("collects the approved Mailchimp fields with the agreed requirements", () => {
    render(<BriefInterestForm />);

    const fields = [
      ["First Name", "FNAME", true],
      ["Last Name", "LNAME", true],
      ["Organization Name", "COMPANY", true],
      ["Job Title", "MMERGE10", true],
      ["Country", "MMERGE8", false],
      ["Email Address", "EMAIL", true],
      ["Phone Number (optional)", "PHONE", false],
      ["Select your sector", "MMERGE13", true],
    ] as const;

    for (const [label, name, required] of fields) {
      const field = screen.getByLabelText(label);
      expect(field.getAttribute("name")).toBe(name);
      expect((field as HTMLInputElement).required).toBe(required);
    }

    const submit = screen.getByRole("button", { name: "Submit" });
    expect(submit.getAttribute("name")).toBe("subscribe");
    expect(submit.getAttribute("value")).toBe("Subscribe");
    expect(
      document.querySelector('input[name="tags"]')?.getAttribute("value"),
    ).toBe("4329195");
    expect(
      document.querySelector(
        'input[name="b_42625c20297b34e120b6e10e5_4110193ca4"]',
      ),
    ).not.toBeNull();
  });

  it("offers the agreed Sector choices", () => {
    render(<BriefInterestForm />);

    const sector = screen.getByLabelText("Select your sector");
    expect(
      Array.from((sector as HTMLSelectElement).options).map((option) => option.value),
    ).toEqual([
      "",
      "Health",
      "Education",
      "Agriculture",
      "Mining & Manufacturing",
      "Finance",
      "Government",
      "Other",
    ]);
  });

  it("records a recent submission attempt before leaving for Mailchimp", () => {
    window.sessionStorage.clear();
    render(<BriefInterestForm />);

    fireEvent.submit(screen.getByRole("form", { name: "Brief Interest" }));

    expect(
      consumeRecentBriefInterestCompletion(window.sessionStorage),
    ).toBe(true);
  });

  it("stays on the form when the submission attempt cannot be recorded", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage unavailable");
    });
    render(<BriefInterestForm />);

    const wasSubmitted = fireEvent.submit(
      screen.getByRole("form", { name: "Brief Interest" }),
    );

    expect(wasSubmitted).toBe(false);
    expect(screen.getByRole("alert").textContent).toContain(
      "could not continue in this browser",
    );
  });
});
