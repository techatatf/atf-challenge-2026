"use client";

import { useEffect, useRef, useState } from "react";

import {
  isBriefInterestResponse,
  recordBriefInterestCompletion,
} from "@/lib/brief-interest-completion";

const BRIEF_FORM_SRC = "/forms/mailchimp-brief-interest.html";

export function BriefInterestForm() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [completionError, setCompletionError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        !isBriefInterestResponse(
          event,
          iframeRef.current?.contentWindow ?? null,
          window.location.origin,
        )
      ) {
        return;
      }

      if (!recordBriefInterestCompletion(window.sessionStorage)) {
        setCompletionError(true);
        return;
      }

      window.location.assign("/brief-submitted");
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="relative">
      {isLoading && (
        <div
          className="absolute inset-x-0 top-0 flex h-24 items-center justify-center bg-card text-sm text-muted-foreground"
          role="status"
        >
          Loading Brief Interest form…
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={BRIEF_FORM_SRC}
        className="h-[980px] w-full border-0 sm:h-[900px]"
        title="ATF Brief Interest form"
        onLoad={() => setIsLoading(false)}
      />
      {completionError && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          We could not open the confirmation page in this browser. Please
          contact support if you need help.
        </p>
      )}
    </div>
  );
}
