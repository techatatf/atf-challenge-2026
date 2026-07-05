import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import Link from "next/link";

const SUBSCRIBE_FORM_SRC = "/forms/mailchimp-subscribe-2026.html";
const SUBSCRIBE_FORM_HEIGHT = 520;

export const metadata: Metadata = {
  title: "Subscribe | ATF AI Challenge",
  description:
    "Subscribe for ATF AI Challenge updates and get notified when applications open for the next cohort.",
};

export default function SubscribePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Spacer for fixed header */}
        <div className="h-16 md:h-20" />

        {/* Page Header */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-foreground text-background">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-primary transition-colors mb-8"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Subscribe for Updates
            </h1>
            <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto">
              Get notified when applications open for the next ATF AI Challenge
              cohort.
            </p>
          </div>
        </section>

        {/* Form Container */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
              <iframe
                src={SUBSCRIBE_FORM_SRC}
                className="w-full border-0"
                height={SUBSCRIBE_FORM_HEIGHT}
                title="ATF AI Challenge Updates Subscription Form"
                loading="lazy"
              />
            </div>

            {/* Helper text */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Having trouble subscribing?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
