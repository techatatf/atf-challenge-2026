import type { Metadata } from "next";
import Link from "next/link";

import { BriefInterestCampaignVisual } from "@/components/brief-interest-campaign-visual";
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
      <main className="min-h-screen bg-muted/40">
        <div className="h-14 md:h-20" />
        <section className="mx-auto max-w-[1440px] md:px-8 md:py-10 lg:px-12 lg:py-14">
          <div className="grid overflow-hidden border-y border-border bg-card shadow-xl md:border-x lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
            <BriefInterestCampaignVisual />

            <div className="min-w-0 bg-card px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <Link
                href="/"
                className="mb-5 inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                ← Back to Home
              </Link>
              <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                For organizations
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Tell us about your interest
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Complete the form and the ATF team will guide your organization
                through the next step.
              </p>

              <div className="mt-4 overflow-hidden bg-card sm:mt-6">
                <BriefInterestForm />
              </div>
              <p className="mt-5 text-center text-sm text-muted-foreground">
                Having trouble with the form?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
