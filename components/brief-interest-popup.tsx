"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight01Icon,
  Cancel01Icon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dialog } from "radix-ui";

import {
  BRIEF_INTEREST_COMPOSITION_WOMAN_SRC,
  BriefInterestComposition,
} from "@/components/brief-interest-composition";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BRIEF_INTEREST_POPUP_DELAY_MS = 700;

export function BriefInterestPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const portrait = new window.Image();
    portrait.src = BRIEF_INTEREST_COMPOSITION_WOMAN_SRC;

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
          className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[56rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-background shadow-2xl outline-none"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            ctaRef.current?.focus();
          }}
        >
          <Dialog.Close
            aria-label="Close Brief Interest popup"
            className="absolute top-3 right-3 z-50 inline-flex size-10 items-center justify-center rounded-full bg-background/95 text-foreground shadow-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:top-4 md:right-4"
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </Dialog.Close>

          <div
            data-brief-interest-popup-composition="true"
            className="max-h-[calc(100dvh-2rem)] overflow-y-auto md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
          >
            <BriefInterestComposition className="h-44 sm:h-52 md:h-auto md:min-h-[35rem]" />

            <div className="px-6 py-7 sm:px-8 sm:py-9 md:flex md:min-h-[35rem] md:flex-col md:justify-center md:px-10 md:py-12">
              <div className="mb-7 flex items-center justify-between gap-5 pr-10 md:mb-10 md:pr-6">
                <Image
                  src="/atf-assets/atf-logo-vector.svg"
                  alt="African Technology Forum"
                  width={150}
                  height={42}
                  className="h-auto w-28 sm:w-32"
                />
                <p
                  data-brief-interest-challenge-brand="true"
                  className="shrink-0 text-[10px] leading-none font-extrabold tracking-[0.03em] text-foreground uppercase sm:text-xs"
                >
                  <span className="text-primary">ATF</span> AI Challenge
                </p>
              </div>

              <Dialog.Title
                aria-label="Shape What Comes Next in Your Sector"
                className="max-w-md pr-7 text-3xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-4xl"
              >
                <span className="block">Shape What Comes Next</span>
                <span
                  data-brief-interest-heading-accent="true"
                  className="block text-primary"
                >
                  in Your Sector
                </span>
              </Dialog.Title>
              <div className="mt-5 h-0.5 w-12 bg-primary" aria-hidden="true" />
              <Dialog.Description
                id="brief-interest-popup-description"
                className="mt-5 space-y-3 text-sm leading-6 text-foreground/75"
              >
                <span className="block">
                  Take an early role in shaping the future of work and innovation
                  in your sector.
                </span>
                <span className="block">
                  Submit your interest and our team will guide you through the
                  next step of the ATF AI Challenge.
                </span>
              </Dialog.Description>

              <div
                data-brief-interest-early-access="true"
                className="mt-5 flex items-center gap-3"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <HugeiconsIcon icon={UserMultipleIcon} strokeWidth={2} />
                </span>
                <p className="text-xs leading-5 text-foreground/75">
                  Be among the first organizations to participate.
                  <span className="block">Limited early access.</span>
                </p>
              </div>

              <Link
                ref={ctaRef}
                href="/brief"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-6 h-14 w-full justify-between rounded-lg px-5 text-sm font-semibold sm:w-auto sm:min-w-64 sm:self-start",
                )}
              >
                <span>Go to Interest Form</span>
                <span className="ml-5 flex size-8 items-center justify-center rounded-full bg-primary-foreground text-primary">
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
                </span>
              </Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
