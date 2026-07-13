import { describe, expect, it } from "vitest";

import {
  consumeRecentBriefInterestCompletion,
  recordBriefInterestCompletion,
} from "./brief-interest-completion";

class MemoryStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  removeItem(key: string) {
    this.values.delete(key);
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

describe("Brief Interest completion gate", () => {
  it("accepts a recent completion exactly once", () => {
    const storage = new MemoryStorage();
    const submittedAt = Date.UTC(2026, 6, 11, 12, 0, 0);

    recordBriefInterestCompletion(storage, submittedAt);

    expect(consumeRecentBriefInterestCompletion(storage, submittedAt + 1_000)).toBe(
      true,
    );
    expect(consumeRecentBriefInterestCompletion(storage, submittedAt + 2_000)).toBe(
      false,
    );
  });

  it("rejects expired and future-dated completions", () => {
    const storage = new MemoryStorage();
    const now = Date.UTC(2026, 6, 11, 12, 0, 0);

    recordBriefInterestCompletion(storage, now - 10 * 60 * 1_000 - 1);
    expect(consumeRecentBriefInterestCompletion(storage, now)).toBe(false);

    recordBriefInterestCompletion(storage, now + 1);
    expect(consumeRecentBriefInterestCompletion(storage, now)).toBe(false);
  });

  it("fails closed when browser storage is unavailable", () => {
    const unavailableStorage = {
      getItem() {
        throw new Error("storage unavailable");
      },
      removeItem() {
        throw new Error("storage unavailable");
      },
      setItem() {
        throw new Error("storage unavailable");
      },
    };

    expect(recordBriefInterestCompletion(unavailableStorage)).toBe(false);
    expect(consumeRecentBriefInterestCompletion(unavailableStorage)).toBe(false);
  });
});
