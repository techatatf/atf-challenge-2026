"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dialog } from "radix-ui";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BRIEF_INTEREST_POPUP_DELAY_MS = 700;

export function BriefInterestPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const openTimer = window.setTimeout(
      () => setIsOpen(true),
      BRIEF_INTEREST_POPUP_DELAY_MS,
    );

    return () => window.clearTimeout(openTimer);
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          data-testid="brief-interest-popup-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        />
        <Dialog.Content
          aria-describedby="brief-interest-popup-description"
          className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 border border-border bg-background p-6 shadow-2xl outline-none sm:p-8"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            ctaRef.current?.focus();
          }}
        >
          <Dialog.Close
            aria-label="Close Brief Interest popup"
            className="absolute top-3 right-3 inline-flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </Dialog.Close>

          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Brief Interest
          </p>
          <Dialog.Title className="max-w-md pr-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Shape What Comes Next in Your Sector
          </Dialog.Title>
          <Dialog.Description
            id="brief-interest-popup-description"
            className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground sm:text-base"
          >
            <span className="block">
              Take an early role in shaping the future of work and innovation in
              your sector.
            </span>
            <span className="block">
              Submit your interest and our team will guide you through the next
              step of the ATF AI Challenge.
            </span>
          </Dialog.Description>

          <Link
            ref={ctaRef}
            href="/brief"
            className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full sm:w-auto")}
          >
            Go to Interest Form
          </Link>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Be among the first organizations to participate. Limited early
            access.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
