"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dialog } from "radix-ui";

import { BriefInterestCampaignArrow } from "@/components/brief-interest-campaign-arrow";
import { BRIEF_INTEREST_WOMAN_SRC } from "@/components/brief-interest-campaign-visual";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BRIEF_INTEREST_POPUP_DELAY_MS = 700;

export function BriefInterestPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const portrait = new window.Image();
    portrait.src = BRIEF_INTEREST_WOMAN_SRC;

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
          className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-border bg-background shadow-2xl outline-none"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            ctaRef.current?.focus();
          }}
        >
          <Dialog.Close
            aria-label="Close Brief Interest popup"
            className="absolute top-3 right-3 z-50 inline-flex size-11 items-center justify-center border border-border bg-background/95 text-foreground shadow-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </Dialog.Close>

          <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <section
              data-brief-interest-popup-visual="true"
              className="relative h-52 overflow-hidden bg-primary text-white sm:h-60 md:h-auto md:min-h-[31rem]"
              aria-hidden="true"
            >
              <p className="absolute top-5 left-5 z-30 text-[10px] font-bold tracking-[0.12em] uppercase sm:left-6 sm:text-xs">
                ATF AI Challenge
              </p>
              <BriefInterestCampaignArrow className="absolute inset-0 z-10 h-full w-full text-white/25" />
              <Image
                src={BRIEF_INTEREST_WOMAN_SRC}
                alt=""
                width={1024}
                height={1792}
                unoptimized
                className="absolute top-5 right-[-1.5rem] z-20 h-[24rem] w-auto max-w-none object-contain sm:right-4 sm:h-[28rem] md:top-16 md:right-1/2 md:h-[35rem] md:translate-x-1/2"
              />
              <div className="absolute inset-x-0 bottom-0 z-30 h-16 bg-linear-to-t from-primary to-transparent" />
            </section>

            <div className="px-6 py-7 sm:px-8 sm:py-9 md:flex md:flex-col md:justify-center md:px-10">
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
                  Take an early role in shaping the future of work and innovation
                  in your sector.
                </span>
                <span className="block">
                  Submit your interest and our team will guide you through the
                  next step of the ATF AI Challenge.
                </span>
              </Dialog.Description>

              <Link
                ref={ctaRef}
                href="/brief"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-6 w-full sm:w-auto sm:self-start",
                )}
              >
                Go to Interest Form
              </Link>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Be among the first organizations to participate. Limited early
                access.
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
