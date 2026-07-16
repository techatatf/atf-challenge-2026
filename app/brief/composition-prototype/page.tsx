import { Suspense } from "react";
// import { notFound } from "next/navigation";

import { BriefInterestCompositionPrototypeLab } from "@/components/brief-interest-composition-prototype-lab";

/**
 * PROTOTYPE — seven Brief Interest composition variants, switchable via
 * ?variant=A|B|C|D|E|F|G on /brief/composition-prototype.
 */
export default function BriefCompositionPrototypePage() {
  // if (process.env.NODE_ENV === "production") {
  //   notFound();
  // }

  return (
    <Suspense>
      <BriefInterestCompositionPrototypeLab />
    </Suspense>
  );
}
