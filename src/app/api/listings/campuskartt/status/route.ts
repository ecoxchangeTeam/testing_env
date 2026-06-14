import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapCampusKarttListingStatus } from "@/lib/campuskartt-sync";

const WEBHOOK_SECRET = process.env.CAMPUSKARTT_WEBHOOK_SECRET || "ck-eco-webhook-secret-2024";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-ecoxchange-secret");
  if (secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { externalId, status } = body;

    if (!externalId || !status) {
      return NextResponse.json({ error: "Missing externalId or status" }, { status: 400 });
    }

    const mappedStatus = mapCampusKarttListingStatus(status);
    if (!mappedStatus) {
      return NextResponse.json({ error: "Unsupported CampusKartt listing status" }, { status: 400 });
    }

    const listing = await prisma.marketplaceListing.findFirst({
      where: { externalId: String(externalId), source: "ECOXCHANGE" },
    });

    if (!listing) {
      return NextResponse.json(
        {
          skipped: true,
          reason: "Listing is not an EcoXchange mirrored listing",
        },
        { status: 202 }
      );
    }

    await prisma.$transaction([
      prisma.marketplaceListing.update({
        where: { id: listing.id },
        data: {
          listingStatus: mappedStatus.listingStatus,
          soldAt: mappedStatus.soldAt,
        },
      }),
      prisma.product.update({
        where: { id: listing.productId },
        data: { status: mappedStatus.productStatus },
      }),
    ]);

    return NextResponse.json({
      success: true,
      listingId: listing.id,
      newStatus: mappedStatus.listingStatus,
    });
  } catch (error) {
    console.error("[CampusKartt Status Webhook Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
