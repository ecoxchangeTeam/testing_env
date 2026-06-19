export function getSafeCallbackUrl(
  callbackUrl: string | null | undefined,
  fallback = "/dashboard"
) {
  if (!callbackUrl) return fallback;

  try {
    if (!callbackUrl.startsWith("/") || callbackUrl.startsWith("//")) {
      return fallback;
    }

    const url = new URL(callbackUrl, "http://ecoxchange.local");
    if (url.origin !== "http://ecoxchange.local") {
      return fallback;
    }

    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return fallback;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
