import type { Metadata } from "next";

import { BriefInterestCompletionGate } from "@/components/brief-interest-completion-gate";

export const metadata: Metadata = {
  title: "Brief Interest Submitted | ATF AI Challenge",
  description:
    "Confirmation that an ATF AI Challenge Brief Interest form was completed.",
};

export default function BriefSubmittedPage() {
  return <BriefInterestCompletionGate />;
}
