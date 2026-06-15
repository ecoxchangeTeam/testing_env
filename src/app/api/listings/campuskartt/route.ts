import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  conditionToTrustScore,
  getEcoDppId,
  isEcoXchangeOrigin,
} from "@/lib/campuskartt-sync";

const WEBHOOK_SECRET =
  process.env.CAMPUSKARTT_WEBHOOK_SECRET || "ck-eco-webhook-secret-2024";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-ecoxchange-secret");
  if (secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const externalId = body.externalId ?? body.id;
    const dppId = getEcoDppId(body);

    if (!isEcoXchangeOrigin(body) || !dppId) {
      return NextResponse.json(
        {
          skipped: true,
          reason: "CampusKart-only listings are not imported into EcoXchange",
        },
        { status: 202 }
      );
    }

    if (!externalId || !body.price) {
      return NextResponse.json(
        { error: "Missing externalId or price" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { dppId },
      include: { listings: { where: { listingStatus: "ACTIVE" } } },
    });

    if (!product) {
      return NextResponse.json(
        { error: "EcoXchange product not found for DPP ID" },
        { status: 404 }
      );
    }

    if (!product.currentOwnerId) {
      return NextResponse.json(
        { error: "Product must be active before it can be listed" },
        { status: 409 }
      );
    }

    const externalIdString = String(externalId);
    const price = Number(body.price);
    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ error: "Invalid listing price" }, { status: 400 });
    }

    const title =
      typeof body.title === "string" && body.title.trim()
        ? body.title.trim()
        : product.name || [product.brand, product.model].filter(Boolean).join(" ");
    const description =
      typeof body.description === "string" && body.description.trim()
        ? body.description.trim()
        : title;
    const condition =
      typeof body.condition === "string" && body.condition.trim()
        ? body.condition.trim()
        : undefined;
    const externalUrl =
      typeof body.externalUrl === "string" && body.externalUrl.trim()
        ? body.externalUrl.trim()
        : `https://www.campuskartt.in/app/listing.html?id=${externalIdString}`;
    const externalImage =
      typeof body.imageUrl === "string" && body.imageUrl.trim()
        ? body.imageUrl.trim()
        : null;

    const existingExternal = await prisma.marketplaceListing.findFirst({
      where: { externalId: externalIdString },
    });

    if (existingExternal && existingExternal.productId !== product.id) {
      return NextResponse.json(
        { error: "External listing is already linked to another product" },
        { status: 409 }
      );
    }

    const existingActive = product.listings[0];
    const listingId = existingExternal?.id ?? existingActive?.id;

    const listingData = {
      productId: product.id,
      sellerId: product.currentOwnerId,
      askingPrice: price,
      description,
      condition,
      source: "CAMPUSKARTT" as const,
      externalId: externalIdString,
      externalUrl,
      externalImage,
      sellerLabel: "CampusKartt",
      externalTrustScore: conditionToTrustScore(condition),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };

    const [listing] = await prisma.$transaction([
      listingId
        ? prisma.marketplaceListing.update({
            where: { id: listingId },
            data: { ...listingData, listingStatus: "ACTIVE", soldAt: null },
          })
        : prisma.marketplaceListing.create({ data: listingData }),
      prisma.product.update({
        where: { id: product.id },
        data: { status: "LISTED" },
      }),
    ]);

    return NextResponse.json(
      { listingId: listing.id, success: true },
      { status: listingId ? 200 : 201 }
    );
  } catch (error) {
    console.error("[CampusKartt EcoXchange Listing Webhook Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}    const title =
      typeof body.title === "string" && body.title.trim()
        ? body.title.trim()
        : product.name || [product.brand, product.model].filter(Boolean).join(" ");
    const description =
      typeof body.description === "string" && body.description.trim()
        ? body.description.trim()
        : title;
    const condition =
      typeof body.condition === "string" && body.condition.trim()
        ? body.condition.trim()
        : undefined;
    const externalUrl =
      typeof body.externalUrl === "string" && body.externalUrl.trim()
        ? body.externalUrl.trim()
        : `https://www.campuskartt.in/app/listing.html?id=${externalIdString}`;
    const externalImage =
      typeof body.imageUrl === "string" && body.imageUrl.trim()
        ? body.imageUrl.trim()
        : null;

    const existingExternal = await prisma.marketplaceListing.findFirst({
      where: { externalId: externalIdString },
    });

    if (existingExternal && existingExternal.productId !== product.id) {
      return NextResponse.json(
        { error: "External listing is already linked to another product" },
        { status: 409 }
      );
    }

    const existingActive = product.listings[0];
    const listingId = existingExternal?.id ?? existingActive?.id;

    const listingData = {
      productId: product.id,
      sellerId: product.currentOwnerId,
      askingPrice: price,
      description,
      condition,
      source: "ECOXCHANGE" as const,
      externalId: externalIdString,
      externalUrl,
      externalImage,
      sellerLabel: null,
      externalTrustScore: conditionToTrustScore(condition),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };

    const [listing] = await prisma.$transaction([
      listingId
        ? prisma.marketplaceListing.update({
            where: { id: listingId },
            data: { ...listingData, listingStatus: "ACTIVE", soldAt: null },
          })
        : prisma.marketplaceListing.create({ data: listingData }),
      prisma.product.update({
        where: { id: product.id },
        data: { status: "LISTED" },
      }),
    ]);

    return NextResponse.json(
      { listingId: listing.id, success: true },
      { status: listingId ? 200 : 201 }
    );
  } catch (error) {
    console.error("[CampusKartt EcoXchange Listing Webhook Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
