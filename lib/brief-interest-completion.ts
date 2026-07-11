const BRIEF_INTEREST_COMPLETION_KEY = "atf:brief-interest-completed-at";
const BRIEF_INTEREST_COMPLETION_MAX_AGE_MS = 10 * 60 * 1_000;

type BrowserStorage = Pick<Storage, "getItem" | "removeItem" | "setItem">;

type CompletionMessage = {
  data: unknown;
  origin: string;
  source: unknown;
};

export function isBriefInterestResponse(
  event: CompletionMessage,
  expectedSource: unknown,
  expectedOrigin: string,
): boolean {
  return (
    event.origin === expectedOrigin &&
    event.source === expectedSource &&
    typeof event.data === "object" &&
    event.data !== null &&
    (event.data as { type?: unknown }).type === "brief-interest-response"
  );
}

export function recordBriefInterestCompletion(
  storage: BrowserStorage,
  submittedAt = Date.now(),
): boolean {
  try {
    storage.setItem(BRIEF_INTEREST_COMPLETION_KEY, String(submittedAt));
    return true;
  } catch {
    return false;
  }
}

export function consumeRecentBriefInterestCompletion(
  storage: BrowserStorage,
  now = Date.now(),
): boolean {
  try {
    const storedValue = storage.getItem(BRIEF_INTEREST_COMPLETION_KEY);
    storage.removeItem(BRIEF_INTEREST_COMPLETION_KEY);

    if (storedValue === null) return false;

    const submittedAt = Number(storedValue);
    return (
      Number.isFinite(submittedAt) &&
      submittedAt <= now &&
      now - submittedAt <= BRIEF_INTEREST_COMPLETION_MAX_AGE_MS
    );
  } catch {
    return false;
  }
}
