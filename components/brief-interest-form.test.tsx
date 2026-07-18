// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BriefInterestForm } from "./brief-interest-form";
import { consumeRecentBriefInterestCompletion } from "@/lib/brief-interest-completion";

const { push } = vi.hoisted(() => ({
  push: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

beforeEach(() => {
  window.sessionStorage.clear();
  push.mockClear();
});

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

  it("opens the ATF confirmation only after Mailchimp accepts the Brief Interest", async () => {
    const submit = vi.fn().mockResolvedValue({ status: "accepted" });
    render(<BriefInterestForm submit={submit} />);

    const wasSubmitted = fireEvent.submit(
      screen.getByRole("form", { name: "Brief Interest" }),
    );

    expect(wasSubmitted).toBe(false);
    expect(consumeRecentBriefInterestCompletion(window.sessionStorage)).toBe(
      false,
    );
    await waitFor(() => expect(push).toHaveBeenCalledWith("/brief-submitted"));
    expect(
      consumeRecentBriefInterestCompletion(window.sessionStorage),
    ).toBe(true);
  });

  it("shows an owned confirmation fallback when browser storage is unavailable", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage unavailable");
    });
    const submit = vi.fn().mockResolvedValue({ status: "accepted" });
    render(<BriefInterestForm submit={submit} />);

    const wasSubmitted = fireEvent.submit(
      screen.getByRole("form", { name: "Brief Interest" }),
    );

    expect(wasSubmitted).toBe(false);
    await waitFor(() =>
      expect(screen.getByRole("alert").textContent).toContain(
        "Mailchimp accepted your Brief Interest",
      ),
    );
    expect(push).not.toHaveBeenCalled();
  });

  it("allows only one Mailchimp submission at a time", async () => {
    let resolveSubmission:
      | ((result: {
          status: "rejected";
          reason: "network";
        }) => void)
      | undefined;
    const submit = vi.fn(
      () =>
        new Promise<{ status: "rejected"; reason: "network" }>((resolve) => {
          resolveSubmission = resolve;
        }),
    );
    render(<BriefInterestForm submit={submit} />);
    const form = screen.getByRole("form", { name: "Brief Interest" });

    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(submit).toHaveBeenCalledTimes(1);
    resolveSubmission?.({ status: "rejected", reason: "network" });
    await screen.findByRole("alert");
  });

  it("preserves entered values when acceptance cannot be confirmed", async () => {
    const submit = vi.fn().mockResolvedValue({
      status: "rejected",
      reason: "timeout",
    });
    render(<BriefInterestForm submit={submit} />);
    const organization = screen.getByLabelText(
      "Organization Name",
    ) as HTMLInputElement;
    fireEvent.change(organization, { target: { value: "Akwaaba Labs" } });

    fireEvent.submit(screen.getByRole("form", { name: "Brief Interest" }));

    await screen.findByRole("alert");
    expect(organization.value).toBe("Akwaaba Labs");
    expect(push).not.toHaveBeenCalled();
    expect(consumeRecentBriefInterestCompletion(window.sessionStorage)).toBe(
      false,
    );
  });

  it("does not misrepresent an existing subscriber as accepted", async () => {
    const submit = vi.fn().mockResolvedValue({
      status: "rejected",
      reason: "existing-contact",
    });
    render(<BriefInterestForm submit={submit} />);

    fireEvent.submit(screen.getByRole("form", { name: "Brief Interest" }));

    expect((await screen.findByRole("alert")).textContent).toContain(
      "already receives ATF updates",
    );
    expect(push).not.toHaveBeenCalled();
  });
});
