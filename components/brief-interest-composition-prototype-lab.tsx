"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  BRIEF_COMPOSITION_VARIANTS,
  BriefInterestCompositionPrototype,
  type BriefCompositionSurface,
  type BriefCompositionVariant,
  type BriefCompositionViewport,
} from "@/components/brief-interest-composition-prototype";
import { cn } from "@/lib/utils";

const VARIANTS = Object.keys(
  BRIEF_COMPOSITION_VARIANTS,
) as BriefCompositionVariant[];

const SURFACES: Array<{
  key: BriefCompositionSurface;
  title: string;
  note: string;
}> = [
  {
    key: "popup",
    title: "Brief popup",
    note: "No composition copy; campaign message remains in the adjacent panel.",
  },
  {
    key: "form",
    title: "Brief form",
    note: "Uses the optional copy slot in the red safe area.",
  },
  {
    key: "confirmation",
    title: "Brief confirmation",
    note: "No composition copy; the confirmation message remains separate.",
  },
];

function isVariant(value: string | null): value is BriefCompositionVariant {
  return value !== null && VARIANTS.includes(value as BriefCompositionVariant);
}

function CompositionCopy({
  variant,
}: {
  variant: BriefCompositionVariant;
}) {
  if (variant === "G") {
    return (
      <div className="border-l-2 border-white pl-3">
        <p className="text-[7px] font-bold tracking-[0.3em] text-white/70 uppercase sm:text-[9px]">
          Signal 01 / Brief Interest
        </p>
        <p className="mt-2 max-w-xs text-[12px] leading-[1.05] font-black tracking-tight uppercase sm:text-xl">
          Shape what comes next.
        </p>
      </div>
    );
  }

  if (variant === "D" || variant === "E" || variant === "F") {
    return (
      <>
        <p className="text-[11px] leading-[1.16] font-extrabold tracking-[0.02em] uppercase sm:text-lg">
          Take an early role in shaping what comes next in your sector.
        </p>
        <p className="mt-2 max-w-sm text-[7px] leading-[1.45] text-white/75 sm:text-[10px]">
          Submit your interest and our team will guide you through the process.
        </p>
      </>
    );
  }

  return (
    <>
      <p className="text-[8px] font-bold tracking-[0.18em] text-white/75 uppercase sm:text-[10px]">
        Brief Interest
      </p>
      <p className="mt-1 text-[11px] leading-[1.08] font-extrabold tracking-tight uppercase sm:mt-2 sm:text-base">
        Shape what comes next in your sector.
      </p>
    </>
  );
}

function MockContent({
  surface,
  viewport,
}: {
  surface: BriefCompositionSurface;
  viewport: BriefCompositionViewport;
}) {
  const compact = viewport === "mobile";

  if (surface === "popup") {
    return (
      <div
        className={cn(
          "flex flex-col justify-center bg-white text-stone-950",
          compact ? "min-h-64 px-5 py-7" : "px-10 py-12",
        )}
      >
        <p className="text-[9px] font-extrabold tracking-[0.08em] uppercase">
          <span className="text-primary">ATF</span> AI Challenge
        </p>
        <h3
          className={cn(
            "mt-5 leading-[1.03] font-extrabold tracking-tight",
            compact ? "text-2xl" : "text-4xl",
          )}
        >
          Shape What Comes Next
          <span className="block text-primary">in Your Sector</span>
        </h3>
        <p
          className={cn(
            "mt-4 max-w-md leading-6 text-stone-600",
            compact ? "text-xs" : "text-sm",
          )}
        >
          Submit your interest and our team will guide you through the next
          step.
        </p>
        <div className="mt-6 flex h-11 items-center justify-between rounded-md bg-primary px-4 text-xs font-bold text-white">
          Go to Interest Form
          <span>↗</span>
        </div>
      </div>
    );
  }

  if (surface === "form") {
    return (
      <div
        className={cn(
          "bg-white text-stone-950",
          compact ? "px-5 py-7" : "px-10 py-10",
        )}
      >
        <p className="text-[9px] font-bold tracking-[0.16em] text-primary uppercase">
          For organizations
        </p>
        <h3
          className={cn(
            "mt-2 font-bold tracking-tight",
            compact ? "text-xl" : "text-3xl",
          )}
        >
          Tell us about your interest
        </h3>
        <p className="mt-2 text-xs leading-5 text-stone-500">
          Complete the form and the ATF team will guide your organization
          through the next step.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {["First name", "Last name", "Organization", "Job title"].map(
            (label) => (
              <div key={label}>
                <p className="mb-1 text-[9px] font-semibold text-stone-500">
                  {label}
                </p>
                <div className="h-9 border border-stone-200 bg-stone-50" />
              </div>
            ),
          )}
        </div>
        <div className="mt-3">
          <p className="mb-1 text-[9px] font-semibold text-stone-500">
            Sector
          </p>
          <div className="h-9 border border-stone-200 bg-stone-50" />
        </div>
        <div className="mt-5 h-11 bg-primary" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col justify-center bg-white text-stone-950",
        compact ? "min-h-64 px-6 py-8" : "px-12 py-14",
      )}
    >
      <p className="text-[9px] font-bold tracking-[0.18em] text-primary uppercase">
        Brief Interest submitted
      </p>
      <h3
        className={cn(
          "mt-3 font-extrabold tracking-tight",
          compact ? "text-2xl" : "text-4xl",
        )}
      >
        Thank you for your interest
      </h3>
      <p className="mt-4 max-w-lg text-xs leading-6 text-stone-500">
        The ATF team will review the details and guide you through the next
        step.
      </p>
      <div className="mt-6 h-11 w-40 bg-primary" />
    </div>
  );
}

function SurfaceMockup({
  variant,
  surface,
  viewport,
}: {
  variant: BriefCompositionVariant;
  surface: BriefCompositionSurface;
  viewport: BriefCompositionViewport;
}) {
  const isMobile = viewport === "mobile";
  const copy: ReactNode =
    surface === "form" ? <CompositionCopy variant={variant} /> : undefined;

  if (isMobile) {
    return (
      <div className="w-[20rem] overflow-hidden border border-stone-300 bg-white shadow-xl">
        <BriefInterestCompositionPrototype
          variant={variant}
          surface={surface}
          viewport="mobile"
          copy={copy}
          className={cn(
            surface === "popup" && "h-44",
            surface === "form" && "h-64",
            surface === "confirmation" && "h-60",
          )}
        />
        <MockContent surface={surface} viewport="mobile" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid min-w-[48rem] overflow-hidden border border-stone-300 bg-white shadow-xl",
        surface === "popup" && "grid-cols-[5fr_6fr]",
        surface === "form" && "grid-cols-[44fr_56fr]",
        surface === "confirmation" && "grid-cols-[48fr_52fr]",
      )}
    >
      <BriefInterestCompositionPrototype
        variant={variant}
        surface={surface}
        viewport="desktop"
        copy={copy}
        className={cn(
          surface === "popup" && "h-[34rem]",
          surface === "form" && "h-[42rem]",
          surface === "confirmation" && "h-[30rem]",
        )}
      />
      <MockContent surface={surface} viewport="desktop" />
    </div>
  );
}

function VariantSwitcher({
  current,
  onStep,
}: {
  current: BriefCompositionVariant;
  onStep: (direction: -1 | 1) => void;
}) {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-stone-950 px-2 py-2 text-white shadow-2xl">
      <button
        type="button"
        aria-label="Previous composition variant"
        onClick={() => onStep(-1)}
        className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
      </button>
      <p className="min-w-48 text-center text-xs font-semibold">
        {current} — {BRIEF_COMPOSITION_VARIANTS[current]}
      </p>
      <button
        type="button"
        aria-label="Next composition variant"
        onClick={() => onStep(1)}
        className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
      </button>
    </div>
  );
}

export function BriefInterestCompositionPrototypeLab() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedVariant = searchParams.get("variant");
  const variant: BriefCompositionVariant = isVariant(requestedVariant)
    ? requestedVariant
    : "A";

  function stepVariant(direction: -1 | 1) {
    const currentIndex = VARIANTS.indexOf(variant);
    const nextIndex =
      (currentIndex + direction + VARIANTS.length) % VARIANTS.length;
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", VARIANTS[nextIndex]);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.matches("input, textarea, [contenteditable='true']") ||
          target.closest("input, textarea, [contenteditable='true']"))
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        stepVariant(-1);
      }

      if (event.key === "ArrowRight") {
        stepVariant(1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10 text-stone-950 sm:px-8 lg:px-12">
      <header className="mx-auto max-w-[90rem]">
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
          Throwaway prototype
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl">
          Seven reusable Brief Interest compositions, switchable with{" "}
          <code className="text-primary">?variant=</code>
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-stone-600">
          Fixed stack: office → woman → solid red foreground with a transparent
          top-right arrow aperture → optional copy. The previews deliberately
          show the same variant in all three host surfaces.
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-[90rem] space-y-16 pb-24">
        {SURFACES.map((surface) => (
          <section key={surface.key}>
            <div className="mb-5">
              <h2 className="text-xl font-bold">{surface.title}</h2>
              <p className="mt-1 text-sm text-stone-500">{surface.note}</p>
            </div>

            <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
              <div>
                <p className="mb-3 text-[10px] font-bold tracking-[0.16em] text-stone-500 uppercase">
                  Desktop
                </p>
                <div className="overflow-x-auto pb-5">
                  <SurfaceMockup
                    variant={variant}
                    surface={surface.key}
                    viewport="desktop"
                  />
                </div>
              </div>

              <div>
                <p className="mb-3 text-[10px] font-bold tracking-[0.16em] text-stone-500 uppercase">
                  Mobile
                </p>
                <SurfaceMockup
                  variant={variant}
                  surface={surface.key}
                  viewport="mobile"
                />
              </div>
            </div>
          </section>
        ))}
      </div>

      <VariantSwitcher current={variant} onStep={stepVariant} />
    </main>
  );
}
