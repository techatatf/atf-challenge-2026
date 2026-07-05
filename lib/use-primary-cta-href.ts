"use client";

import { useSearchParams } from "next/navigation";
import { buildPrimaryCtaHref } from "@/lib/application-status";

export function usePrimaryCtaHref(): string {
  const searchParams = useSearchParams();
  return buildPrimaryCtaHref(searchParams.get("channel"));
}
