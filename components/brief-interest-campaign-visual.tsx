import Image from "next/image";

import { BriefInterestCampaignArrow } from "@/components/brief-interest-campaign-arrow";

export const BRIEF_INTEREST_WOMAN_OPTIONS = {
  original: "/brief-interest/brief-interest-woman-original.png",
  referenceAligned:
    "/brief-interest/brief-interest-woman-reference-aligned.png",
} as const;

// Change this one selection to swap the campaign portrait everywhere.
export const BRIEF_INTEREST_WOMAN_SRC =
  BRIEF_INTEREST_WOMAN_OPTIONS.original;

export function BriefInterestCampaignVisual() {
  return (
    <section className="relative h-72 overflow-hidden bg-primary text-primary-foreground lg:h-auto lg:min-h-[1020px]">
      <div className="absolute inset-x-0 top-0 z-30 flex justify-end px-5 pt-4 sm:px-7 sm:pt-5 lg:px-10 lg:pt-8">
        <p className="text-[10px] font-bold tracking-[0.12em] text-white uppercase lg:text-xs">
          ATF AI Challenge
        </p>
      </div>

      <BriefInterestCampaignArrow className="absolute inset-0 z-10 h-full w-full text-white/25" />

      <Image
        src={BRIEF_INTEREST_WOMAN_SRC}
        alt="ATF Brief Interest representative"
        width={1024}
        height={1792}
        priority
        className="absolute top-7 right-[-2.75rem] z-20 h-[25rem] w-auto max-w-none object-contain sm:right-2 lg:top-28 lg:right-1/2 lg:h-[46rem] lg:translate-x-1/2"
      />

      <div className="absolute inset-x-0 bottom-0 z-30 bg-linear-to-t from-primary via-primary/95 to-transparent px-5 pt-14 pb-5 sm:px-7 lg:px-10 lg:pt-24 lg:pb-12">
        <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-white/80 uppercase lg:text-xs">
          Brief Interest
        </p>
        <h1 className="max-w-[18rem] text-xl leading-tight font-extrabold tracking-tight text-white uppercase sm:text-2xl lg:max-w-md lg:text-4xl">
          Take an early role in shaping what comes next in your sector.
        </h1>
        <p className="mt-3 hidden max-w-md text-sm leading-6 text-white/80 lg:block">
          Share your organization&apos;s interest in contributing sector-specific
          input. Our team will guide you through the next step.
        </p>
      </div>
    </section>
  );
}
