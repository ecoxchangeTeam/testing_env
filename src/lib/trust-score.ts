/**
 * EcoXchange Trust Score Engine
 *
 * PRODUCT TRUST SCORE  (0–100)
 * ─────────────────────────────────────────────────────────────
 *  Bucket           Max   What earns points
 *  ─────────────────────────────────────────────────────────────
 *  Documentation     30   Verified invoice=20, unverified=12
 *                         +Warranty 5, +Certification 8
 *                         +Verified repair receipts 3 ea (cap 7)
 *  Admin Trust       25   isVerified=+25
 *                         isFlagged → hard cap output at 15
 *  Provenance        20   1 owner=20, 2=15, 3=10, 4+=5
 *  Maintenance       15   No repairs=10, all verified=15,
 *                         some verified=8, unverified only=3
 *  Completeness      10   Serial number=4, year=3, brand+model=3
 *
 * USER TRUST SCORE  (0–100)
 * ─────────────────────────────────────────────────────────────
 *  Base                    40
 *  Completed sales         +5 each (cap +25)
 *  Verified products owned +5 each (cap +15)
 *  College on profile      +8
 *  Phone on profile        +7
 *  Account age >365d       +10 | >180d +7 | >90d +4 | >30d +2
 *  Flagged products owned  −15 each
 */

// ─── Product ─────────────────────────────────────────────────

export interface ProductTrustData {
  isVerified: boolean;
  isFlagged: boolean;
  documents: Array<{ documentType: string; isVerified: boolean }>;
  /** Only the count matters — pass the full array or a stub */
  ownershipHistory: Array<unknown>;
  repairLogs: Array<{ isVerified: boolean }>;
  yearOfPurchase?: number | null;
  serialNumber?: string | null;
  brand?: string | null;
  model?: string | null;
}

export function calculateProductTrustScore(data: ProductTrustData): number {
  const docs = data.documents;

  // ── 1. DOCUMENTATION (max 30) ──────────────────────────────
  const invoiceVerified = docs.some(
    (d) => d.documentType === "INVOICE" && d.isVerified
  );
  const invoicePresent = docs.some((d) => d.documentType === "INVOICE");
  const hasWarranty = docs.some((d) => d.documentType === "WARRANTY");
  const hasCertification = docs.some(
    (d) => d.documentType === "CERTIFICATION"
  );
  const verifiedRepairDocs = docs.filter(
    (d) => d.documentType === "REPAIR_RECEIPT" && d.isVerified
  ).length;

  let docScore = 0;
  if (invoiceVerified) docScore += 20;
  else if (invoicePresent) docScore += 12;
  if (hasWarranty) docScore += 5;
  if (hasCertification) docScore += 8;
  docScore += Math.min(verifiedRepairDocs * 3, 7);
  docScore = Math.min(docScore, 30);

  // ── 2. ADMIN TRUST (max 25) ───────────────────────────────
  const adminScore = data.isVerified ? 25 : 0;

  // ── 3. PROVENANCE (max 20) ────────────────────────────────
  const ownerCount = data.ownershipHistory.length;
  let provenanceScore: number;
  if (ownerCount <= 1) provenanceScore = 20;
  else if (ownerCount === 2) provenanceScore = 15;
  else if (ownerCount === 3) provenanceScore = 10;
  else provenanceScore = 5;

  // ── 4. MAINTENANCE (max 15) ───────────────────────────────
  const repairCount = data.repairLogs.length;
  const verifiedRepairs = data.repairLogs.filter((r) => r.isVerified).length;
  let maintenanceScore: number;
  if (repairCount === 0) {
    maintenanceScore = 10; // clean history — no known issues
  } else if (verifiedRepairs === repairCount) {
    maintenanceScore = 15; // every repair is fully documented
  } else if (verifiedRepairs > 0) {
    maintenanceScore = 8; // partially documented
  } else {
    maintenanceScore = 3; // repairs exist but none are verified
  }

  // ── 5. COMPLETENESS (max 10) ─────────────────────────────
  let completenessScore = 0;
  if (data.serialNumber) completenessScore += 4;
  if (data.yearOfPurchase) completenessScore += 3;
  if (data.brand && data.model) completenessScore += 3;

  // ── TOTAL ────────────────────────────────────────────────
  let total =
    docScore + adminScore + provenanceScore + maintenanceScore + completenessScore;

  // Hard penalty: flagged products are capped at 15 regardless
  if (data.isFlagged) total = Math.min(total, 15);

  return Math.max(0, Math.min(100, Math.round(total)));
}

// ─── Convenience: build ProductTrustData from a Prisma product ──
// Use this when you already have the full product fetched with relations.
export type PrismaProductWithRelations = {
  isVerified: boolean;
  isFlagged: boolean;
  yearOfPurchase?: number | null;
  serialNumber?: string | null;
  brand?: string | null;
  model?: string | null;
  documents: Array<{ documentType: string; isVerified: boolean }>;
  ownershipHistory: Array<unknown>;
  repairLogs: Array<{ isVerified: boolean }>;
};

export function scoreFromPrismaProduct(
  product: PrismaProductWithRelations
): number {
  return calculateProductTrustScore({
    isVerified: product.isVerified,
    isFlagged: product.isFlagged,
    documents: product.documents,
    ownershipHistory: product.ownershipHistory,
    repairLogs: product.repairLogs,
    yearOfPurchase: product.yearOfPurchase,
    serialNumber: product.serialNumber,
    brand: product.brand,
    model: product.model,
  });
}

// ─── User ─────────────────────────────────────────────────────

export interface UserTrustData {
  completedSalesCount: number;
  flaggedProductsOwned: number;
  verifiedProductsOwned: number;
  college?: string | null;
  phone?: string | null;
  createdAt: Date;
}

export function calculateUserTrustScore(data: UserTrustData): number {
  let score = 40; // base

  // Sales track record (max +25)
  score += Math.min(data.completedSalesCount * 5, 25);

  // Verified products owned (max +15)
  score += Math.min(data.verifiedProductsOwned * 5, 15);

  // Profile completeness (max +15)
  if (data.college) score += 8;
  if (data.phone) score += 7;

  // Account longevity (max +10)
  const ageDays = Math.floor(
    (Date.now() - new Date(data.createdAt).getTime()) / 86_400_000
  );
  if (ageDays > 365) score += 10;
  else if (ageDays > 180) score += 7;
  else if (ageDays > 90) score += 4;
  else if (ageDays > 30) score += 2;

  // Penalty: each flagged product costs 15 points
  score -= data.flaggedProductsOwned * 15;

  return Math.max(0, Math.min(100, Math.round(score)));
}
