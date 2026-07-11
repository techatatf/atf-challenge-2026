import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const formDocument = readFileSync(
  join(process.cwd(), "public/forms/mailchimp-brief-interest.html"),
  "utf8",
);

describe("Brief Interest form document", () => {
  it("posts the supplied fields to the supplied Mailchimp audience", () => {
    expect(formDocument).toContain(
      "https://africantechnologyforum.us20.list-manage.com/subscribe/post?u=42625c20297b34e120b6e10e5&amp;id=4110193ca4&amp;f_id=00ee9eeef0",
    );

    for (const name of [
      "FNAME",
      "LNAME",
      "COMPANY",
      "MMERGE10",
      "MMERGE8",
      "EMAIL",
      "PHONE",
      "MMERGE13",
    ]) {
      expect(formDocument).toContain(`name="${name}"`);
    }

    for (const name of [
      "FNAME",
      "LNAME",
      "COMPANY",
      "MMERGE10",
      "EMAIL",
      "MMERGE13",
    ]) {
      expect(formDocument).toMatch(
        new RegExp(`name="${name}"[^>]*\\srequired(?:=|\\s|>)`),
      );
    }

    for (const name of ["MMERGE8", "PHONE"]) {
      expect(formDocument).not.toMatch(
        new RegExp(`name="${name}"[^>]*\\srequired(?:=|\\s|>)`),
      );
    }
  });

  it("offers the agreed Sector choices", () => {
    for (const sector of [
      "Health",
      "Education",
      "Agriculture",
      "Mining &amp; Manufacturing",
      "Finance",
      "Government",
      "Other",
    ]) {
      expect(formDocument).toContain(`<option value="${sector}">`);
    }
  });

  it("reports a Mailchimp response to the same-origin parent", () => {
    expect(formDocument).toContain('type: "brief-interest-response"');
    expect(formDocument).toContain("window.location.origin");
  });
});
