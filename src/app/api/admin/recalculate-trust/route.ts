import { NextResponse } from "next/server";
import { auth } from "@/lib/server-auth";
import { prisma } from "@/lib/prisma";
import { scoreFromPrismaProduct, calculateUserTrustScore } from "@/lib/trust-score";

/**
 * POST /api/admin/recalculate-trust
 *
 * Bulk-recalculates trust scores for every product and every user
 * using the current EcoXchange trust score engine.
 *
 * Run this once after deploying the new trust score system, or any
 * time the scoring parameters change.
 *
 * Admin-only.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (
    !session?.user ||
    !(session.user as { isAdmin?: boolean }).isAdmin
  ) {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }

  // ── 1. Recalculate product trust scores ───────────────────
  const products = await prisma.product.findMany({
    where: {
      // Only recalculate activated products — unclaimed ones stay at 0
      status: { not: "UNCLAIMED" },
    },
    select: {
      id: true,
      isVerified: true,
      isFlagged: true,
      yearOfPurchase: true,
      serialNumber: true,
      brand: true,
      model: true,
      documents: { select: { documentType: true, isVerified: true } },
      ownershipHistory: { select: { id: true } },
      repairLogs: { select: { isVerified: true } },
    },
  });

  // Batch updates in groups of 50 to avoid overwhelming the DB
  const BATCH = 50;
  let productsUpdated = 0;

  for (let i = 0; i < products.length; i += BATCH) {
    const batch = products.slice(i, i + BATCH);
    await prisma.$transaction(
      batch.map((p) =>
        prisma.product.update({
          where: { id: p.id },
          data: { trustScore: scoreFromPrismaProduct(p) },
        })
      )
    );
    productsUpdated += batch.length;
  }

  // ── 2. Recalculate user trust scores ──────────────────────
  const users = await prisma.user.findMany({
    select: {
      id: true,
      college: true,
      phone: true,
      createdAt: true,
      ownedProducts: {
        select: { isVerified: true, isFlagged: true },
      },
      sellerListings: {
        select: { listingStatus: true },
      },
    },
  });

  let usersUpdated = 0;

  for (let i = 0; i < users.length; i += BATCH) {
    const batch = users.slice(i, i + BATCH);
    await prisma.$transaction(
      batch.map((u) => {
        const newScore = calculateUserTrustScore({
          completedSalesCount: u.sellerListings.filter(
            (l) => l.listingStatus === "SOLD"
          ).length,
          flaggedProductsOwned: u.ownedProducts.filter((p) => p.isFlagged)
            .length,
          verifiedProductsOwned: u.ownedProducts.filter((p) => p.isVerified)
            .length,
          college: u.college,
          phone: u.phone,
          createdAt: u.createdAt,
        });
        return prisma.user.update({
          where: { id: u.id },
          data: { trustScore: newScore },
        });
      })
    );
    usersUpdated += batch.length;
  }

  return NextResponse.json({
    success: true,
    productsUpdated,
    usersUpdated,
    message: `Recalculated trust scores for ${productsUpdated} products and ${usersUpdated} users`,
  });
}
