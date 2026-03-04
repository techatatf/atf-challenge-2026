"use client";

import { useSearchParams } from "next/navigation";

/**
 * Returns the apply page URL with the channel query param preserved from the current page.
 * e.g. /apply?channel=AAAABHHBKA when visiting /?channel=AAAABHHBKA
 */
export function useApplyHref(): string {
  const searchParams = useSearchParams();
  const channel = searchParams.get("channel");
  if (!channel) return "/apply";
  return `/apply?${new URLSearchParams({ channel }).toString()}`;
}
