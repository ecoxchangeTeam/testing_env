import { NextResponse } from "next/server";
import { auth } from "@/lib/server-auth";
import { prisma } from "@/lib/prisma";
import { qrPrisma } from "@/lib/qr-prisma";
import {
  generateQrPng,
  generateQrSvg,
  generateQrSticker,
  generateQrPayload,
} from "@/lib/qr";
import crypto from "crypto";

/**
 * POST /api/admin/regenerate-qrs
 *
 * Regenerates QR codes for all products using the correct
 * NEXT_PUBLIC_APP_URL (fixes QRs that were generated pointing to localhost).
 *
 * Admin-only. Safe to run multiple times.
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

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  // Fetch all products that have a dppId
  const products = await prisma.product.findMany({
    select: { id: true, dppId: true },
  });

  const BATCH = 10; // Keep batches small — QR generation is CPU-heavy
  let updated = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < products.length; i += BATCH) {
    const batch = products.slice(i, i + BATCH);

    await Promise.all(
      batch.map(async (product) => {
        try {
          const { dppId } = product;
          const activationUrl = `${baseUrl}/activate/${dppId}`;
          const qrPayload = generateQrPayload(dppId, baseUrl);
          const qrHash = crypto
            .createHash("sha256")
            .update(qrPayload)
            .digest("hex");

          // Regenerate all three QR formats in parallel
          const [qrPng, , qrSticker] = await Promise.all([
            generateQrPng(dppId, baseUrl),
            generateQrSvg(dppId, baseUrl),
            generateQrSticker(dppId, baseUrl),
          ]);

          // Update main DB
          await prisma.product.update({
            where: { id: product.id },
            data: {
              qrCodeUrl: qrPng,   // PNG data URL
              qrCodeSvg: qrSticker, // SVG sticker
            },
          });

          // Update QR DB record if it exists
          const qrRecord = await qrPrisma.qRRecord.findUnique({
            where: { dppId },
          });
          if (qrRecord) {
            await qrPrisma.qRRecord.update({
              where: { dppId },
              data: { activationUrl, qrHash },
            });
          }

          updated++;
        } catch (err) {
          failed++;
          errors.push(
            `${product.dppId}: ${err instanceof Error ? err.message : String(err)}`
          );
        }
      })
    );
  }

  return NextResponse.json({
    success: true,
    baseUrl,
    total: products.length,
    updated,
    failed,
    ...(errors.length > 0 && { errors }),
  });
}
