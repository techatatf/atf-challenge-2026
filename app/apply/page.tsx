import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apply | ATF AI Challenge",
  description:
    "Apply for the ATF AI Challenge — Africa's largest hands-on AI program. Registration closes May 31.",
};

const FORM_BASE_URL =
  "https://gadainfo.anasatech.com/f/atf-ai-school-registration-bjdt4n";

function buildFormUrl(channel: string | string[] | undefined): string {
  if (!channel) return FORM_BASE_URL;
  const value = Array.isArray(channel) ? channel[0] : channel;
  const params = new URLSearchParams({ channel: value });
  return `${FORM_BASE_URL}?${params.toString()}`;
}

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ channel?: string | string[] }>;
}) {
  const params = await searchParams;
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
              Apply for the AI Challenge
            </h1>
            <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto">
              Complete the form below to register for Africa&apos;s largest
              hands-on AI program. Registration closes{" "}
              <span className="text-primary font-semibold">May 31, 2026</span>
              .
            </p>
          </div>
        </section>

        {/* Form Container */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            {/* Embed Container — replace the iframe src with the 3rd party form URL,
                or replace the entire iframe with a script-injected form <div> */}
            <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
              <iframe
                src={buildFormUrl(params.channel)}
                className="w-full border-0"
                height="1500"
                title="ATF AI School Registration Form"
                loading="lazy"
              />
            </div>

            {/* Helper text */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Having trouble with the form?{" "}
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
