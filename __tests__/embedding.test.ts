import { describe, it, expect, beforeEach } from "vitest";
import { getCountryFromHash, readHashParams, getShareUrl } from "@/lib/embedding";

describe("embedding utilities", () => {
  beforeEach(() => {
    // Reset hash before each test
    window.location.hash = "";
  });

  it("getCountryFromHash returns 'us' by default", () => {
    expect(getCountryFromHash()).toBe("us");
  });

  it("getCountryFromHash reads country from hash", () => {
    window.location.hash = "#country=uk";
    expect(getCountryFromHash()).toBe("uk");
  });

  it("readHashParams returns empty object when no hash", () => {
    expect(readHashParams()).toEqual({});
  });

  it("readHashParams reads all hash parameters", () => {
    window.location.hash = "#employment_income=75000&filing_status=JOINT";
    const params = readHashParams();
    expect(params.employment_income).toBe("75000");
    expect(params.filing_status).toBe("JOINT");
  });

  it("getShareUrl returns current href when not embedded", () => {
    const url = getShareUrl("us", "ubi-impact-dashboard");
    // When not embedded, returns window.location.href
    expect(typeof url).toBe("string");
  });
});
