// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";

import { submitBriefInterest } from "./mailchimp-brief-interest";

afterEach(() => {
  document.head.replaceChildren();
  vi.useRealTimers();
});

describe("Mailchimp Brief Interest submission", () => {
  it("submits the supplied form contract through JSONP and accepts a success callback", async () => {
    const fields = new FormData();
    fields.set("EMAIL", "contact@example.com");
    fields.set("FNAME", "Ama");
    fields.set("tags", "4329195");

    const submission = submitBriefInterest(fields);
    const script = document.head.querySelector("script");
    const url = new URL(script?.src ?? "");
    const callbackName = url.searchParams.get("c") ?? "";

    expect(url.origin).toBe(
      "https://africantechnologyforum.us20.list-manage.com",
    );
    expect(url.pathname).toBe("/subscribe/post-json");
    expect(url.searchParams.get("u")).toBe("42625c20297b34e120b6e10e5");
    expect(url.searchParams.get("id")).toBe("4110193ca4");
    expect(url.searchParams.get("f_id")).toBe("00ee9eeef0");
    expect(url.searchParams.get("EMAIL")).toBe("contact@example.com");
    expect(url.searchParams.get("FNAME")).toBe("Ama");
    expect(url.searchParams.get("tags")).toBe("4329195");
    expect(url.searchParams.get("subscribe")).toBe("Subscribe");
    expect(callbackName).not.toBe("");

    (
      window as typeof window & {
        [key: string]: (response: unknown) => void;
      }
    )[callbackName]({
      result: "success",
      msg: "Thank you for subscribing!",
    });

    await expect(submission).resolves.toEqual({ status: "accepted" });
    expect(document.head.querySelector("script")).toBeNull();
    expect(callbackName in window).toBe(false);
  });

  it("classifies a Mailchimp validation response without exposing provider HTML", async () => {
    const submission = submitBriefInterest(new FormData());
    const callbackName =
      new URL(document.head.querySelector("script")?.src ?? "").searchParams.get(
        "c",
      ) ?? "";

    (
      window as typeof window & {
        [key: string]: (response: unknown) => void;
      }
    )[callbackName]({
      result: "error",
      msg: '6 - Please enter a value <a href="https://example.com">here</a>',
    });

    await expect(submission).resolves.toEqual({
      status: "rejected",
      reason: "provider",
    });
  });

  it("distinguishes an existing audience contact from an accepted Brief Interest", async () => {
    const submission = submitBriefInterest(new FormData());
    const callbackName =
      new URL(document.head.querySelector("script")?.src ?? "").searchParams.get(
        "c",
      ) ?? "";

    (
      window as typeof window & {
        [key: string]: (response: unknown) => void;
      }
    )[callbackName]({
      result: "error",
      msg: "contact@example.com is already subscribed to list ATF.",
    });

    await expect(submission).resolves.toEqual({
      status: "rejected",
      reason: "existing-contact",
    });
  });

  it("returns an owned failure when the JSONP script cannot load", async () => {
    const submission = submitBriefInterest(new FormData());
    const script = document.head.querySelector("script");
    const callbackName =
      new URL(script?.src ?? "").searchParams.get("c") ?? "";

    script?.dispatchEvent(new Event("error"));

    await expect(submission).resolves.toEqual({
      status: "rejected",
      reason: "network",
    });
    expect(document.head.querySelector("script")).toBeNull();
    expect(callbackName in window).toBe(false);
  });

  it("times out a Mailchimp request and removes its executable state", async () => {
    vi.useFakeTimers();
    const submission = submitBriefInterest(new FormData(), { timeoutMs: 100 });
    const callbackName =
      new URL(document.head.querySelector("script")?.src ?? "").searchParams.get(
        "c",
      ) ?? "";

    await vi.advanceTimersByTimeAsync(100);

    await expect(submission).resolves.toEqual({
      status: "rejected",
      reason: "timeout",
    });
    expect(document.head.querySelector("script")).toBeNull();
    expect(callbackName in window).toBe(false);
  });
});
