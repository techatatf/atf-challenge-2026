"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { useApplyHref } from "@/lib/use-apply-href";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { FadeIn } from "@/components/ui/motion";

const phases = [
  {
    number: 1,
    title: "The AI School",
    subtitle: "Learn",
    date: "June - July 2026",
    description:
      "Master the Basics. Join a 4-week intensive virtual bootcamp designed for all skill levels. You will learn AI ethics, Python fundamentals, and Prompt Engineering from world-class experts.",
    benefits: [
      "Earn an Industry-Recognized Certificate",
      "Access to Premium Learning Content",
    ],
  },
  {
    number: 2,
    title: "The AI Challenge",
    subtitle: "Build",
    date: "August 2026 - April 2027",
    description:
      "Build Real Solutions. Form a team and apply your skills to solve real challenges in Health, Agriculture, or Finance. The top 1,000 teams get matched with expert mentors and receive compute credits to build a functional Prototype (MVP).",
    benefits: [
      "1-on-1 Mentorship from Global Tech Leaders",
      "Free Cloud/Compute Credits",
    ],
  },
  {
    number: 3,
    title: "Demo Day",
    subtitle: "Launch",
    date: "May 2027",
    description:
      "Showcase to the World. The best teams will pitch live at Regional Demo Days in Accra, Lagos, Nairobi, and Johannesburg. Present your solution to top investors, corporate partners, and employers looking for talent.",
    benefits: [
      "Win Cash Prizes & Funding Opportunities",
      "Fast-Track Access to Jobs & Internships",
    ],
  },
];

export function Journey() {
  const applyHref = useApplyHref();
  return (
    <section
      id="journey"
      className="py-16 px-4 md:py-24 md:px-8 lg:px-16 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 md:mb-16">
            Your journey from student to founder
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {phases.map((phase, index) => (
              <FadeIn
                key={phase.number}
                delay={index * 0.15}
                className={`relative md:flex md:items-start md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Phase indicator */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-primary-foreground rounded-full items-center justify-center font-bold text-lg z-10">
                  {phase.number}
                </div>

                {/* Content card */}
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                  }`}
                >
                  <div className="bg-card border border-border p-6 md:p-8">
                    {/* Mobile phase number */}
                    <div className="flex items-center gap-3 mb-4 md:hidden">
                      <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {phase.number}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        Phase {phase.number}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-bold">
                        {phase.title}
                      </h3>
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1">
                        {phase.subtitle}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-muted-foreground mb-4">
                      {phase.date}
                    </p>

                    <p className="text-muted-foreground mb-6">
                      {phase.description}
                    </p>

                    <ul className="space-y-2">
                      {phase.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2 text-sm"
                        >
                          <HugeiconsIcon
                            icon={Tick02Icon}
                            className="size-5 text-primary mt-0.5 shrink-0"
                            strokeWidth={2}
                          />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn delay={0.5} className="text-center mt-12 md:mt-16">
          <Button asChild size="lg" className="text-base px-8 py-6">
            <a href={applyHref}>Start Your Journey Today</a>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
