"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { recordBriefInterestCompletion } from "@/lib/brief-interest-completion";

const BRIEF_INTEREST_MAILCHIMP_ACTION =
  "https://africantechnologyforum.us20.list-manage.com/subscribe/post?u=42625c20297b34e120b6e10e5&id=4110193ca4&f_id=00ee9eeef0";

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

export function BriefInterestForm() {
  const [completionError, setCompletionError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!recordBriefInterestCompletion(window.sessionStorage)) {
      event.preventDefault();
      setCompletionError(true);
      return;
    }

    setCompletionError(false);
  }

  return (
    <form
      action={BRIEF_INTEREST_MAILCHIMP_ACTION}
      method="post"
      target="_top"
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
          className="h-12 min-w-48 justify-between rounded-full bg-foreground px-5 text-sm text-background hover:bg-foreground/85"
        >
          <span>Submit</span>
          <span className="ml-5 flex size-8 items-center justify-center rounded-full bg-background text-primary">
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </span>
        </Button>
      </div>
      {completionError && (
        <p className="text-center text-sm text-destructive" role="alert">
          We could not continue in this browser. Please try again or contact
          support.
        </p>
      )}
    </form>
  );
}
