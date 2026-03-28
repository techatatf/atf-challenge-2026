import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

const faqCategories = [
  {
    title: "General",
    items: [
      {
        question: "What is the ATF AI Challenge?",
        answer:
          "The ATF AI Challenge is a Pan-African hands-on Artificial Intelligence program designed to help students and recent graduates build practical AI skills and solve real local problems.",
      },
      {
        question: "Who runs this program?",
        answer:
          "The program is organized by the African Technology Forum (ATF), supported by Google.org, with mentors and ecosystem partners across Ghana, Nigeria, Kenya, and South Africa.",
      },
      {
        question: "How much does it cost to join?",
        answer:
          "Participation is fully funded for accepted participants. It costs you nothing except your commitment, consistency, and time.",
      },
    ],
  },
  {
    title: "Eligibility & Application",
    items: [
      {
        question: "Who can apply?",
        answer:
          "You can apply if you are a university student or a recent graduate (0-3 years out of school) based in Ghana, Nigeria, Kenya, or South Africa.",
      },
      {
        question: "Do I need prior AI experience?",
        answer:
          "No. Beginner-friendly tracks are available. You do not need prior AI coding experience to get started.",
      },
      {
        question: "When does registration close?",
        answer:
          "Registration for this cohort closes on May 31, 2026. We encourage early applications to avoid last-minute issues.",
      },
    ],
  },
  {
    title: "Program Details",
    items: [
      {
        question: "How much time should I commit weekly?",
        answer:
          "Plan for 5-10 hours per week during the AI School period so you can stay on track and complete all required activities.",
      },
      {
        question: "What are the main phases of the program?",
        answer:
          "The journey includes AI School (Learn), AI Challenge (Build), and Demo Day (Launch), where top teams present solutions to partners and investors.",
      },
      {
        question: "Will I receive a certificate?",
        answer:
          "Participants who successfully complete the AI School requirements will receive an industry-recognized certificate.",
      },
      {
        question: "Is mentorship included?",
        answer:
          "Yes. Top teams in the Challenge phase are matched with experienced mentors to help strengthen their MVPs and pitch readiness.",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "FAQs | ATF AI Challenge",
  description:
    "Frequently asked questions about eligibility, timelines, cost, and program structure for the ATF AI Challenge.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="h-16 md:h-20" />

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
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto">
              Everything you need to know before you apply for the ATF AI
              Challenge.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto space-y-10">
            {faqCategories.map((category) => (
              <div key={category.title}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <details
                      key={item.question}
                      className="group border border-border bg-card p-5 md:p-6"
                    >
                      <summary className="list-none cursor-pointer flex items-start justify-between gap-4">
                        <span className="text-base md:text-lg font-semibold text-foreground">
                          {item.question}
                        </span>
                        <span className="text-primary text-lg leading-none transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="text-muted-foreground mt-4 pr-6">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
