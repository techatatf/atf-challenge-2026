"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { recordBriefInterestCompletion } from "@/lib/brief-interest-completion";
import {
  submitBriefInterest,
  type BriefInterestSubmissionResult,
} from "@/lib/mailchimp-brief-interest";

const SECTORS = [
  "Health",
  "Education",
  "Agriculture",
  "Mining & Manufacturing",
  "Finance",
  "Government",
  "Other",
] as const;

type TextFieldProps = {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  type?: "email" | "text";
};

function TextField({
  id,
  label,
  name,
  required = false,
  type = "text",
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        className="h-12 rounded-lg border-0 bg-background px-4 text-sm shadow-sm focus-visible:ring-2"
      />
    </div>
  );
}

type BriefInterestFormProps = {
  submit?: (fields: FormData) => Promise<BriefInterestSubmissionResult>;
};

export function BriefInterestForm({
  submit = submitBriefInterest,
}: BriefInterestFormProps = {}) {
  const router = useRouter();
  const submissionInFlight = useRef(false);
  const [status, setStatus] = useState<
    "editing" | "existing-contact" | "failed" | "storage-error" | "submitting"
  >("editing");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInFlight.current) return;

    submissionInFlight.current = true;
    setStatus("submitting");

    const result = await submit(new FormData(event.currentTarget));

    if (result.status === "rejected") {
      submissionInFlight.current = false;
      setStatus(
        result.reason === "existing-contact" ? "existing-contact" : "failed",
      );
      return;
    }

    if (!recordBriefInterestCompletion(window.sessionStorage)) {
      submissionInFlight.current = false;
      setStatus("storage-error");
      return;
    }

    router.push("/brief-submitted");
  }

  return (
    <form
      aria-label="Brief Interest"
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <section className="rounded-2xl bg-muted/70 p-5 sm:p-7">
        <h3 className="mb-5 text-2xl font-medium tracking-tight text-foreground">
          About You
        </h3>
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <TextField
            id="brief-first-name"
            label="First Name"
            name="FNAME"
            required
          />
          <TextField
            id="brief-last-name"
            label="Last Name"
            name="LNAME"
            required
          />
          <TextField
            id="brief-organization"
            label="Organization Name"
            name="COMPANY"
            required
          />
          <TextField
            id="brief-job-title"
            label="Job Title"
            name="MMERGE10"
            required
          />
          <TextField id="brief-country" label="Country" name="MMERGE8" />
          <TextField
            id="brief-email"
            label="Email Address"
            name="EMAIL"
            type="email"
            required
          />
          <TextField
            id="brief-phone"
            label="Phone Number (optional)"
            name="PHONE"
          />
        </div>
      </section>

      <section className="rounded-2xl bg-muted/70 p-5 sm:p-7">
        <h3 className="mb-5 text-2xl font-medium tracking-tight text-foreground">
          Your Sector
        </h3>
        <div className="space-y-2">
          <Label htmlFor="brief-sector" className="font-medium text-foreground">
            Select your sector
          </Label>
          <select
            id="brief-sector"
            name="MMERGE13"
            required
            defaultValue=""
            className="h-12 w-full rounded-lg border-0 bg-background px-4 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="" disabled>
              Select a sector
            </option>
            {SECTORS.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      </section>

      <input type="hidden" name="tags" value="4329195" />
      <div aria-hidden="true" className="absolute -left-[5000px]">
        <label htmlFor="brief-mailchimp-trap">Leave this field empty</label>
        <input
          id="brief-mailchimp-trap"
          type="text"
          name="b_42625c20297b34e120b6e10e5_4110193ca4"
          tabIndex={-1}
          defaultValue=""
        />
      </div>

      <div className="flex justify-center pt-1">
        <Button
          type="submit"
          name="subscribe"
          value="Subscribe"
          size="lg"
          disabled={status === "submitting"}
          className="h-12 min-w-48 justify-between rounded-full bg-foreground px-5 text-sm text-background hover:bg-foreground/85"
        >
          <span>{status === "submitting" ? "Submitting…" : "Submit"}</span>
          <span className="ml-5 flex size-8 items-center justify-center rounded-full bg-background text-primary">
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </span>
        </Button>
      </div>
      {status === "existing-contact" && (
        <p className="text-center text-sm text-destructive" role="alert">
          This email already receives ATF updates, but Mailchimp did not record
          this Brief Interest. Please contact the ATF team for help.
        </p>
      )}
      {status === "failed" && (
        <p className="text-center text-sm text-destructive" role="alert">
          We could not confirm that Mailchimp accepted your Brief Interest.
          Your details are still here—please review them and try again.
        </p>
      )}
      {status === "storage-error" && (
        <p className="text-center text-sm text-destructive" role="alert">
          Mailchimp accepted your Brief Interest, but we could not open the
          confirmation page in this browser.
        </p>
      )}
    </form>
  );
}
