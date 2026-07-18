const MAILCHIMP_BRIEF_INTEREST_ENDPOINT =
  "https://africantechnologyforum.us20.list-manage.com/subscribe/post-json";

const MAILCHIMP_BRIEF_INTEREST_ACCOUNT_ID = "42625c20297b34e120b6e10e5";
const MAILCHIMP_BRIEF_INTEREST_AUDIENCE_ID = "4110193ca4";
const MAILCHIMP_BRIEF_INTEREST_FORM_ID = "00ee9eeef0";

let callbackSequence = 0;

export type BriefInterestSubmissionResult =
  | { status: "accepted" }
  | {
      status: "rejected";
      reason: "existing-contact" | "network" | "provider" | "timeout";
    };

export function submitBriefInterest(
  fields: FormData,
  { timeoutMs = 10_000 }: { timeoutMs?: number } = {},
): Promise<BriefInterestSubmissionResult> {
  callbackSequence += 1;
  const callbackName = `__atfBriefInterest${Date.now()}_${callbackSequence}`;
  const parameters = new URLSearchParams({
    u: MAILCHIMP_BRIEF_INTEREST_ACCOUNT_ID,
    id: MAILCHIMP_BRIEF_INTEREST_AUDIENCE_ID,
    f_id: MAILCHIMP_BRIEF_INTEREST_FORM_ID,
    c: callbackName,
  });

  fields.forEach((value, key) => {
    if (typeof value === "string") parameters.set(key, value);
  });
  parameters.set("subscribe", "Subscribe");

  const script = document.createElement("script");
  script.src = `${MAILCHIMP_BRIEF_INTEREST_ENDPOINT}?${parameters.toString()}`;

  return new Promise((resolve) => {
    const callbacks = window as typeof window &
      Record<string, (response: unknown) => void>;
    const timeout = window.setTimeout(() => {
      cleanup();
      resolve({ status: "rejected", reason: "timeout" });
    }, timeoutMs);

    function cleanup() {
      window.clearTimeout(timeout);
      script.remove();
      delete callbacks[callbackName];
    }

    callbacks[callbackName] = (response) => {
      cleanup();
      if (
        typeof response === "object" &&
        response !== null &&
        "result" in response &&
        response.result === "success"
      ) {
        resolve({ status: "accepted" });
        return;
      }

      if (
        typeof response === "object" &&
        response !== null &&
        "msg" in response &&
        typeof response.msg === "string" &&
        response.msg.toLowerCase().includes("already subscribed")
      ) {
        resolve({ status: "rejected", reason: "existing-contact" });
        return;
      }

      resolve({ status: "rejected", reason: "provider" });
    };

    script.addEventListener("error", () => {
      cleanup();
      resolve({ status: "rejected", reason: "network" });
    });

    document.head.append(script);
  });
}
