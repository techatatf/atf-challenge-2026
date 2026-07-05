export const APPLICATIONS_OPEN = false;

type PrimaryCtaConfig = {
  href: "/apply" | "/subscribe";
  labels: {
    header: string;
    mobileHeader: string;
    hero: string;
    journey: string;
    footer: string;
  };
  footer: {
    heading: string;
    body: string;
  };
};

const openApplicationsCta: PrimaryCtaConfig = {
  href: "/apply",
  labels: {
    header: "Apply",
    mobileHeader: "Apply Now",
    hero: "Apply for the AI School",
    journey: "Start Your Journey Today",
    footer: "Apply Now - Registration Closes June 15",
  },
  footer: {
    heading: "Ready to Build the Future?",
    body: "The next unicorn startup could be yours. The next breakthrough in African healthcare could be your code. It starts here.",
  },
};

const closedApplicationsCta: PrimaryCtaConfig = {
  href: "/subscribe",
  labels: {
    header: "Get Updates",
    mobileHeader: "Get Updates",
    hero: "Get Notified for the Next Cohort",
    journey: "Get Updates for the Next Cohort",
    footer: "Subscribe for Next Cohort Updates",
  },
  footer: {
    heading: "Get Ready for the Next Cohort",
    body: "Applications for this cohort have closed. Join the updates list and be first to know when the next cohort opens.",
  },
};

export const primaryCta = APPLICATIONS_OPEN
  ? openApplicationsCta
  : closedApplicationsCta;

export function buildPrimaryCtaHref(
  channel: string | null | undefined,
  href: PrimaryCtaConfig["href"] = primaryCta.href,
): string {
  if (href !== "/apply" || !channel) return href;
  return `/apply?${new URLSearchParams({ channel }).toString()}`;
}
