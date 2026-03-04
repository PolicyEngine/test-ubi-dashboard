/**
 * Embedding utilities for PolicyEngine interactive dashboard.
 * Handles country detection, hash parameter sync, share URLs, and
 * postMessage communication when embedded in an iframe.
 */

/** Read the country from the URL hash. Defaults to "us". */
export function getCountryFromHash(): string {
  if (typeof window === "undefined") return "us";
  const params = new URLSearchParams(window.location.hash.slice(1));
  return params.get("country") || "us";
}

/** Check whether the page is embedded inside an iframe. */
export function isEmbedded(): boolean {
  if (typeof window === "undefined") return false;
  return window.self !== window.top;
}

/**
 * Update the URL hash with the given parameters.
 * When embedded, also sends a postMessage to the parent window so it
 * can synchronize its own URL.
 */
export function updateHash(
  params: Record<string, string>,
  countryId: string,
): void {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => p.set(k, v));
  if (countryId !== "us" && !isEmbedded()) {
    p.set("country", countryId);
  }
  const hash = `#${p.toString()}`;
  window.history.replaceState(null, "", hash);
  if (isEmbedded()) {
    window.parent.postMessage({ type: "hashchange", hash }, "*");
  }
}

/**
 * Read all dashboard parameters from the URL hash.
 * Returns a record of string key-value pairs.
 */
export function readHashParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.hash.slice(1));
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

/**
 * Generate a share URL that always points to policyengine.org,
 * even when the dashboard is served from a Vercel deployment.
 */
export function getShareUrl(countryId: string, slug: string): string {
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  if (isEmbedded()) {
    return `https://policyengine.org/${countryId}/${slug}${hash}`;
  }
  return typeof window !== "undefined" ? window.location.href : "";
}
