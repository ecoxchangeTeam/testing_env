import type { ListingStatus, ProductStatus } from "@prisma/client";

const CK_SUPABASE_URL =
  process.env.CAMPUSKARTT_URL || "https://edzicxebgtiosahshvgi.supabase.co";
const CK_SERVICE_KEY = process.env.CAMPUSKARTT_SUPABASE_SERVICE_KEY;

export function conditionToTrustScore(condition?: string | null): number {
  switch (condition) {
    case "like_new":
      return 85;
    case "good":
      return 70;
    case "fair":
      return 55;
    case "old":
      return 40;
    default:
      return 65;
  }
}

export function getEcoDppId(body: Record<string, unknown>): string | null {
  const direct = body.dppId ?? body.ecoDppId ?? body.ecoxchangeDppId;
  if (typeof direct === "string" && direct.trim()) return direct.trim();

  const metadata = body.metadata;
  if (metadata && typeof metadata === "object") {
    const value = (metadata as Record<string, unknown>).dppId;
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  return null;
}

export function isEcoXchangeOrigin(body: Record<string, unknown>) {
  const source = String(body.source ?? body.origin ?? "").toLowerCase();
  return source === "ecoxchange" || Boolean(getEcoDppId(body));
}

export function mapCampusKarttListingStatus(
  status: unknown
): { listingStatus: ListingStatus; productStatus: ProductStatus; soldAt: Date | null } | null {
  const normalized = String(status ?? "").trim().toLowerCase();

  if (normalized === "sold") {
    return { listingStatus: "SOLD", productStatus: "TRANSFERRED", soldAt: new Date() };
  }

  if (["cancelled", "canceled", "deleted", "removed"].includes(normalized)) {
    return { listingStatus: "CANCELLED", productStatus: "ACTIVE", soldAt: null };
  }

  if (normalized === "expired") {
    return { listingStatus: "EXPIRED", productStatus: "ACTIVE", soldAt: null };
  }

  if (["active", "listed"].includes(normalized)) {
    return { listingStatus: "ACTIVE", productStatus: "LISTED", soldAt: null };
  }

  return null;
}

export async function syncCampusKarttSoldStatus(externalId: string) {
  if (!CK_SERVICE_KEY) {
    throw new Error("Missing CAMPUSKARTT_SUPABASE_SERVICE_KEY");
  }

  const res = await fetch(
    `${CK_SUPABASE_URL}/rest/v1/listings?id=eq.${encodeURIComponent(externalId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: CK_SERVICE_KEY,
        Authorization: `Bearer ${CK_SERVICE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ status: "sold" }),
    }
  );

  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(
      `CampusKartt sold-status sync failed (${res.status}): ${message}`
    );
  }
}
