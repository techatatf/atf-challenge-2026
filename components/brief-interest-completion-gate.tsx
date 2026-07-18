"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BriefInterestComposition } from "@/components/brief-interest-composition";
import { consumeRecentBriefInterestCompletion } from "@/lib/brief-interest-completion";

export function BriefInterestCompletionGate() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const verificationRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (verificationRef.current === null) {
      verificationRef.current = consumeRecentBriefInterestCompletion(
        window.sessionStorage,
      );
    }

    if (!verificationRef.current) {
      router.replace("/brief");
      return;
    }

    const verificationUpdate = window.setTimeout(() => setIsVerified(true), 0);
    return () => window.clearTimeout(verificationUpdate);
  }, [router]);

  if (!isVerified) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground" role="status">
          Verifying your submission…
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background py-0 sm:px-4 sm:py-12 lg:px-8">
      <section className="grid w-full max-w-[1200px] overflow-hidden border-y border-border bg-card shadow-xl sm:border-x lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)]">
        <BriefInterestComposition className="h-64 sm:h-80 lg:h-auto lg:min-h-[640px]" />

        <div className="flex min-w-0 flex-col items-center justify-center px-6 py-12 text-center sm:px-10 lg:px-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Brief Interest submitted
          </p>
          <h1 className="mb-5 text-3xl font-bold tracking-tight md:text-5xl">
            Thank you for your interest
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            Your form was sent to Mailchimp. The ATF team will review the
            details and guide you through the next step.
          </p>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return to home
          </Link>
        </div>
      </section>
    </main>
  );
}
