"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const milestones = [
  { date: "March 9", milestone: "Applications Open", active: true },
  { date: "May 31", milestone: "Applications Close", active: false },
  { date: "June 15", milestone: "AI School Begins", active: false },
  { date: "Aug 2026", milestone: "Challenge Phase Kick-off", active: false },
  { date: "May 2027", milestone: "Demo Day Finals", active: false },
];

export function KeyDates() {
  return (
    <section
      id="dates"
      className="py-16 px-4 md:py-24 md:px-8 lg:px-16 bg-muted"
    >
      <div className="max-w-4xl mx-auto">
        {/* Headline */}
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16">
            Timeline &amp; Key Dates
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line for desktop */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-border" />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {milestones.map((item, index) => (
              <StaggerItem
                key={index}
                className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-3"
              >
                {/* Dot indicator */}
                <div
                  className={`w-4 h-4 rounded-full shrink-0 z-10 ${
                    item.active
                      ? "bg-primary ring-4 ring-primary/20"
                      : "bg-border"
                  }`}
                />

                {/* Vertical line for mobile */}
                {index < milestones.length - 1 && (
                  <div className="md:hidden absolute left-[7px] top-4 bottom-0 w-0.5 bg-border -z-10 h-full" />
                )}

                {/* Content */}
                <div className="md:text-center">
                  <p
                    className={`font-bold text-lg ${
                      item.active ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.date}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.milestone}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
