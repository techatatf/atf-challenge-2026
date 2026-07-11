import type { Metadata } from "next";
import Link from "next/link";

import { BriefInterestForm } from "@/components/brief-interest-form";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";

export const metadata: Metadata = {
  title: "Brief Interest | ATF AI Challenge",
  description:
    "Tell ATF that your organization is interested in contributing sector-specific input to the ATF AI Challenge.",
};

export default function BriefPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="h-14 md:h-20" />
        <section className="bg-foreground px-4 py-12 text-background md:px-8 md:py-16 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/"
              className="mb-7 inline-flex text-sm text-background/70 transition-colors hover:text-primary"
            >
              ← Back to Home
            </Link>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              For organizations
            </p>
            <h1 className="mb-5 text-3xl font-bold tracking-tight md:text-5xl">
              Shape what comes next in your sector
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-7 text-background/75 md:text-lg">
              Share your organization&apos;s interest in contributing
              sector-specific input. Our team will guide you through the next
              step.
            </p>
          </div>
        </section>
        <section className="px-4 py-12 md:px-8 md:py-16 lg:px-16">
          <div className="mx-auto max-w-3xl overflow-hidden border border-border bg-card shadow-sm">
            <BriefInterestForm />
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted-foreground">
            Having trouble with the form?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
