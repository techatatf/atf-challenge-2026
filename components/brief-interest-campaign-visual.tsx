import Image from "next/image";

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
      <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-5 pt-4 sm:px-7 sm:pt-5 lg:px-10 lg:pt-8">
        <Image
          src="/atf-assets/atf-logo-vector--all-white.svg"
          alt="African Technology Forum"
          width={150}
          height={100}
          className="h-auto w-24 sm:w-28 lg:w-36"
        />
        <p className="pt-4 text-[10px] font-bold tracking-[0.12em] text-white uppercase lg:text-xs">
          ATF AI Challenge
        </p>
      </div>

      <svg
        data-campaign-arrow="true"
        aria-hidden="true"
        viewBox="0 0 320 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 z-10 h-full w-full text-white/25"
      >
        <path
          d="M 24 100 H 274 L 78 296 H 274"
          fill="none"
          stroke="currentColor"
          strokeWidth="54"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

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
